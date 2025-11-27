from fastapi import APIRouter
from app.controllers.sheets_controller import SheetsController

router = APIRouter()
sheets_controller = SheetsController()

@router.get("/read/{spreadsheet_id}")
async def read_sheet(spreadsheet_id: str, range_name: str):
    return await sheets_controller.read_sheet(spreadsheet_id, range_name)

@router.post("/write/{spreadsheet_id}")
async def write_sheet(spreadsheet_id: str, range_name: str, values: list):
    return await sheets_controller.write_sheet(spreadsheet_id, range_name, values)