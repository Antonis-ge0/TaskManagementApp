import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import Base, engine
from backend.routers.tasklists import router as tasklists_router
from backend.routers.tasks import router as tasks_router

# Create the FastAPI application instance.
app = FastAPI()

# Allow the frontend dev server to talk to the backend through CORS.
allowed_origins = "http://localhost:5173"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables from SQLAlchemy models if they don't already exist.
Base.metadata.create_all(bind=engine)

# Register route groups for task lists and tasks.
app.include_router(tasklists_router)
app.include_router(tasks_router)

# Run the app directly when this file is executed as a script.
if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)