from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.utils.logger import setup_logger

logger = setup_logger("scheduler")

class TaskScheduler:
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
    
    def start(self):
        self.scheduler.start()
        logger.info("Scheduler started")
    
    def stop(self):
        self.scheduler.shutdown()
        logger.info("Scheduler stopped")
    
    def add_job(self, func, trigger, **kwargs):
        self.scheduler.add_job(func, trigger, **kwargs)
        logger.info(f"Job added: {func.__name__}")

scheduler = TaskScheduler()