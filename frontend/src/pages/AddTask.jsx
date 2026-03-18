import { useNavigate, useParams } from "react-router-dom";
import { createTask } from "../api";
import TaskForm from "../components/TaskForm";

function AddTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleCreate(taskData) {
    await createTask(id, taskData);
    navigate(`/tasklists/${id}`);
  }

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