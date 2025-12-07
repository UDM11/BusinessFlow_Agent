from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from app.utils.logger import logger


class JobScheduler:
    """Background job scheduler for recurring tasks"""
    
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.jobs = {}
    
    def start(self):
        """Start the scheduler"""
        if not self.scheduler.running:
            self.scheduler.start()
            logger.info("Job scheduler started")
    
    def shutdown(self):
        """Shutdown the scheduler"""
        if self.scheduler.running:
            self.scheduler.shutdown()
            logger.info("Job scheduler stopped")
    
    def add_job(self, func, trigger, job_id: str, **kwargs):
        """
        Add a job to the scheduler
        
        Args:
            func: Function to execute
            trigger: Trigger type (cron, interval, date)
            job_id: Unique job identifier
            **kwargs: Additional trigger parameters
        """
        try:
            job = self.scheduler.add_job(func, trigger, id=job_id, **kwargs)
            self.jobs[job_id] = job
            logger.info(f"Job added: {job_id}")
            return job
        except Exception as e:
            logger.error(f"Failed to add job {job_id}: {str(e)}")
            raise
    
    def add_cron_job(self, func, job_id: str, hour: int = 0, minute: int = 0, **kwargs):
        """Add a cron-based job"""
        trigger = CronTrigger(hour=hour, minute=minute, **kwargs)
        return self.add_job(func, trigger, job_id)
    
    def add_interval_job(self, func, job_id: str, seconds: int = 0, minutes: int = 0, hours: int = 0):
        """Add an interval-based job"""
        return self.add_job(
            func, 
            'interval', 
            job_id,
            seconds=seconds,
            minutes=minutes,
            hours=hours
        )
    
    def remove_job(self, job_id: str):
        """Remove a job from scheduler"""
        try:
            self.scheduler.remove_job(job_id)
            self.jobs.pop(job_id, None)
            logger.info(f"Job removed: {job_id}")
        except Exception as e:
            logger.error(f"Failed to remove job {job_id}: {str(e)}")
    
    def get_jobs(self):
        """Get all scheduled jobs"""
        return self.scheduler.get_jobs()
    
    def pause_job(self, job_id: str):
        """Pause a job"""
        self.scheduler.pause_job(job_id)
        logger.info(f"Job paused: {job_id}")
    
    def resume_job(self, job_id: str):
        """Resume a paused job"""
        self.scheduler.resume_job(job_id)
        logger.info(f"Job resumed: {job_id}")


# Global scheduler instance
scheduler = JobScheduler()
