from fastapi import APIRouter, HTTPException
from app.services.email_service import EmailService
from app.utils.logger import logger

router = APIRouter(prefix="/email", tags=["Email"])
email_service = EmailService()

@router.post("send")
def send_email(to: str, subject: str, message: str):
    success = email_service.send_email(to, subject, message)

    if not success:
        logger.error("Email sending failed")
        raise HTTPException(status_code=500, detail="Failed to send email")
    

    return {"status": "success", "message": "Email sent successfully"}