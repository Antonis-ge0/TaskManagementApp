from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from backend import models, schemas
from backend.database import get_db

router = APIRouter(prefix="/tasklists", tags=["Task Lists"])


@router.get("", response_model=list[schemas.TaskListResponse])
def list_tasklists(db: Session = Depends(get_db)):
    tasklists = (
        db.query(models.TaskList)
        .options(joinedload(models.TaskList.tasks))
        .all()
    )
    return tasklists


@router.post("", response_model=schemas.TaskListResponse, status_code=status.HTTP_201_CREATED)
def create_tasklist(tasklist: schemas.TaskListCreate, db: Session = Depends(get_db)):
    new_tasklist = models.TaskList(
        title=tasklist.title.strip(),
        description=tasklist.description.strip() if tasklist.description else None,
    )
    db.add(new_tasklist)
    db.commit()
    db.refresh(new_tasklist)
    return new_tasklist


@router.get("/{tasklist_id}", response_model=schemas.TaskListResponse)
def get_tasklist(tasklist_id: int, db: Session = Depends(get_db)):
    tasklist = (
        db.query(models.TaskList)
        .options(joinedload(models.TaskList.tasks))
        .filter(models.TaskList.id == tasklist_id)
        .first()
    )
    if not tasklist:
        raise HTTPException(status_code=404, detail="Task list not found")
    return tasklist


@router.put("/{tasklist_id}", response_model=schemas.TaskListResponse)
def update_tasklist(tasklist_id: int, updated_data: schemas.TaskListUpdate, db: Session = Depends(get_db)):
    tasklist = db.query(models.TaskList).filter(models.TaskList.id == tasklist_id).first()
    if not tasklist:
        raise HTTPException(status_code=404, detail="Task list not found")

    tasklist.title = updated_data.title.strip()
    tasklist.description = updated_data.description.strip() if updated_data.description else None

    db.commit()
    db.refresh(tasklist)
    return tasklist


@router.delete("/{tasklist_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tasklist(tasklist_id: int, db: Session = Depends(get_db)):
    tasklist = db.query(models.TaskList).filter(models.TaskList.id == tasklist_id).first()
    if not tasklist:
        raise HTTPException(status_code=404, detail="Task list not found")

    db.delete(tasklist)
    db.commit()
    return None