import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.services.openai_service import OpenAIService
from app.tools.ai_tool import AITool


class TestOpenAIService:
    """Test OpenAI service functionality"""
    
    @pytest.fixture
    def openai_service(self):
        return OpenAIService()
    
    @pytest.mark.asyncio
    @patch('app.services.openai_service.OpenAI')
    async def test_generate_success(self, mock_openai, openai_service):
        """Test successful text generation"""
        mock_response = Mock()
        mock_response.choices = [Mock(message={"content": "Generated text"})]
        openai_service.client.chat.completions.create = Mock(return_value=mock_response)
        
        result = await openai_service.generate("Test prompt")
        
        assert result == "Generated text"
    
    @pytest.mark.asyncio
    @patch('app.services.openai_service.OpenAI')
    async def test_generate_failure(self, mock_openai, openai_service):
        """Test generation failure"""
        openai_service.client.chat.completions.create = Mock(side_effect=Exception("API error"))
        
        with pytest.raises(Exception):
            await openai_service.generate("Test prompt")


class TestAITool:
    """Test AI tool adapter"""
    
    @pytest.fixture
    def ai_tool(self):
        return AITool()
    
    @pytest.mark.asyncio
    async def test_execute_generate_text(self, ai_tool):
        """Test tool execute with generate_text action"""
        with patch.object(ai_tool.service, 'generate_text', new_callable=AsyncMock) as mock_gen:
            mock_gen.return_value = "Generated text"
            
            result = await ai_tool.execute("generate_text", {
                "prompt": "Test prompt",
                "max_tokens": 100
            })
            
            assert result["success"] is True
            assert result["data"]["text"] == "Generated text"
    
    @pytest.mark.asyncio
    async def test_execute_analyze_text(self, ai_tool):
        """Test tool execute with analyze_text action"""
        with patch.object(ai_tool.service, 'generate_text', new_callable=AsyncMock) as mock_gen:
            mock_gen.return_value = "Analysis result"
            
            result = await ai_tool.execute("analyze_text", {
                "text": "Sample text",
                "instruction": "Analyze sentiment"
            })
            
            assert result["success"] is True
            assert result["data"]["analysis"] == "Analysis result"
    
    @pytest.mark.asyncio
    async def test_execute_make_decision(self, ai_tool):
        """Test tool execute with make_decision action"""
        with patch.object(ai_tool.service, 'generate_text', new_callable=AsyncMock) as mock_gen:
            mock_gen.return_value = "Option A is best"
            
            result = await ai_tool.execute("make_decision", {
                "context": "Need to choose",
                "options": ["Option A", "Option B"]
            })
            
            assert result["success"] is True
            assert "decision" in result["data"]
    
    @pytest.mark.asyncio
    async def test_execute_unknown_action(self, ai_tool):
        """Test tool with unknown action"""
        result = await ai_tool.execute("unknown_action", {})
        
        assert result["success"] is False
        assert "Unknown action" in result["error"]
