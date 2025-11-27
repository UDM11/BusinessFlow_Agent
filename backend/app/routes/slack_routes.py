from fastapi import APIRouter
from app.controllers.slack_controller import SlackController

router = APIRouter()
slack_controller = SlackController()

@router.post("/send-message")
async def send_message(channel: str, message: str):
    return await slack_controller.send_message(channel, message)

@router.get("/channels")
async def get_channels():
    return await slack_controller.get_channels()