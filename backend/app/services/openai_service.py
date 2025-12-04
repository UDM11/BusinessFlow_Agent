from openai import OpenAI
from config.openai_config import OpenAIConfig
from app.utils.logger import logger

class OpenAIService:
    def __init__(self):
        self.client = OpenAI(api_key=OpenAIConfig.api_key)

        async def generate(self, prompt: str) -> str:
            try:
                response = self.client.chat.completions.create(
                    model = OpenAIConfig.model,
                    messages = [
                        {"role": "user", "content": prompt}
                    ],
                    timeout=OpenAIConfig.timeout
                )
                text = response.choices[0].message["content"]
                logger.info("OpenAI response generated successfully")
                return text
            
            except Exception as e:
                logger.error(f"OpenAI Error: {str(e)}")
                raise