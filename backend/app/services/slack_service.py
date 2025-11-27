import os
from slack_sdk.web.async_client import AsyncWebClient
from config.slack_config import SlackConfig

class SlackService:
    def __init__(self):
        self.client = AsyncWebClient(token=SlackConfig.BOT_TOKEN)
    
    async def send_message(self, channel: str, message: str):
        response = await self.client.chat_postMessage(
            channel=channel,
            text=message
        )
        return response
    
    async def get_channels(self):
        response = await self.client.conversations_list()
        return response["channels"]