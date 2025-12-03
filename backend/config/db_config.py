from .settings import settings

class DBConfig:
    url = (
        f"postgresql://{settings.DB_USER}:{settings.DB_PASSWORD}"
        f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
    )
