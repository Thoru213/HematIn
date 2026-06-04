"""
HematIn — Hugging Face Space
Pipeline: Image → ONNX OCR → receipt_parser → TF Classifier → JSON
"""

import gradio_client.utils as _gcu

_original_json_schema_to_python_type = _gcu._json_schema_to_python_type

def _patched_json_schema_to_python_type(schema, defs=None):
    if not isinstance(schema, dict):
        return "Any"
    return _original_json_schema_to_python_type(schema, defs)

_gcu._json_schema_to_python_type = _patched_json_schema_to_python_type

import os
import json
import logging
import numpy as np
import gradio as gr
import tensorflow as tf
from huggingface_hub import hf_hub_download

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# KONSTANTA
# ─────────────────────────────────────────────
MODEL_DIR         = "./models"
HF_OCR_REPO       = "Thoru213/HematInOCR"
HF_CLF_REPO       = "Thoru213/HematInClassifier"
DET_FILENAME      = "hematin_detector.onnx"
REC_FILENAME      = "hematin_recognition.onnx"
CHAR_DICT_FILE    = "rec_char_dict.txt"
CLF_FILENAME      = "hematin_classifier.keras"

os.makedirs(MODEL_DIR, exist_ok=True)


# ─────────────────────────────────────────────
# SINGLETON PIPELINE
# ─────────────────────────────────────────────

class HematInPipeline:
    """
    Load semua model satu kali saat startup.
    Reuse setiap request — tidak ada re-loading.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._ready = False
        return cls._instance

    def load(self):
        if self._ready:
            return

        # ── 1. Download semua model dari HF Hub ──────────────────────────────
        logger.info("Downloading models from Hugging Face Hub...")
        try:
            det_path  = hf_hub_download(HF_OCR_REPO, DET_FILENAME,   local_dir=MODEL_DIR)
            rec_path  = hf_hub_download(HF_OCR_REPO, REC_FILENAME,   local_dir=MODEL_DIR)
            dict_path = hf_hub_download(HF_OCR_REPO, CHAR_DICT_FILE, local_dir=MODEL_DIR)
            clf_path  = hf_hub_download(HF_CLF_REPO, CLF_FILENAME,   local_dir=MODEL_DIR)
            logger.info("All models downloaded.")
        except Exception as e:
            raise RuntimeError(f"Model download failed: {e}")

        # ── 2. Set env vars SEBELUM import ocr_pipeline ──────────────────────
        # ocr_pipeline.py membaca path dari env var saat diimport
        os.environ["FINTRACK_DET_MODEL"] = det_path
        os.environ["FINTRACK_REC_MODEL"] = rec_path
        os.environ["FINTRACK_CHAR_DICT"] = dict_path

        # ── 3. Init OCR engine (ONNX) ─────────────────────────────────────────
        # Import SETELAH env var di-set
        logger.info("Initializing ONNX OCR engine...")
        from ocr_pipeline import get_ocr_engine
        get_ocr_engine()   # inisialisasi _ocr_instance singleton di ocr_pipeline
        logger.info("OCR engine ready.")

        # ── 4. Load TF Classifier ─────────────────────────────────────────────
        logger.info("Loading TF Classifier...")
        from custom_components import CUSTOM_OBJECTS
        self.clf_model = tf.keras.models.load_model(
            clf_path,
            custom_objects=CUSTOM_OBJECTS
        )
        logger.info("Classifier loaded.")

        self._ready = True
        logger.info("HematIn pipeline ready.")

    @property
    def is_ready(self):
        return self._ready


_pipeline = HematInPipeline()


# ─────────────────────────────────────────────
# INFERENCE
# ─────────────────────────────────────────────

def process_receipt(image: np.ndarray) -> tuple[str, str]:
    """
    Main handler untuk Gradio.
    Input : np.ndarray (HxWx3, RGB dari Gradio)
    Output: (ringkasan str, json_detail str)
    """
    if image is None:
        return "Mohon upload gambar struk.", ""

    if not _pipeline.is_ready:
        return "Pipeline belum siap. Tunggu beberapa detik lalu coba lagi.", ""

    try:
        # Gradio kirim RGB, pipeline butuh BGR (OpenCV convention)
        import cv2
        image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        from pipeline import analyze_receipt
        result = analyze_receipt(
            img_source   = image_bgr,
            clf_model    = _pipeline.clf_model,
            deskew       = True,
            min_ocr_conf = 0.30,
        )

        # ── Format ringkasan ──────────────────────────────────────────────────
        clf        = result["classification"]
        fields     = result["fields"]
        kategori   = clf["category"]
        confidence = clf["confidence"]
        total      = fields.get("total_expense", 0)
        items      = fields.get("items", [])

        ringkasan_lines = [
            f"Kategori   : {kategori}",
            f"Keyakinan  : {confidence * 100:.1f}%",
            f"Total      : Rp {total:,.0f}",
            f"Item       : {len(items)} jenis",
        ]
        if items:
            ringkasan_lines.append("")
            ringkasan_lines.append("Detail item:")
            for it in items[:10]:   # Tampilkan max 10 item
                ringkasan_lines.append(
                    f"  • {it['name']}  —  Rp {it['line_total']:,.0f}"
                )
            if len(items) > 10:
                ringkasan_lines.append(f"  ... dan {len(items) - 10} item lainnya")

        ringkasan = "\n".join(ringkasan_lines)

        # ── JSON detail (untuk API / debugging) ───────────────────────────────
        json_detail = json.dumps(result, indent=2, ensure_ascii=False)

        return ringkasan, json_detail

    except Exception as e:
        logger.exception("Pipeline error")
        error_result = json.dumps({
            "status" : "error",
            "message": str(e),
        }, indent=2)
        return f"Error: {str(e)}", error_result


# ─────────────────────────────────────────────
# STARTUP — Load model sebelum terima request
# ─────────────────────────────────────────────

try:
    _pipeline.load()
except Exception as e:
    logger.error(f"Startup failed: {e}")
    # Space tetap bisa launch, error ditampilkan saat user kirim gambar


# ─────────────────────────────────────────────
# GRADIO UI
# ─────────────────────────────────────────────

# Ganti seluruh blok gr.Blocks dan demo.launch() dengan ini

with gr.Blocks(title="HematIn — Receipt Scanner") as demo:
    gr.Markdown("# HematIn — Smart Receipt Analyzer")
    gr.Markdown(
        "Upload foto struk belanja. "
        "Sistem akan mengekstrak item, total, dan mengklasifikasikan kategori pengeluaran."
    )

    with gr.Row():
        with gr.Column(scale=1):
            img_input  = gr.Image(type="numpy", label="Upload Foto Struk")
            btn_submit = gr.Button("Analisis", variant="primary")

        with gr.Column(scale=1):
            txt_ringkasan = gr.Textbox(
                label="Ringkasan",
                lines=12,
                interactive=False,
            )
            txt_json = gr.Textbox(      # ← gr.Code diganti gr.Textbox
                label="JSON Detail",
                lines=20,
                interactive=False,
            )

    btn_submit.click(
        fn      = process_receipt,
        inputs  = img_input,
        outputs = [txt_ringkasan, txt_json],
        api_name="predict",
    )

demo.queue()
if __name__ == "__main__":
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,
    )