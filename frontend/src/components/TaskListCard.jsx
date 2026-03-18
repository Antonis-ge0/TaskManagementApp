import { Link } from "react-router-dom";

function TaskListCard({ taskList }) {
  return (
    <Link to={`/tasklists/${taskList.id}`} className="card link-card">
      <h3>{taskList.title}</h3>
      <p>{taskList.description || "No description"}</p>
      <small>{taskList.tasks?.length || 0} task(s)</small>
    </Link>
  );
}

export default TaskListCard;