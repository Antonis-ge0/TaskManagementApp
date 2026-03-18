from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend import models, schemas
from backend.database import get_db

router = APIRouter(prefix="/tasklists/{tasklist_id}/tasks", tags=["Tasks"])


def get_tasklist_or_404(tasklist_id: int, db: Session):
    tasklist = db.query(models.TaskList).filter(models.TaskList.id == tasklist_id).first()
    if not tasklist:
        raise HTTPException(status_code=404, detail="Task list not found")
    return tasklist


@router.get("", response_model=list[schemas.TaskResponse])
def list_tasks(tasklist_id: int, db: Session = Depends(get_db)):
    get_tasklist_or_404(tasklist_id, db)
    tasks = db.query(models.Task).filter(models.Task.tasklist_id == tasklist_id).all()
    return tasks


@router.post("", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(tasklist_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    get_tasklist_or_404(tasklist_id, db)

    new_task = models.Task(
        title=task.title.strip(),
        description=task.description.strip() if task.description else None,
        due_date=task.due_date,
        priority=task.priority,
        completed=False,
        tasklist_id=tasklist_id,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(tasklist_id: int, task_id: int, db: Session = Depends(get_db)):
    get_tasklist_or_404(tasklist_id, db)

    task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id, models.Task.tasklist_id == tasklist_id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(tasklist_id: int, task_id: int, updated_data: schemas.TaskUpdate, db: Session = Depends(get_db)):
    get_tasklist_or_404(tasklist_id, db)

    task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id, models.Task.tasklist_id == tasklist_id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = updated_data.title.strip()
    task.description = updated_data.description.strip() if updated_data.description else None
    task.due_date = updated_data.due_date
    task.priority = updated_data.priority
    task.completed = updated_data.completed

    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(tasklist_id: int, task_id: int, db: Session = Depends(get_db)):
    get_tasklist_or_404(tasklist_id, db)

    task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id, models.Task.tasklist_id == tasklist_id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return None