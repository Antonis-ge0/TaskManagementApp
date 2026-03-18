import { useNavigate, useParams } from "react-router-dom";
import { createTask } from "../api";
import TaskForm from "../components/TaskForm";

// Page used to create a new task inside a task list.
function AddTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Send the new task to the backend, then return to the task list page.
  async function handleCreate(taskData) {
    await createTask(id, taskData);
    navigate(`/tasklists/${id}`);
  }

  // Return to the task list without creating anything.
  function handleCancel() {
    navigate(`/tasklists/${id}`);
  }

  return (
    <div className="page">
      <h1>Add Task</h1>
      <TaskForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}

export default AddTask;