import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTaskList from "./pages/CreateTaskList";
import TaskListPage from "./pages/TaskListPage";
import EditTaskList from "./pages/EditTaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasklists/new" element={<CreateTaskList />} />
        <Route path="/tasklists/:id" element={<TaskListPage />} />
        <Route path="/tasklists/:id/edit" element={<EditTaskList />} />
        <Route path="/tasklists/:id/tasks/new" element={<AddTask />} />
        <Route path="/tasklists/:id/tasks/:taskId/edit" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;