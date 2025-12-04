import httpx
from typing import Any, Dict


class HttpClient:
    def __init__(self, timeout: int = 15):
        self.client = httpx.AsyncClient(timeout=timeout)

    async def get(self, url: str, headers: Dict[str, Any] = None):
        response = await self.client.get(url, headers=headers)
        response.raise_for_status()
        return response.json()

    async def post(self, url: str, json: Dict[str, Any] = None, headers: Dict[str, Any] = None):
        response = await self.client.post(url, json=json, headers=headers)
        response.raise_for_status()
        return response.json()

    async def close(self):
        await self.client.aclose()


http_client = HttpClient()
