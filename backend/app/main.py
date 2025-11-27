from fastapi import FastAPI
from app.routes import slack_routes, email_routes, notion_routes, sheets_routes

app = FastAPI(title="BusinessFlow Agent", version="1.0.0")

# Include routers
app.include_router(slack_routes.router, prefix="/api/slack", tags=["slack"])
app.include_router(email_routes.router, prefix="/api/email", tags=["email"])
app.include_router(notion_routes.router, prefix="/api/notion", tags=["notion"])
app.include_router(sheets_routes.router, prefix="/api/sheets", tags=["sheets"])

@app.get("/")
async def root():
    return {"message": "BusinessFlow Agent API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)