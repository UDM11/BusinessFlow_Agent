from fastapi import Request, status
from fastapi.responses import JSONResponse
from app.utils.rate_limiter import rate_limiter

async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    
    if not rate_limiter.allow(client_ip):
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={"error": "Rate limit exceeded. Please try again later."}
        )
    
    return await call_next(request)
