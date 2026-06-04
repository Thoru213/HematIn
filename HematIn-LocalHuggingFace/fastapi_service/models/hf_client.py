"""
hf_client.py

Menangani semua komunikasi antara FastAPI dan HematIn Hugging Face Space.

Menggunakan gradio_client untuk kompatibilitas dengan Gradio 4.x.
Named endpoint: /predict
  Input : gambar (FileData)
  Output: (ringkasan_str, json_detail_str)
"""

import json
import logging
import asyncio
import os
import tempfile
from concurrent.futures import ThreadPoolExecutor

from gradio_client import Client, handle_file

from core.config import settings

logger = logging.getLogger(__name__)

# Thread pool untuk menjalankan Gradio client (sinkron) tanpa memblokir event loop
_executor = ThreadPoolExecutor(max_workers=3)


def _predict_sync(image_bytes: bytes) -> dict:
    """
    Panggil HF Space secara sinkron menggunakan gradio_client.
    Dijalankan di thread pool agar tidak memblokir event loop FastAPI.
    """
    tmp_path = None
    try:
        # Tulis bytes ke file sementara — gradio_client butuh path file
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f:
            f.write(image_bytes)
            tmp_path = f.name

        client = Client(settings.HF_SPACE_URL, verbose=False)

        # app.py mengembalikan (ringkasan_str, json_detail_str)
        result = client.predict(
            image=handle_file(tmp_path),
            api_name="/predict",
        )

        if not isinstance(result, (list, tuple)) or len(result) < 2:
            raise RuntimeError(f"Unexpected Gradio response shape: {result}")

        json_detail_str = result[1]

        try:
            parsed = json.loads(json_detail_str)
        except json.JSONDecodeError:
            raise RuntimeError(
                f"HF Space returned non-JSON at output[1]: {json_detail_str[:200]}"
            )

        if parsed.get("status") == "error":
            raise RuntimeError(
                f"[{parsed.get('error_code', 'UNKNOWN')}] "
                f"{parsed.get('message', 'Unknown error')}"
            )

        return parsed

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


async def call_hf_space(image_bytes: bytes) -> dict:
    """
    Async wrapper untuk _predict_sync.
    Respects HF_REQUEST_TIMEOUT dari settings.
    """
    loop = asyncio.get_event_loop()
    try:
        result = await asyncio.wait_for(
            loop.run_in_executor(_executor, _predict_sync, image_bytes),
            timeout=settings.HF_REQUEST_TIMEOUT,
        )
        return result
    except asyncio.TimeoutError:
        raise TimeoutError(
            "HF Space tidak merespons dalam batas waktu. "
            "Kemungkinan cold-start — coba lagi dalam 30 detik."
        )
    except (TimeoutError, RuntimeError, ValueError):
        raise
    except Exception as e:
        raise RuntimeError(f"Unexpected error calling HF Space: {e}")