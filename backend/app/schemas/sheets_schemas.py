from pydantic import BaseModel
from typing import List

class SheetsAppendRequest(BaseModel):
    row: List[str]

class SheetsResponse(BaseModel):
    status: str
    message: str
