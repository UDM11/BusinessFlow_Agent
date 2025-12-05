from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# routers
from app.routes.slack_routes import router as slack_router
from app.routes.email_routes import router as email_router
from app.routes.notion_routes import router as notion_router
from app.routes.sheets_routes import router as sheets_router
from app.routes.agent_routes import router as agent_router
from app.routes.health_routes import router as health_router


# utils
from app.utils.logger import log_info

def create_app() -> FastAPI:
    app = FastAPI(
        title = "BusinessFlow Agent",
        description="AI-driven workflow orchestration backend",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )


    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


    # startup event
    @app.on_event("startup")
    async def on_startup():
        log_info("BusinessFlow agnet backend hgs started successfully.")


    # shotdown event 
    @app.on_event("shutdown")
    async def on_shotdown():
        log_info("BusinesFlow agent backend has stopped.")



    # router registration 
    app.include_router(health_router, prefix="/api/health", tags=["Health"])
    app.include_router(slack_router, prefix="/api/slack", tags=["Slack"])
    app.include_router(email_router, prefix="/api/email", tags=["Email"])
    app.include_router(notion_router, prefix="/api/notion", tags=["Notion"])
    app.include_router(sheets_router, prefix="/api/sheets", tags=["Sheets"])
    app.include_router(agent_router, prefix="/api/agent", tags=["Agent"])


    return app

app = create_app()