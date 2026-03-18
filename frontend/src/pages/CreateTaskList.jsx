import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTaskList } from "../api";

function CreateTaskList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      await createTaskList({
        title: title.trim(),
        description: description.trim(),
      });
      navigate("/");
    } catch (err) {
      setError("Could not create task list.");
      console.error(err);
    }
  }

  return (
    <div className="page">
      <h1>Create Task List</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Title *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task list title"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="4"
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <div className="actions">
          <button type="submit" className="btn primary-btn">
            Create Task List
          </button>
          <button
            type="button"
            className="btn secondary-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskList;