from fastapi import APIRouter
from app.controllers.email_controller import EmailController

router = APIRouter()
email_controller = EmailController()

@router.post("/send")
async def send_email(to: str, subject: str, body: str):
    return await email_controller.send_email(to, subject, body)

@router.get("/inbox")
async def get_emails(limit: int = 10):
    return await email_controller.get_emails(limit)