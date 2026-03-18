from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class TaskList(Base):
    __tablename__ = "tasklists"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    tasks = relationship("Task", back_populates="tasklist", cascade="all, delete")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(Date, nullable=True)
    priority = Column(String, nullable=False)  # High, Medium, Low
    completed = Column(Boolean, default=False)

    tasklist_id = Column(Integer, ForeignKey("tasklists.id"), nullable=False)

    tasklist = relationship("TaskList", back_populates="tasks")