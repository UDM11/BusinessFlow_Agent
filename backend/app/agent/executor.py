from typing import List, Dict, Any
from app.tools import ToolRegistry
from app.agent.memory import Memory
from app.utils.logger import logger


class Executor:
    """Executes planned steps using available tools"""
    
    def __init__(self, memory: Memory = None):
        self.tool_registry = ToolRegistry()
        self.memory = memory or Memory()
    
    async def execute_plan(self, plan: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Execute a complete plan step by step
        
        Args:
            plan: List of steps from Planner
            
        Returns:
            Execution results with success status
        """
        results = []
        failed_steps = []
        
        try:
            for step in plan:
                step_num = step.get("step", 0)
                tool_name = step.get("tool")
                action = step.get("action")
                params = step.get("params", {})
                description = step.get("description", "")
                
                logger.info(f"Executing step {step_num}: {description}")
                
                # Execute the step
                result = await self.execute_step(tool_name, action, params)
                
                # Record result
                self.memory.add_execution(step_num, tool_name, result)
                
                results.append({
                    "step": step_num,
                    "description": description,
                    "result": result
                })
                
                # Stop if step failed
                if not result.get("success"):
                    failed_steps.append(step_num)
                    logger.warning(f"Step {step_num} failed: {result.get('error')}")
                    # Continue to next step instead of breaking
            
            # Summary
            success = len(failed_steps) == 0
            
            return {
                "success": success,
                "total_steps": len(plan),
                "completed_steps": len(results),
                "failed_steps": failed_steps,
                "results": results
            }
            
        except Exception as e:
            logger.error(f"Executor error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "results": results
            }
    
    async def execute_step(self, tool_name: str, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a single step"""
        try:
            result = await self.tool_registry.execute_tool(tool_name, action, params)
            return result
            
        except Exception as e:
            logger.error(f"Step execution error: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_execution_summary(self) -> str:
        """Get a summary of recent executions"""
        executions = self.memory.get_recent_executions()
        
        if not executions:
            return "No recent executions"
        
        summary = f"Last {len(executions)} executions:\n"
        for ex in executions:
            status = "✓" if ex["result"].get("success") else "✗"
            summary += f"{status} Step {ex['step']}: {ex['tool']}\n"
        
        return summary
