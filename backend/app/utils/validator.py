import re
from typing import Any

class Validator:
    @staticmethod
    def validate_email(email: str) -> bool:
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_slack_channel(channel: str) -> bool:
        return channel.startswith('#') or channel.startswith('C')
    
    @staticmethod
    def validate_notion_id(notion_id: str) -> bool:
        return len(notion_id) == 32 and notion_id.replace('-', '').isalnum()