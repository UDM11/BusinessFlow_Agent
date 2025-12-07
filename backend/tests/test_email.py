import pytest
from unittest.mock import Mock, patch, MagicMock
from app.services.email_service import EmailService
from app.tools.email_tool import EmailTool


class TestEmailService:
    """Test Email service functionality"""
    
    @pytest.fixture
    def email_service(self):
        return EmailService()
    
    @patch('app.services.email_service.smtplib.SMTP')
    def test_send_email_success(self, mock_smtp, email_service):
        """Test successful email sending"""
        mock_server = MagicMock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        result = email_service.send_email(
            to="test@example.com",
            subject="Test",
            message="Test message"
        )
        
        assert result is True
        mock_server.starttls.assert_called_once()
        mock_server.login.assert_called_once()
        mock_server.sendmail.assert_called_once()
    
    @patch('app.services.email_service.smtplib.SMTP')
    def test_send_email_failure(self, mock_smtp, email_service):
        """Test email sending failure"""
        mock_smtp.side_effect = Exception("SMTP error")
        
        result = email_service.send_email(
            to="test@example.com",
            subject="Test",
            message="Test message"
        )
        
        assert result is False


class TestEmailTool:
    """Test Email tool adapter"""
    
    @pytest.fixture
    def email_tool(self):
        return EmailTool()
    
    def test_execute_send_email(self, email_tool):
        """Test tool execute with send_email action"""
        with patch.object(email_tool.service, 'send_email') as mock_send:
            mock_send.return_value = True
            
            result = email_tool.execute("send_email", {
                "to": "test@example.com",
                "subject": "Test",
                "message": "Hello"
            })
            
            assert result["success"] is True
            assert result["data"]["to"] == "test@example.com"
    
    def test_execute_unknown_action(self, email_tool):
        """Test tool with unknown action"""
        result = email_tool.execute("unknown_action", {})
        
        assert result["success"] is False
        assert "Unknown action" in result["error"]
