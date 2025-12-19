from fastapi import APIRouter, HTTPException
from app.schemas.slack_schemas import SlackMessageRequest, SlackResponse
from typing import Dict, Any
from app.services.slack_service import SlackService
from app.utils.logger import logger

router = APIRouter()
slack_service = SlackService()


@router.post("/send", response_model=SlackResponse)
async def send_slack_message(request: SlackMessageRequest):
    try:
        result = await slack_service.send_message(request.channel, request.text)
        return SlackResponse(status="success", data=result)
    except Exception as e:
        logger.error(f"Slack controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/test")
async def test_slack_connection(request: dict):
    try:
        # Mock test - replace with actual Slack API test
        token = request.get("token")
        if not token or not token.startswith("xoxb-"):
            return {"success": False, "message": "Invalid token format"}
        return {"success": True, "message": "Slack connection successful"}
    except Exception as e:
        logger.error(f"Slack test error: {str(e)}")
        return {"success": False, "message": str(e)}