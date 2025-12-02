import logging
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from config.slack_config import SLACK_TOKEN


logger = logging.getLogger(__name__)


class SlackService:
    def __init__(self, token: str = SLACK_TOKEN):
        self.client = WebClient(
            token = token
        )

    
    def send_message(self, channel:str, text: str) -> dict:
        """
        Send a message to a Slack channel.
        """

        try:
            response = self.client.chat_postMessage(
                channel = channel,
                text = text
            )
            logger.info(f"Message sent to {channel}: {text}")
            return response.data
        
        except SlackApiError as e:
            logger.error(f"Slcak API error: {e.response['error']}")
            raise e
        


    def fetch_channels(self) -> list:
        """
        List all available channels.
        """

        try:
            response = self.client.conversations_list(
                types = "public_channel,private_channel"
            )
            channels  = response["channels"]
            logger.info(f"Fetched {len(channels)} channels.")
            return channels
        
        except SlackApiError as e:
            logger.error(f"Error fetching channels: {e.response['error']}")
            return []