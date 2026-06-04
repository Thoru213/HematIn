from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── Auth ──────────────────────────────────────────────
    API_KEY: str                        # Samakan dengan NODE: AI_SERVICE_API_KEY

    # ── Supabase ──────────────────────────────────────────
    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str           # Service role key (bukan anon key)

    # ── Hugging Face Space ────────────────────────────────
    # URL Gradio Space kamu — endpoint /api/predict (bukan /predict)
    HF_SPACE_URL: str = "https://thoru213-hematin.hf.space"

    # ── File constraints ──────────────────────────────────
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_CONTENT_TYPES: list[str] = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ]

    # ── Timeouts (detik) ──────────────────────────────────
    # HF Space gratis bisa lambat cold-start, beri waktu cukup
    HF_REQUEST_TIMEOUT: int = 120
    FILE_DOWNLOAD_TIMEOUT: int = 15

    class Config:
        env_file = ".env"


settings = Settings()
