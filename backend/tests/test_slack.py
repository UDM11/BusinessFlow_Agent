import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.services.slack_service import SlackService
from app.tools.slack_tool import SlackTool


class TestSlackService:
    """Test Slack service functionality"""
    
    @pytest.fixture
    def slack_service(self):
        return SlackService()
    
    @pytest.mark.asyncio
    @patch('app.services.slack_service.WebClient')
    async def test_send_message_success(self, mock_client, slack_service):
        """Test successful message sending"""
        mock_response = Mock()
        mock_response.data = {"ok": True, "channel": "C123", "ts": "1234567890.123456"}
        slack_service.client.chat_postMessage = Mock(return_value=mock_response)
        
        result = await slack_service.send_message("general", "Test message")
        
        assert result["ok"] is True
        assert "channel" in result
    
    @pytest.mark.asyncio
    async def test_send_to_default(self, slack_service):
        """Test sending to default channel"""
        with patch.object(slack_service, 'send_message', new_callable=AsyncMock) as mock_send:
            mock_send.return_value = {"ok": True}
            
            result = await slack_service.send_to_default("Test")
            
            mock_send.assert_called_once()
            assert result["ok"] is True


class TestSlackTool:
    """Test Slack tool adapter"""
    
    @pytest.fixture
    def slack_tool(self):
        return SlackTool()
    
    @pytest.mark.asyncio
    async def test_execute_send_message(self, slack_tool):
        """Test tool execute with send_message action"""
        with patch.object(slack_tool.service, 'send_message', new_callable=AsyncMock) as mock_send:
            mock_send.return_value = {"ok": True}
            
            result = await slack_tool.execute("send_message", {
                "channel": "general",
                "text": "Hello"
            })
            
            assert result["success"] is True
    
    @pytest.mark.asyncio
    async def test_execute_unknown_action(self, slack_tool):
        """Test tool with unknown action"""
        result = await slack_tool.execute("unknown_action", {})
        
        assert result["success"] is False
        assert "Unknown action" in result["error"]
