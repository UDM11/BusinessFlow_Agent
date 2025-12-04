from app.services.workflow_service import WorkflowService
from app.utils.logger import logger


class AgentService:
    def __init__(self):
        self.workflow = WorkflowService()

    async def handle_task(self, user_input: str) -> dict:
        try:
            plan = self.workflow.plan(user_input)
            result = await self.workflow.execute(plan)
            logger.info("Agent task completed")
            return {"status": "success", "result": result}
        except Exception as e:
            logger.error(f"Agent error: {str(e)}")
            return {"status": "error", "message": str(e)}
