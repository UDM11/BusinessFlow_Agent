from fastapi import APIRouter
from app.controllers.slack_controller import router as slack_controller

router = APIRouter()
router.include_router(slack_controller)
