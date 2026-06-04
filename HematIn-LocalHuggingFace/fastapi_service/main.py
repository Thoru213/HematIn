import logging
from fastapi import FastAPI
from api.routes.predict import router as predict_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

app = FastAPI(
    title="HematIn AI Gateway",
    description="Internal gateway antara Node.js backend dan HematIn HF Space",
    version="1.0.0",
    docs_url=None,    # Matikan di production
    redoc_url=None,
)

app.include_router(predict_router, prefix="/api/v1")


@app.get("/health")
async def health():
    """
    Health check endpoint.
    Dipakai oleh Docker healthcheck dan BullMQ worker
    sebelum mulai memproses job.
    """
    return {"status": "ready", "service": "hematin-ai-gateway"}
