from fastapi import APIRouter, HTTPException
from app.schemas.email_schemas import EmailRequest, EmailResponse
from app.services.email_service import EmailService
from app.utils.logger import logger

router = APIRouter()
email_service = EmailService()

@router.post("/send", response_model=EmailResponse)
def send_email(request: EmailRequest):
    success = email_service.send_email(request.to, request.subject, request.message)
    if not success:
        logger.error("Email sending failed")
        raise HTTPException(status_code=500, detail="Failed to send email")
    return EmailResponse(status="success", message="Email sent successfully")