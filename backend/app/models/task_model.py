from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    status: str = "pending"
    priority: str = "medium"
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    assigned_to: Optional[str] = None