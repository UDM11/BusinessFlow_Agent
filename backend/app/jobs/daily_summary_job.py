from datetime import datetime, timedelta
from app.tools import ToolRegistry
from app.agent import Agent
from app.utils.logger import logger


class DailySummaryJob:
    """Daily summary job that sends reports via Slack/Email"""
    
    def __init__(self):
        self.tool_registry = ToolRegistry()
        self.agent = Agent()
    
    async def run(self):
        """Execute daily summary job"""
        try:
            logger.info("Starting daily summary job")
            
            # Get summary data
            summary = await self._generate_summary()
            
            # Send to Slack
            await self._send_to_slack(summary)
            
            # Send via Email (optional)
            # await self._send_via_email(summary)
            
            logger.info("Daily summary job completed")
            
        except Exception as e:
            logger.error(f"Daily summary job failed: {str(e)}")
    
    async def _generate_summary(self) -> str:
        """Generate daily summary content"""
        today = datetime.now().strftime("%Y-%m-%d")
        
        # Get execution history from agent memory
        memory = self.agent.get_memory()
        executions = memory.get_recent_executions(n=20)
        
        # Build summary
        total_tasks = len(executions)
        successful = sum(1 for ex in executions if ex["result"].get("success"))
        failed = total_tasks - successful
        
        summary = f"""📊 Daily Summary - {today}
        
✅ Total Tasks: {total_tasks}
✓ Successful: {successful}
✗ Failed: {failed}

Recent Activity:
"""
        
        # Add recent executions
        for ex in executions[-5:]:
            status = "✓" if ex["result"].get("success") else "✗"
            tool = ex.get("tool", "unknown")
            summary += f"{status} {tool}\n"
        
        return summary
    
    async def _send_to_slack(self, summary: str):
        """Send summary to Slack"""
        try:
            result = await self.tool_registry.execute_tool(
                "slack",
                "send_to_default",
                {"text": summary}
            )
            
            if result.get("success"):
                logger.info("Daily summary sent to Slack")
            else:
                logger.warning(f"Failed to send to Slack: {result.get('error')}")
                
        except Exception as e:
            logger.error(f"Slack send error: {str(e)}")
    
    async def _send_via_email(self, summary: str):
        """Send summary via email"""
        try:
            result = await self.tool_registry.execute_tool(
                "email",
                "send_email",
                {
                    "to": "admin@example.com",
                    "subject": f"Daily Summary - {datetime.now().strftime('%Y-%m-%d')}",
                    "message": summary
                }
            )
            
            if result.get("success"):
                logger.info("Daily summary sent via email")
            else:
                logger.warning(f"Failed to send email: {result.get('error')}")
                
        except Exception as e:
            logger.error(f"Email send error: {str(e)}")


# Job instance
daily_summary_job = DailySummaryJob()
 