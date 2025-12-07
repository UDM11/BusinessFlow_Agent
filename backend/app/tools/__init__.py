from .slack_tool import SlackTool
from .email_tool import EmailTool
from .notion_tool import NotionTool
from .sheets_tool import SheetsTool
from .ai_tool import AITool

__all__ = [
    "SlackTool",
    "EmailTool", 
    "NotionTool",
    "SheetsTool",
    "AITool"
]


class ToolRegistry:
    """Central registry for all available tools"""
    
    def __init__(self):
        self.tools = {
            "slack": SlackTool(),
            "email": EmailTool(),
            "notion": NotionTool(),
            "sheets": SheetsTool(),
            "ai": AITool()
        }
    
    def get_tool(self, tool_name: str):
        """Get a tool by name"""
        return self.tools.get(tool_name)
    
    def list_tools(self):
        """List all available tools"""
        return {
            name: {"name": tool.name, "description": tool.description}
            for name, tool in self.tools.items()
        }
    
    async def execute_tool(self, tool_name: str, action: str, params: dict):
        """Execute a tool action"""
        tool = self.get_tool(tool_name)
        if not tool:
            return {"success": False, "error": f"Tool not found: {tool_name}"}
        
        return await tool.execute(action, params)
