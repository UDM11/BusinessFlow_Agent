import pytest
from unittest.mock import AsyncMock, patch
from app.services.notion_service import NotionService

@pytest.mark.asyncio
async def test_create_page():
    with patch('app.services.notion_service.AsyncClient') as mock_client:
        mock_client.return_value.pages.create = AsyncMock(
            return_value={"id": "page123", "properties": {}}
        )
        
        service = NotionService()
        result = await service.create_page("db123", {"title": "Test Page"})
        
        assert result["id"] == "page123"
        mock_client.return_value.pages.create.assert_called_once()

@pytest.mark.asyncio
async def test_get_pages():
    with patch('app.services.notion_service.AsyncClient') as mock_client:
        mock_client.return_value.databases.query = AsyncMock(
            return_value={"results": [{"id": "page1"}, {"id": "page2"}]}
        )
        
        service = NotionService()
        result = await service.get_pages("db123")
        
        assert len(result) == 2
        assert result[0]["id"] == "page1"