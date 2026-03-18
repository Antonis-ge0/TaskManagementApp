import { useState } from "react";

function TaskForm({
  onSubmit,
  onCancel,
  initialData = {
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
  },
  submitLabel = "Create Task",
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(initialData.due_date || "");
  const [priority, setPriority] = useState(initialData.priority || "Medium");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || null,
        priority,
      });
    } catch (err) {
      console.error(err);
      setError("Could not save task.");
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <label>
        Title *
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Task description"
        />
      </label>

      <label>
        Due Date
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      {error && <p className="error-text">{error}</p>}

      <div className="actions">
        <button type="submit" className="btn primary-btn">
          {submitLabel}
        </button>
        <button type="button" className="btn secondary-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;