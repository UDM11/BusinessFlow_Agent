"""Pytest configuration and shared fixtures"""
import pytest
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))


@pytest.fixture
def mock_env(monkeypatch):
    """Mock environment variables"""
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")
    monkeypatch.setenv("SLACK_BOT_TOKEN", "test-token")
    monkeypatch.setenv("NOTION_API_KEY", "test-key")
    monkeypatch.setenv("EMAIL_HOST", "smtp.test.com")
    monkeypatch.setenv("EMAIL_PORT", "587")
    monkeypatch.setenv("EMAIL_USER", "test@test.com")
    monkeypatch.setenv("EMAIL_PASSWORD", "test-pass")


@pytest.fixture
def sample_plan():
    """Sample execution plan"""
    return [
        {
            "step": 1,
            "tool": "slack",
            "action": "send_message",
            "params": {"channel": "general", "text": "Test"},
            "description": "Send test message"
        },
        {
            "step": 2,
            "tool": "email",
            "action": "send_email",
            "params": {"to": "test@example.com", "subject": "Test", "message": "Test"},
            "description": "Send test email"
        }
    ]
