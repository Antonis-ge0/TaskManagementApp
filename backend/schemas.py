from datetime import date
from typing import List, Optional

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: str = Field(..., pattern="^(High|Medium|Low)$")


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: str = Field(..., pattern="^(High|Medium|Low)$")
    completed: bool = False


class TaskResponse(TaskBase):
    id: int
    completed: bool
    tasklist_id: int

    model_config = {"from_attributes": True}


class TaskListBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None


class TaskListCreate(TaskListBase):
    pass


class TaskListUpdate(TaskListBase):
    pass


class TaskListResponse(TaskListBase):
    id: int
    tasks: List[TaskResponse] = []

    model_config = {"from_attributes": True}