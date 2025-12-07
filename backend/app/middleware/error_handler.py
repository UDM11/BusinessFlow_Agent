from fastapi import Request, status
from fastapi.responses import JSONResponse
from app.utils.logger import logger
from app.utils.exceptions import BusinessFlowError

async def error_handler_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except BusinessFlowError as e:
        logger.error(f"Business error: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e), "type": "business_error"}
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "Internal server error", "type": "server_error"}
        )
