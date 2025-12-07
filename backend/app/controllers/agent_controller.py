from fastapi import APIRouter, HTTPException
from app.schemas.agent_schemas import AgentRequest, AgentResponse
from app.services.agent_service import AgentService
from app.utils.logger import logger

router = APIRouter()
agent_service = AgentService()

@router.post("/run")
async def run_agent(request: AgentRequest):
    try:
        result = await agent_service.handle_task(request.user_input)
        return result
    except Exception as e:
        logger.error(f"Agent controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))