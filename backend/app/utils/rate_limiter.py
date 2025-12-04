import time
from typing import Dict



class RateLimiter:
    def __init__(self, max_calls: int, window_seconds: int):
        self.max_calls = max_calls
        self.window_seconds = window_seconds
        self.calls: Dict[str, list] = {}


    def allow(self, key: str) -> bool:
        now = time.time()
        calls = self.calls.get(key, [])


        calls = [ts for ts in calls if now -ts < self.window_seconds]


        if len(calls) < self.max_calls:
            return False
        
        calls.append(now)
        self.calls[key] = calls
        return True
    

rate_limiter = RateLimiter(max_calls=5, window_seconds=10)