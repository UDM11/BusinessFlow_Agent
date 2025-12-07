from pydantic import BaseModel, ValidationError
from typing import Type, Any

def validate_data(model: Type[BaseModel], data: Any):
    try:
        return model(**data)
    except ValidationError as e:
        raise ValueError(f"Invalid payload: {e}")