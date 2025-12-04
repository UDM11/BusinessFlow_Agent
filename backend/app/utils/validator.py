from pydantic import BaseModel, ValidationError
from typing import Type, Any



def validate_data(model: Type[BaseModel], data: Any):
    try:
        return schema(**data)
    
    except ValidationError as e:
        raise ValueError(f"Invalid payload: {e}")