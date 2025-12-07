from pydantic import BaseModel
from typing import Any, Dict, Optional

class SlackMessageRequest(BaseModel):
    channel: str
    text: str

class SlackResponse(BaseModel):
    status: str
    data: Optional[Dict[str, Any]] = None
