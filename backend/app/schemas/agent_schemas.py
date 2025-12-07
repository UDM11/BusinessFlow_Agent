from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class AgentRequest(BaseModel):
    user_input: str

class AgentResponse(BaseModel):
    status: str
    result: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    plan: Optional[List[Dict[str, Any]]] = None
    execution: Optional[Dict[str, Any]] = None
