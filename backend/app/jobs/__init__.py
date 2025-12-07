from .scheduler import JobScheduler, scheduler
from .daily_summary_job import DailySummaryJob, daily_summary_job

__all__ = [
    "JobScheduler",
    "scheduler",
    "DailySummaryJob",
    "daily_summary_job",
    "setup_jobs"
]


def setup_jobs():
    """Setup and register all background jobs"""
    from app.utils.logger import logger
    
    try:
        # Start scheduler
        scheduler.start()
        
        # Register daily summary job (runs at 9 AM every day)
        scheduler.add_cron_job(
            func=daily_summary_job.run,
            job_id="daily_summary",
            hour=9,
            minute=0
        )
        
        logger.info("All background jobs registered successfully")
        
    except Exception as e:
        logger.error(f"Failed to setup jobs: {str(e)}")
        raise


def shutdown_jobs():
    """Shutdown all background jobs"""
    scheduler.shutdown()
