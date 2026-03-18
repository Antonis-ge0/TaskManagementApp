import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API,
});

export async function getTaskLists() {
  const res = await fetch(`${API}/tasklists`);
  return res.json();
}

export async function getTaskListById(id) {
  const res = await fetch(`${API}/tasklists/${id}`);
  if (!res.ok) throw new Error("Task list not found");
  return res.json();
}

export async function createTaskList(data) {
  const res = await fetch(`${API}/tasklists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create task list");
  return res.json();
}

export async function updateTaskList(id, data) {
  const res = await fetch(`${API}/tasklists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update task list");
  return res.json();
}

export async function deleteTaskList(id) {
  const res = await fetch(`${API}/tasklists/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task list");
}

export async function getTasks(tasklistId) {
  const res = await fetch(`${API}/tasklists/${tasklistId}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function getTask(tasklistId, taskId) {
  const res = await fetch(`${API}/tasklists/${tasklistId}/tasks/${taskId}`);
  if (!res.ok) throw new Error("Task not found");
  return res.json();
}

export async function createTask(tasklistId, data) {
  const res = await fetch(`${API}/tasklists/${tasklistId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(tasklistId, taskId, data) {
  const res = await fetch(`${API}/tasklists/${tasklistId}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(tasklistId, taskId) {
  const res = await fetch(`${API}/tasklists/${tasklistId}/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task");
}