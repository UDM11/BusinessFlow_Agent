from fastapi import APIRouter
from app.controllers.email_controller import router as email_controller

router = APIRouter()
router.include_router(email_controller)
