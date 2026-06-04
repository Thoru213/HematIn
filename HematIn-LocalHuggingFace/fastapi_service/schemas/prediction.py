from pydantic import BaseModel, HttpUrl, validator
from typing import Optional


# ─────────────────────────────────────────────────────────────
# REQUEST
# ─────────────────────────────────────────────────────────────

class PredictRequest(BaseModel):
    file_url: HttpUrl
    job_id: str
    mime_type: str

    @validator("mime_type")
    def validate_mime(cls, v):
        allowed = {"image/jpeg", "image/png", "image/webp"}
        if v not in allowed:
            raise ValueError(f"Unsupported MIME type: {v}")
        return v


# ─────────────────────────────────────────────────────────────
# RESPONSE — disesuaikan output HematIn Space
# ─────────────────────────────────────────────────────────────
class ReceiptItem(BaseModel):
    name: str
    qty: int
    unit_price: float
    line_total: float
class ClassificationDetail(BaseModel):
    category: str
    confidence: float
    all_probs: dict[str, float]
    is_confident: bool


class PredictResponse(BaseModel):
    job_id: str
    status: str = "success"
    # Fields dari receipt_parser
    items: list[ReceiptItem]
    total_expense: float
    distinct_item_count: int
    # Fields dari classifier
    classification: ClassificationDetail
    # Meta
    ocr_line_count: int
    processing_time_ms: int


# ─────────────────────────────────────────────────────────────
# ERROR
# ─────────────────────────────────────────────────────────────

class ErrorResponse(BaseModel):
    job_id: Optional[str] = None
    status: str = "error"
    error_code: str
    message: str
