from app.services.slack_service import SlackService
from app.services.email_service import EmailService
from app.services.notion_service import NotionService
from app.services.sheets_service import SheetsService
from app.services.openai_service import OpenAIService
from app.utils.logger import logger


class WorkflowService:
    def __init__(self):
        self.slack = SlackService()
        self.email = EmailService()
        self.notion = NotionService()
        self.sheets = SheetsService()
        self.ai = OpenAIService()

    def plan(self, user_input: str) -> dict:
        if "slack" in user_input.lower():
            return {"action": "slack", "text": user_input}

        if "email" in user_input.lower():
            return {"action": "email", "text": user_input, "to": "example@gmail.com"}

        if "notion" in user_input.lower():
            return {"action": "notion", "title": "Auto Note", "content": user_input}

        if "sheet" in user_input.lower():
            return {"action": "sheet", "row": [user_input]}

        return {"action": "ai", "prompt": user_input}

    async def execute(self, plan: dict):
        action = plan["action"]

        match action:
            case "slack":
                return await self.slack.send_message("#general", plan["text"])
            case "email":
                return self.email.send_email(plan["to"], "Automated Mail", plan["text"])
            case "notion":
                return await self.notion.create_page(plan["title"], plan["content"])
            case "sheet":
                return self.sheets.append_row(plan["row"])
            case "ai":
                return await self.ai.generate(plan["prompt"])
            case _:
                raise Exception("Unknown action type")
