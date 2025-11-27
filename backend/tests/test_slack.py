import pytest
from unittest.mock import AsyncMock, patch
from app.services.slack_service import SlackService

@pytest.mark.asyncio
async def test_send_message():
    with patch('app.services.slack_service.AsyncWebClient') as mock_client:
        mock_client.return_value.chat_postMessage = AsyncMock(return_value={"ok": True})
        
        service = SlackService()
        result = await service.send_message("#general", "Test message")
        
        assert result["ok"] is True
        mock_client.return_value.chat_postMessage.assert_called_once()

@pytest.mark.asyncio
async def test_get_channels():
    with patch('app.services.slack_service.AsyncWebClient') as mock_client:
        mock_client.return_value.conversations_list = AsyncMock(
            return_value={"channels": [{"id": "C123", "name": "general"}]}
        )
        
        service = SlackService()
        result = await service.get_channels()
        
        assert len(result) == 1
        assert result[0]["name"] == "general"