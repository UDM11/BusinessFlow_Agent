import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.agent import Agent, Planner, Executor, Memory
from app.tools import ToolRegistry


class TestMemory:
    """Test Memory functionality"""
    
    @pytest.fixture
    def memory(self):
        return Memory()
    
    def test_add_message(self, memory):
        """Test adding messages to memory"""
        memory.add_message("user", "Hello")
        history = memory.get_history()
        
        assert len(history) == 1
        assert history[0]["role"] == "user"
        assert history[0]["content"] == "Hello"
    
    def test_add_execution(self, memory):
        """Test adding execution results"""
        memory.add_execution(1, "slack", {"success": True})
        executions = memory.get_recent_executions()
        
        assert len(executions) == 1
        assert executions[0]["step"] == 1
        assert executions[0]["tool"] == "slack"
    
    def test_context_management(self, memory):
        """Test context get/set"""
        memory.set_context("key", "value")
        
        assert memory.get_context("key") == "value"
        assert "key" in memory.get_context()
    
    def test_clear_memory(self, memory):
        """Test clearing memory"""
        memory.add_message("user", "Test")
        memory.set_context("key", "value")
        memory.clear()
        
        assert len(memory.get_history()) == 0
        assert len(memory.get_context()) == 0


class TestPlanner:
    """Test Planner functionality"""
    
    @pytest.fixture
    def planner(self):
        return Planner()
    
    @pytest.mark.asyncio
    async def test_create_plan(self, planner):
        """Test plan creation"""
        mock_plan = [
            {"step": 1, "tool": "slack", "action": "send_message", "params": {}}
        ]
        
        with patch.object(planner.openai_service, 'generate', new_callable=AsyncMock) as mock_gen:
            mock_gen.return_value = str(mock_plan)
            
            plan = await planner.create_plan("Send a Slack message")
            
            assert isinstance(plan, list)
    
    def test_validate_plan(self, planner):
        """Test plan validation"""
        valid_plan = [
            {"step": 1, "tool": "slack", "action": "send_message", "params": {}, "description": "Send msg"}
        ]
        invalid_plan = [
            {"step": 1, "tool": "slack"}  # Missing required fields
        ]
        
        assert planner.validate_plan(valid_plan) is True
        assert planner.validate_plan(invalid_plan) is False


class TestExecutor:
    """Test Executor functionality"""
    
    @pytest.fixture
    def executor(self):
        return Executor()
    
    @pytest.mark.asyncio
    async def test_execute_step(self, executor):
        """Test single step execution"""
        with patch.object(executor.tool_registry, 'execute_tool', new_callable=AsyncMock) as mock_exec:
            mock_exec.return_value = {"success": True, "data": {}}
            
            result = await executor.execute_step("slack", "send_message", {})
            
            assert result["success"] is True
    
    @pytest.mark.asyncio
    async def test_execute_plan(self, executor):
        """Test full plan execution"""
        plan = [
            {"step": 1, "tool": "slack", "action": "send_message", "params": {}, "description": "Send"}
        ]
        
        with patch.object(executor, 'execute_step', new_callable=AsyncMock) as mock_step:
            mock_step.return_value = {"success": True}
            
            result = await executor.execute_plan(plan)
            
            assert result["success"] is True
            assert result["total_steps"] == 1
            assert result["completed_steps"] == 1


class TestAgent:
    """Test Agent orchestrator"""
    
    @pytest.fixture
    def agent(self):
        return Agent()
    
    @pytest.mark.asyncio
    async def test_process_query(self, agent):
        """Test end-to-end query processing"""
        mock_plan = [
            {"step": 1, "tool": "slack", "action": "send_message", "params": {}, "description": "Send"}
        ]
        
        with patch.object(agent.planner, 'create_plan', new_callable=AsyncMock) as mock_plan_fn:
            with patch.object(agent.executor, 'execute_plan', new_callable=AsyncMock) as mock_exec:
                mock_plan_fn.return_value = mock_plan
                mock_exec.return_value = {"success": True, "results": []}
                
                result = await agent.process_query("Send a message")
                
                assert result["success"] is True
                assert "plan" in result
                assert "execution" in result
    
    def test_get_memory(self, agent):
        """Test getting agent memory"""
        memory = agent.get_memory()
        
        assert isinstance(memory, Memory)
    
    def test_clear_memory(self, agent):
        """Test clearing agent memory"""
        agent.memory.add_message("user", "Test")
        agent.clear_memory()
        
        assert len(agent.memory.get_history()) == 0
