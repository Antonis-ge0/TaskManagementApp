import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, updateTask } from "../api";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await getTask(id, taskId);
        setTask(data);
      } catch (err) {
        console.error(err);
        setError("Could not load task.");
      }
    }

    loadTask();
  }, [id, taskId]);

  async function handleUpdate(taskData) {
    await updateTask(id, taskId, {
      ...taskData,
      completed: task.completed,
    });
    navigate(`/tasklists/${id}`);
  }

  function handleCancel() {
    navigate(`/tasklists/${id}`);
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-text">{error}</p>
        <button className="btn secondary-btn" onClick={() => navigate(`/tasklists/${id}`)}>
          Back
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="page">
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Edit Task</h1>
      <TaskForm
        initialData={{
          title: task.title,
          description: task.description || "",
          due_date: task.due_date || "",
          priority: task.priority,
        }}
        submitLabel="Save Changes"
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditTask;