import smtplib
from email.mime.text import MIMEText
from config.email_config import EmailConfig
from app.utils.logger import logger


class EmailService:
    def __init__(self):
        self.host = EmailConfig.host
        self.port = EmailConfig.port
        self.username = EmailConfig.username
        self.password = EmailConfig.password
        self.sender = EmailConfig.sender

    def send_email(self, to: str, subject: str, message: str) -> bool:
        try:
            msg = MIMEText(message)
            msg["Subject"] = subject
            msg["From"] = self.sender
            msg["To"] = to

            with smtplib.SMTP(self.host, self.port) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.sendmail(self.sender, [to], msg.as_string())

            logger.info(f"Email sent → {to}")
            return True

        except Exception as e:
            logger.error(f"Email Error: {str(e)}")
            return False
