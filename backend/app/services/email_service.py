import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.email_config import EmailConfig

class EmailService:
    def __init__(self):
        self.smtp_server = EmailConfig.SMTP_SERVER
        self.smtp_port = EmailConfig.SMTP_PORT
        self.username = EmailConfig.USERNAME
        self.password = EmailConfig.PASSWORD
    
    async def send_email(self, to: str, subject: str, body: str):
        msg = MIMEMultipart()
        msg['From'] = self.username
        msg['To'] = to
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)
        
        return {"status": "sent", "to": to, "subject": subject}
    
    async def get_emails(self, limit: int = 10):
        # Implementation for reading emails would go here
        return {"message": "Email reading not implemented yet"}