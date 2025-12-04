from fastapi import APIRouter
from app.controllers.notion_controller import router as notion_controller

router = APIRouter()
router.include_router(notion_controller)
