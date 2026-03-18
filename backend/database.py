from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Store the SQLite database in a persistent Docker-mounted directory.
DB_DIR = Path("/app/data")
DB_DIR.mkdir(parents=True, exist_ok=True)

# Build the SQLite connection string using the persistent database file.
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_DIR / 'tasks.db'}"

# Create the SQLAlchemy engine connected to the SQLite database.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

# Factory for database sessions used by request handlers.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all SQLAlchemy models.
Base = declarative_base()

# Dependency that provides a database session and ensures it is closed afterward.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()