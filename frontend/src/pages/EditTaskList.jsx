import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskListById, updateTaskList } from "../api";

// Page used to edit an existing task list.
function EditTaskList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Load the selected task list so the form can be prefilled.
  useEffect(() => {
    async function loadTaskList() {
      try {
        const data = await getTaskListById(id);
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (err) {
        setError("Could not load task list.");
        console.error(err);
      }
    }

    loadTaskList();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      await updateTaskList(id, {
        title: title.trim(),
        description: description.trim(),
      });
      navigate(`/tasklists/${id}`);
    } catch (err) {
      setError("Could not update task list.");
      console.error(err);
    }
  }

  return (
    <div className="page">
      <h1>Edit Task List</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Title *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <div className="actions">
          <button type="submit" className="btn primary-btn">
            Save Changes
          </button>
          <button
            type="button"
            className="btn secondary-btn"
            onClick={() => navigate(`/tasklists/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskList;