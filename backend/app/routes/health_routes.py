from fastapi import APIRouter
from app.controllers.health_controller import router as health_controller

router = APIRouter()
router.include_router(health_controller)