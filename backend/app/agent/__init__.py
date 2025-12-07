from typing import Dict, Any
from .planner import Planner
from .executor import Executor
from .memory import Memory
from .prompt_templates import (
    PLANNER_SYSTEM_PROMPT,
    PLANNER_USER_PROMPT,
    EXECUTOR_ERROR_PROMPT,
    MEMORY_SUMMARY_PROMPT
)

__all__ = [
    "Planner",
    "Executor",
    "Memory",
    "Agent",
    "PLANNER_SYSTEM_PROMPT",
    "PLANNER_USER_PROMPT",
    "EXECUTOR_ERROR_PROMPT",
    "MEMORY_SUMMARY_PROMPT"
]


class Agent:
    """Main agent orchestrator combining planner, executor, and memory"""
    
    def __init__(self):
        self.memory = Memory()
        self.planner = Planner(self.memory)
        self.executor = Executor(self.memory)
    
    async def process_query(self, query: str) -> Dict[str, Any]:
        """
        Process a user query end-to-end
        
        Args:
            query: User's natural language request
            
        Returns:
            Complete execution results
        """
        try:
            # Step 1: Create plan
            plan = await self.planner.create_plan(query)
            
            if not plan:
                return {
                    "success": False,
                    "error": "Could not create a valid plan",
                    "query": query
                }
            
            # Step 2: Execute plan
            results = await self.executor.execute_plan(plan)
            
            # Step 3: Return results
            return {
                "success": results.get("success"),
                "query": query,
                "plan": plan,
                "execution": results
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "query": query
            }
    
    def get_memory(self):
        """Get agent memory"""
        return self.memory
    
    def clear_memory(self):
        """Clear agent memory"""
        self.memory.clear()
