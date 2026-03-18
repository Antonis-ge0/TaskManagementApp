function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className={`card task-card ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description || "No description"}</p>
      <p>
        <strong>Due Date:</strong> {task.due_date || "No due date"}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
      </p>

      <div className="actions">
        <button className="btn primary-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="btn danger-btn" onClick={onDelete}>
          Delete
        </button>
        <button className="btn success-btn" onClick={onToggleComplete}>
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;