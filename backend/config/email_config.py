from .settings import settings

class EmailConfig:
    host = settings.EMAIL_HOST
    port = settings.EMAIL_PORT
    username = settings.EMAIL_USER
    password = settings.EMAIL_PASSWORD
    sender = settings.EMAIL_FROM
