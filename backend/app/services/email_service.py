import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.email_config import EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT



logger =  logging.getLogger(__name__)


class EmailService:
    def __init__(self, user=EMAIL_USER, password=EMAIL_PASS, host=SMTP_HOST, port=SMTP_PORT):
        self.user = user
        self.password = password
        self.host = host
        self.port = port



    def send_email(self, to: str, subject: str, body: str, html: bool = False) -> bool:
        """
        Send email with optional HTML content.
        """

        try:
            msg = MIMEMultipart()
            msg['From'] = self.user
            msg['To'] = to
            msg['subject'] = subject


            if html:
                msg.attach(MIMEText(body, 'html'))

            else:
                msg.attach(MIMEText(body, 'plain'))


            with smtplib.SMPT(self.host, self.port) as server:
                server.starttls()
                server.login(self.user, self.password)
                server.sendmail(self.user, to, msg.as_string())


            logger.info(f"Email sent to {to} with subject '{subject}")
            return True
        
        except Exception as e:
            logger.error(f"Faild to send email: {e}")
            return False