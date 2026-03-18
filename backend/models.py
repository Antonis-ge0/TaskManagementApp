from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from backend.database import Base

# Represents a task list in the database.
class TaskList(Base):
    __tablename__ = "tasklists"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # Define the one-to-many relationship to tasks.
    tasks = relationship("Task", back_populates="tasklist", cascade="all, delete")


# Represents a single task belonging to a task list.
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(Date, nullable=True)
    priority = Column(String, nullable=False)  # High, Medium, Low
    completed = Column(Boolean, default=False)

    # Foreign key linking this task to its parent task list.
    tasklist_id = Column(Integer, ForeignKey("tasklists.id"), nullable=False)

    # Define the many-to-one relationship back to the task list.
    tasklist = relationship("TaskList", back_populates="tasks")