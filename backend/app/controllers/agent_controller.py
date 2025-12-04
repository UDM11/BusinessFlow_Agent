from fastapi import APIRouter, HTTPException
from app.services.agent_service import AgentService
from app.utils.logger import logger


router = APIRouter(prefix="/agent", tags=["Agent"])
agent_service = AgentService()


@router.post("/run")
async def run_agent(user_input: str):
    try:
        result = await agent_service.handle_task(user_input)
        return result
    

    except Exception as e:
        logger.error(f"Agent controller Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))