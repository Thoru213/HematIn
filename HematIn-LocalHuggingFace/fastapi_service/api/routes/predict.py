import time
import asyncio
import logging

import httpx
from fastapi import APIRouter, Depends, HTTPException, status

from core.security import verify_api_key
from core.config import settings
from models.hf_client import call_hf_space
from schemas.prediction import (
    PredictRequest,
    PredictResponse,
    ClassificationDetail,
    ReceiptItem,
    ErrorResponse,
)

router = APIRouter()
logger = logging.getLogger(__name__)

MAX_CONCURRENT = 3
_semaphore = asyncio.Semaphore(MAX_CONCURRENT)


@router.post(
    "/predict",
    response_model=PredictResponse,
    responses={
        403: {"model": ErrorResponse},
        422: {"model": ErrorResponse},
        503: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
    dependencies=[Depends(verify_api_key)],
)
async def predict(request: PredictRequest):
    start_time = time.monotonic()

    async with _semaphore:
        image_bytes = await _download_file(str(request.file_url), request.job_id)

        max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
        if len(image_bytes) > max_bytes:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail={
                    "job_id": request.job_id,
                    "status": "error",
                    "error_code": "FILE_TOO_LARGE",
                    "message": f"File melebihi batas {settings.MAX_FILE_SIZE_MB}MB",
                }
            )

        try:
            hf_result = await call_hf_space(image_bytes)
        except TimeoutError:
            logger.error(f"job={request.job_id} HF_SPACE_TIMEOUT")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail={
                    "job_id": request.job_id,
                    "status": "error",
                    "error_code": "HF_SPACE_TIMEOUT",
                    "message": "HF Space timeout. Coba lagi dalam 30 detik.",
                }
            )
        except RuntimeError as e:
            logger.error(f"job={request.job_id} HF_SPACE_ERROR: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail={
                    "job_id": request.job_id,
                    "status": "error",
                    "error_code": "HF_SPACE_ERROR",
                    "message": str(e),
                }
            )
        except Exception as e:
            logger.exception(f"job={request.job_id} UNEXPECTED: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                    "job_id": request.job_id,
                    "status": "error",
                    "error_code": "PREDICTION_FAILED",
                    "message": "Internal error saat menghubungi AI service",
                }
            )

    elapsed_ms = int((time.monotonic() - start_time) * 1000)

    # Ekstrak dari struktur analyze_receipt()
    fields     = hf_result.get("fields", {})
    clf        = hf_result.get("classification", {})
    ocr_count  = hf_result.get("ocr_count", 0)

    logger.info(
        f"job={request.job_id} "
        f"category={clf.get('category')} "
        f"confidence={clf.get('confidence')} "
        f"items={fields.get('distinct_item_count', 0)} "
        f"total={fields.get('total_expense', 0)} "
        f"time={elapsed_ms}ms"
    )

    return PredictResponse(
        job_id=request.job_id,
        status="success",
        items=[ReceiptItem(**item) for item in fields.get("items", [])],
        total_expense=fields.get("total_expense", 0.0),
        distinct_item_count=fields.get("distinct_item_count", 0),
        classification=ClassificationDetail(
            category=clf.get("category", "unknown"),
            confidence=clf.get("confidence", 0.0),
            all_probs=clf.get("all_probs", {}),
            is_confident=clf.get("is_confident", False),
        ),
        ocr_line_count=ocr_count,
        processing_time_ms=elapsed_ms,
    )


async def _download_file(url: str, job_id: str) -> bytes:
    try:
        async with httpx.AsyncClient(timeout=settings.FILE_DOWNLOAD_TIMEOUT) as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.content
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "job_id": job_id,
                "status": "error",
                "error_code": "FILE_DOWNLOAD_TIMEOUT",
                "message": "Timeout saat download file dari Supabase Storage",
            }
        )
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "job_id": job_id,
                "status": "error",
                "error_code": "FILE_NOT_ACCESSIBLE",
                "message": f"Supabase Storage mengembalikan {e.response.status_code}",
            }
        )