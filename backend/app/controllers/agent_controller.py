from fastapi import APIRouter, HTTPException
from app.schemas.agent_schemas import AgentRequest, AgentResponse
from pydantic import BaseModel
import uuid

class WorkflowRequest(BaseModel):
    prompt: str
from app.services.agent_service import AgentService
from app.utils.logger import logger

router = APIRouter()
agent_service = AgentService()

@router.post("/execute")
async def execute_workflow(request: WorkflowRequest):
    try:
        result = await agent_service.handle_task(request.prompt)
        return {"execution_id": result.get("id", "exec_123"), **result}
    except Exception as e:
        logger.error(f"Agent controller error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{execution_id}")
async def get_execution_status(execution_id: str):
    # Mock implementation - replace with actual status tracking
    return {
        "id": execution_id,
        "status": "completed",
        "prompt": "Sample workflow",
        "steps": [
            {"title": "Planning", "status": "completed", "description": "Workflow planned"},
            {"title": "Execution", "status": "completed", "description": "Tools executed"}
        ],
        "tools": [
            {"name": "email", "status": "completed", "action": "Send email"}
        ]
    }

@router.get("/history")
async def get_workflow_history():
    # Mock implementation - replace with actual database query
    return [
        {
            "id": 1,
            "prompt": "Send summary to manager",
            "status": "completed",
            "created_at": "2024-01-01T10:00:00Z",
            "duration": 45
        }
    ]