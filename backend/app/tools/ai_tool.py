from typing import Dict, Any, List
from app.services.openai_service import OpenAIService
from app.utils.logger import logger


class AITool:
    """LLM-driven tool for intelligent decision making and text generation"""
    
    def __init__(self):
        self.service = OpenAIService()
        self.name = "ai"
        self.description = "Use AI for text generation, analysis, and decision making"
    
    async def execute(self, action: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute AI actions"""
        try:
            if action == "generate_text":
                prompt = params.get("prompt")
                max_tokens = params.get("max_tokens", 500)
                result = await self.service.generate_text(prompt, max_tokens)
                return {"success": True, "data": {"text": result}}
            
            elif action == "analyze_text":
                text = params.get("text")
                instruction = params.get("instruction", "Analyze this text")
                prompt = f"{instruction}:\n\n{text}"
                result = await self.service.generate_text(prompt)
                return {"success": True, "data": {"analysis": result}}
            
            elif action == "make_decision":
                context = params.get("context")
                options = params.get("options", [])
                prompt = f"Context: {context}\n\nOptions: {', '.join(options)}\n\nChoose the best option and explain why."
                result = await self.service.generate_text(prompt)
                return {"success": True, "data": {"decision": result}}
            
            elif action == "chat":
                messages = params.get("messages", [])
                result = await self.service.chat_completion(messages)
                return {"success": True, "data": {"response": result}}
            
            else:
                return {"success": False, "error": f"Unknown action: {action}"}
        
        except Exception as e:
            logger.error(f"AITool error: {str(e)}")
            return {"success": False, "error": str(e)}
