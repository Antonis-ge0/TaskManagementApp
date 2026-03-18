from os import getenv

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database import Base, engine
from backend import models
from backend.routers.tasklists import router as tasklists_router
from backend.routers.tasks import router as tasks_router

app = FastAPI()

allowed_origins = "http://localhost:5173"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(tasklists_router)
app.include_router(tasks_router)

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)