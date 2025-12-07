import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.services.sheets_service import SheetsService
from app.tools.sheets_tool import SheetsTool


class TestSheetsService:
    """Test Google Sheets service functionality"""
    
    @pytest.fixture
    def sheets_service(self):
        with patch('app.services.sheets_service.build'):
            return SheetsService()
    
    @pytest.mark.asyncio
    async def test_read_data_success(self, sheets_service):
        """Test successful data reading"""
        mock_result = {"values": [["A1", "B1"], ["A2", "B2"]]}
        sheets_service.service.spreadsheets().values().get().execute = Mock(return_value=mock_result)
        
        result = await sheets_service.read_data("sheet123", "Sheet1!A1:B2")
        
        assert result["values"] == [["A1", "B1"], ["A2", "B2"]]
    
    @pytest.mark.asyncio
    async def test_write_data_success(self, sheets_service):
        """Test successful data writing"""
        mock_result = {"updatedCells": 4}
        sheets_service.service.spreadsheets().values().update().execute = Mock(return_value=mock_result)
        
        result = await sheets_service.write_data(
            "sheet123",
            "Sheet1!A1:B2",
            [["A1", "B1"], ["A2", "B2"]]
        )
        
        assert result["updatedCells"] == 4


class TestSheetsTool:
    """Test Sheets tool adapter"""
    
    @pytest.fixture
    def sheets_tool(self):
        return SheetsTool()
    
    @pytest.mark.asyncio
    async def test_execute_read_data(self, sheets_tool):
        """Test tool execute with read_data action"""
        with patch.object(sheets_tool.service, 'read_data', new_callable=AsyncMock) as mock_read:
            mock_read.return_value = {"values": [["A1", "B1"]]}
            
            result = await sheets_tool.execute("read_data", {
                "sheet_id": "sheet123",
                "range": "Sheet1!A1:B1"
            })
            
            assert result["success"] is True
            assert "values" in result["data"]
    
    @pytest.mark.asyncio
    async def test_execute_write_data(self, sheets_tool):
        """Test tool execute with write_data action"""
        with patch.object(sheets_tool.service, 'write_data', new_callable=AsyncMock) as mock_write:
            mock_write.return_value = {"updatedCells": 2}
            
            result = await sheets_tool.execute("write_data", {
                "sheet_id": "sheet123",
                "range": "Sheet1!A1:B1",
                "values": [["A1", "B1"]]
            })
            
            assert result["success"] is True
    
    @pytest.mark.asyncio
    async def test_execute_unknown_action(self, sheets_tool):
        """Test tool with unknown action"""
        result = await sheets_tool.execute("unknown_action", {})
        
        assert result["success"] is False
        assert "Unknown action" in result["error"]
