from pydantic import BaseModel
from typing import Any, Dict, Optional

class NotionPageRequest(BaseModel):
    title: str
    content: str

class NotionResponse(BaseModel):
    status: str
    data: Optional[Dict[str, Any]] = None
