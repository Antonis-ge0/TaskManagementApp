import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTask,
  deleteTaskList,
  getTaskListById,
  updateTask,
} from "../api";
import TaskCard from "../components/TaskCard";

function TaskListPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadTaskList() {
    try {
      const data = await getTaskListById(id);
      setTaskList(data);
    } catch (error) {
      console.error(error);
      setTaskList(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTaskList();
  }, [id]);

  async function handleDeleteTaskList() {
    const confirmed = window.confirm("Are you sure you want to delete this task list?");
    if (!confirmed) return;

    try {
      await deleteTaskList(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTask(taskId) {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    try {
      await deleteTask(id, taskId);
      loadTaskList();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleCompleted(task) {
    try {
      await updateTask(id, task.id, {
        title: task.title,
        description: task.description || "",
        due_date: task.due_date,
        priority: task.priority,
        completed: !task.completed,
      });
      loadTaskList();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditTask(taskId) {
    navigate(`/tasklists/${id}/tasks/${taskId}/edit`);
  }

  if (loading) {
    return (
      <div className="page">
        <p>Loading task list...</p>
      </div>
    );
  }

  if (!taskList) {
    return (
      <div className="page">
        <p>Task list not found.</p>
        <button className="btn secondary-btn" onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{taskList.title}</h1>
      <p>{taskList.description || "No description provided."}</p>

      <div className="actions">
        <Link to={`/tasklists/${id}/edit`} className="btn primary-btn">
          Edit Task List
        </Link>

        <button className="btn danger-btn" onClick={handleDeleteTaskList}>
          Delete Task List
        </button>

        <button className="btn secondary-btn" onClick={() => navigate("/")}>
          Back
        </button>

        <Link to={`/tasklists/${id}/tasks/new`} className="btn success-btn">
          Add Task
        </Link>
      </div>

      <h2>Tasks</h2>

      {taskList.tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="list-grid">
          {taskList.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleComplete={() => handleToggleCompleted(task)}
              onEdit={() => handleEditTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskListPage;