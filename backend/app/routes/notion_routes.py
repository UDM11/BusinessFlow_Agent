from fastapi import APIRouter
from app.controllers.notion_controller import NotionController

router = APIRouter()
notion_controller = NotionController()

@router.post("/create-page")
async def create_page(database_id: str, properties: dict):
    return await notion_controller.create_page(database_id, properties)

@router.get("/pages/{database_id}")
async def get_pages(database_id: str):
    return await notion_controller.get_pages(database_id)