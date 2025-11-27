import pytest
from unittest.mock import patch, MagicMock
from app.services.email_service import EmailService

@pytest.mark.asyncio
async def test_send_email():
    with patch('smtplib.SMTP') as mock_smtp:
        mock_server = MagicMock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        service = EmailService()
        result = await service.send_email("test@example.com", "Test Subject", "Test Body")
        
        assert result["status"] == "sent"
        assert result["to"] == "test@example.com"
        mock_server.send_message.assert_called_once()

@pytest.mark.asyncio
async def test_get_emails():
    service = EmailService()
    result = await service.get_emails(5)
    
    assert "message" in result