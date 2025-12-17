from app.database.connection import SessionLocal, create_tables
from app.database.models import User

def init_database():
    create_tables()
    
    db = SessionLocal()
    try:
        # Check if admin user exists
        admin_user = db.query(User).filter(User.email == "admin@businessflow.com").first()
        
        if not admin_user:
            # Create default admin user
            admin_user = User(
                email="admin@businessflow.com",
                name="Admin User",
                hashed_password=User.hash_password("admin123"),
                role="admin"
            )
            db.add(admin_user)
            db.commit()
            print("Default admin user created: admin@businessflow.com / admin123")
        
    finally:
        db.close()

if __name__ == "__main__":
    init_database()