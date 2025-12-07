import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.services.notion_service import NotionService
from app.tools.notion_tool import NotionTool


class TestNotionService:
    """Test Notion service functionality"""
    
    @pytest.fixture
    def notion_service(self):
        return NotionService()
    
    @pytest.mark.asyncio
    @patch('app.services.notion_service.requests.post')
    async def test_create_page_success(self, mock_post, notion_service):
        """Test successful page creation"""
        mock_response = Mock()
        mock_response.json.return_value = {"id": "page123", "object": "page"}
        mock_response.raise_for_status = Mock()
        mock_post.return_value = mock_response
        
        result = await notion_service.create_page("Test Page", "Test content")
        
        assert result["id"] == "page123"
        assert result["object"] == "page"
        mock_post.assert_called_once()
    
    @pytest.mark.asyncio
    @patch('app.services.notion_service.requests.post')
    async def test_create_page_failure(self, mock_post, notion_service):
        """Test page creation failure"""
        mock_post.side_effect = Exception("API error")
        
        with pytest.raises(Exception):
            await notion_service.create_page("Test", "Content")


class TestNotionTool:
    """Test Notion tool adapter"""
    
    @pytest.fixture
    def notion_tool(self):
        return NotionTool()
    
    @pytest.mark.asyncio
    async def test_execute_create_page(self, notion_tool):
        """Test tool execute with create_page action"""
        with patch.object(notion_tool.service, 'create_page', new_callable=AsyncMock) as mock_create:
            mock_create.return_value = {"id": "page123"}
            
            result = await notion_tool.execute("create_page", {
                "title": "Test Page",
                "content": "Test content"
            })
            
            assert result["success"] is True
            assert result["data"]["id"] == "page123"
    
    @pytest.mark.asyncio
    async def test_execute_unknown_action(self, notion_tool):
        """Test tool with unknown action"""
        result = await notion_tool.execute("unknown_action", {})
        
        assert result["success"] is False
        assert "Unknown action" in result["error"]
