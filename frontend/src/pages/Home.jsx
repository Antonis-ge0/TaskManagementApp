import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaskLists } from "../api";
import TaskListCard from "../components/TaskListCard";

// Home page that loads and displays all task lists.
function Home() {
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load task lists from the backend when the page first renders.
  async function loadTaskLists() {
    try {
      const data = await getTaskLists();
      setTaskLists(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTaskLists();
  }, []);

  return (
    <div className="page">
      <h1>Task Management App</h1>

      <div className="actions">
        <Link to="/tasklists/new" className="btn primary-btn">
          Create New Task List
        </Link>
      </div>

      {loading ? (
        <p>Loading task lists...</p>
      ) : taskLists.length === 0 ? (
        <p>No task lists yet. Create your first one.</p>
      ) : (
        <div className="list-grid">
          {taskLists.map((taskList) => (
            <TaskListCard key={taskList.id} taskList={taskList} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;