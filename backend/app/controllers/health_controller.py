from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/")
def health_check():
    return {"status": "ok", "message": "BusinessFlow Agent backned running smoothly."}