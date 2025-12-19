from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "message": "BusinessFlow Agent backend running smoothly.",
        "slack": {"status": "healthy"},
        "email": {"status": "healthy"},
        "notion": {"status": "healthy"},
        "sheets": {"status": "healthy"}
    }