from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from config.slack_config import SlackConfig
from app.utils.logger import logger


class SlackService:
    def __init__(self):
        self.client = WebClient(token=SlackConfig.bot_token)

    async def send_message(self, channel: str, text: str) -> dict:
        try:
            response = self.client.chat_postMessage(
                channel=channel,
                text=text
            )
            logger.info(f"Slack message sent → {channel}")
            return response.data
        except SlackApiError as e:
            logger.error(f"Slack Error: {e.response['error']}")
            raise Exception(f"Slack API error: {e.response['error']}")

    async def send_to_default(self, text: str) -> dict:
        return await self.send_message(SlackConfig.default_channel, text)
