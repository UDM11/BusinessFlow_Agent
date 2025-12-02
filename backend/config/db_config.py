import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True, future=True)
sessionmaker = sessionmaker(autocommit = False, autoflush=False, bind=engine)

def get_bd():
    db = sessionmaker()
    try:
        yield db
    finally:db.close()