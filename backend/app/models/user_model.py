from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    slack_user_id: Optional[str] = None
    notion_user_id: Optional[str] = None
    is_active: bool = True