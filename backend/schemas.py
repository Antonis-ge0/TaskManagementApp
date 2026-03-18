from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field

# Shared fields for task creation and display.
class TaskBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: str = Field(..., pattern="^(High|Medium|Low)$")


# Schema used when creating a new task.
class TaskCreate(TaskBase):
    pass


# Schema used when updating an existing task.
class TaskUpdate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: Optional[date] = None
    priority: str = Field(..., pattern="^(High|Medium|Low)$")
    completed: bool = False


# Schema returned by the API for task data.
class TaskResponse(TaskBase):
    id: int
    completed: bool
    tasklist_id: int

    # Allow Pydantic to read values from SQLAlchemy model objects.
    model_config = {"from_attributes": True}


# Shared fields for task list creation and display.
class TaskListBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None


# Schema used when creating a new task list.
class TaskListCreate(TaskListBase):
    pass


# Schema used when updating an existing task list.
class TaskListUpdate(TaskListBase):
    pass


# Schema returned by the API for task list data, including nested tasks.
class TaskListResponse(TaskListBase):
    id: int
    tasks: List[TaskResponse] = []

    # Allow Pydantic to read values from SQLAlchemy model objects.
    model_config = {"from_attributes": True}