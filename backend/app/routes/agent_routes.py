from fastapi import APIRouter
from app.controllers.agent_controller import router as agent_controller

router = APIRouter()
router.include_router(agent_controller)