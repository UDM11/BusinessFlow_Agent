from typing import List, Dict, Any
from datetime import datetime
from collections import deque


class Memory:
    """Short-term memory for agent conversations and context"""
    
    def __init__(self, max_size: int = 50):
        self.max_size = max_size
        self.history: deque = deque(maxlen=max_size)
        self.context: Dict[str, Any] = {}
    
    def add_message(self, role: str, content: str):
        """Add a message to conversation history"""
        self.history.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
    
    def add_execution(self, step: int, tool: str, result: Dict[str, Any]):
        """Record an execution result"""
        self.history.append({
            "type": "execution",
            "step": step,
            "tool": tool,
            "result": result,
            "timestamp": datetime.now().isoformat()
        })
    
    def get_history(self, last_n: int = None) -> List[Dict]:
        """Get conversation history"""
        if last_n:
            return list(self.history)[-last_n:]
        return list(self.history)
    
    def get_context(self, key: str = None) -> Any:
        """Get context value"""
        if key:
            return self.context.get(key)
        return self.context
    
    def set_context(self, key: str, value: Any):
        """Set context value"""
        self.context[key] = value
    
    def clear(self):
        """Clear all memory"""
        self.history.clear()
        self.context.clear()
    
    def get_recent_executions(self, n: int = 5) -> List[Dict]:
        """Get recent execution results"""
        executions = [h for h in self.history if h.get("type") == "execution"]
        return executions[-n:] if executions else []
