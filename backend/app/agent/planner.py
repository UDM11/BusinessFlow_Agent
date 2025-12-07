import json
from typing import List, Dict, Any
from app.services.openai_service import OpenAIService
from app.agent.prompt_templates import PLANNER_SYSTEM_PROMPT, PLANNER_USER_PROMPT
from app.agent.memory import Memory
from app.utils.logger import logger


class Planner:
    """Converts user queries into actionable step-by-step plans"""
    
    def __init__(self, memory: Memory = None):
        self.openai_service = OpenAIService()
        self.memory = memory or Memory()
    
    async def create_plan(self, query: str) -> List[Dict[str, Any]]:
        """
        Turn a user query into a structured plan
        
        Args:
            query: User's natural language request
            
        Returns:
            List of steps with tool, action, and params
        """
        try:
            # Add query to memory
            self.memory.add_message("user", query)
            
            # Build prompt
            user_prompt = PLANNER_USER_PROMPT.format(query=query)
            
            # Get plan from LLM
            messages = [
                {"role": "system", "content": PLANNER_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ]
            
            response = await self.openai_service.generate(
                prompt=f"{PLANNER_SYSTEM_PROMPT}\n\n{user_prompt}"
            )
            
            # Parse JSON response
            plan = self._parse_plan(response)
            
            # Store plan in memory
            self.memory.set_context("current_plan", plan)
            self.memory.add_message("assistant", f"Created plan with {len(plan)} steps")
            
            logger.info(f"Plan created with {len(plan)} steps")
            return plan
            
        except Exception as e:
            logger.error(f"Planner error: {str(e)}")
            raise
    
    def _parse_plan(self, response: str) -> List[Dict[str, Any]]:
        """Parse LLM response into structured plan"""
        try:
            # Try to extract JSON from response
            start = response.find("[")
            end = response.rfind("]") + 1
            
            if start != -1 and end > start:
                json_str = response[start:end]
                plan = json.loads(json_str)
                return plan
            
            # Fallback: return empty plan
            logger.warning("Could not parse plan from response")
            return []
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parse error: {str(e)}")
            return []
    
    def validate_plan(self, plan: List[Dict[str, Any]]) -> bool:
        """Validate plan structure"""
        required_fields = ["step", "tool", "action", "params"]
        
        for step in plan:
            if not all(field in step for field in required_fields):
                return False
        
        return True
