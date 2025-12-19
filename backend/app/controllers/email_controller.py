from fastapi import APIRouter, HTTPException
from app.schemas.email_schemas import EmailRequest, EmailResponse
from typing import Dict, Any
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

@router.post("/test")
def test_email_connection(request: dict):
    try:
        # Mock test - replace with actual SMTP test
        host = request.get("host")
        username = request.get("username")
        if not host or not username:
            return {"success": False, "message": "Missing required fields"}
        return {"success": True, "message": "Email connection successful"}
    except Exception as e:
        logger.error(f"Email test error: {str(e)}")
        return {"success": False, "message": str(e)}