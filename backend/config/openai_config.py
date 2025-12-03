from .settings import settings

class OpenAIConfig:
    api_key = settings.OPENAI_API_KEY
    model = settings.OPENAI_MODEL
    timeout = settings.OPENAI_TIMEOUT
