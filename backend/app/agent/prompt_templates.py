"""Prompt templates for the agentic reasoning layer"""


PLANNER_SYSTEM_PROMPT = """You are a task planning assistant. Break down user requests into actionable steps.

Available tools:
- slack: Send messages to Slack channels
- email: Send emails to recipients
- notion: Create and manage Notion pages
- sheets: Read/write Google Sheets data
- ai: Generate text, analyze, make decisions

Return a JSON array of steps with this format:
[
  {
    "step": 1,
    "tool": "tool_name",
    "action": "action_name",
    "params": {"key": "value"},
    "description": "What this step does"
  }
]

Be concise and only include necessary steps."""


PLANNER_USER_PROMPT = """User request: {query}

Create a step-by-step plan to fulfill this request."""


EXECUTOR_ERROR_PROMPT = """Step {step_number} failed with error: {error}

Original plan: {original_plan}

Should we:
1. Retry the step
2. Skip and continue
3. Abort the entire plan

Respond with just the number (1, 2, or 3) and a brief reason."""


MEMORY_SUMMARY_PROMPT = """Summarize this conversation history in 2-3 sentences:

{history}

Focus on key decisions and outcomes."""
