from .settings import settings

class SlackConfig:
    bot_token = settings.SLACK_BOT_TOKEN
    signing_secret = settings.SLACK_SIGNING_SECRET
    default_channel = settings.SLACK_DEFAULT_CHANNEL
