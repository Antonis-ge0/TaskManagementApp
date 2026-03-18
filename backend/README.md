# Task Management App

A modern full-stack task management app for organizing task lists and tracking tasks with ease.

Built with:

- **Frontend:** React + Vite
- **Backend:** FastAPI
- **Database:** SQLite
- **Containerization:** Docker + Docker Compose

## About

Task Management App is a simple full-stack productivity tool designed to help users organize work into task lists, add and manage tasks, and keep track of progress. It includes a clean React interface, a FastAPI backend, and persistent SQLite storage for a lightweight but practical workflow.

## Features

- Create, edit, and delete task lists
- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Persistent SQLite storage
- Local development support
- Docker-based setup for easy deployment

## Screenshots

> Add your screenshots here to showcase the app.

### Home Page
![Home Page](./screenshots/home.png)

### Task List Page
![Task List Page](./screenshots/tasklist.png)

### Create / Edit Task
![Task Form](./screenshots/task-form.png)

> If you don’t have screenshots yet, you can safely leave this section in place and add the image files later.

## Getting Started

You can run this project in one of two ways:

- **Locally** for development
- **With Docker** for a containerized setup

---

## Run Locally

### Prerequisites

Make sure you have the following installed:

- Python 3.14+
- Node.js 20+
- npm

### 1) Start the backend

Open a terminal in the `backend` folder:

bash python -m venv .venv

Activate the virtual environment:

#### Windows
bash .venv\Scripts\activate

#### macOS / Linux
bash source .venv/bin/activate

Install dependencies:
bash pip install -r requirements.txt

Start the backend server:
bash uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

The backend will be available at:

- API: `http://localhost:8000`
- API docs: `http://localhost:8000/docs`

---
### 2) Start the frontend

Open a second terminal in the `frontend` folder:

bash npm install npm run dev

The frontend will be available at:

- `http://localhost:5173`

---

## Run with Docker

This project includes Docker support for both the frontend and backend.

### 1) Start the app

From the project root, run:
bash docker compose up --build

This will:

- build the backend container
- build the frontend container
- start both services
- store the SQLite database in a persistent Docker volume

---

### 2) Open the app

After the containers are running:

- Frontend: `http://localhost:5173`
- Backend docs: `http://localhost:8000/docs`

---

### 3) Stop the app

To stop the containers:
bash docker compose down

This stops the app while keeping your database data safe.

> Avoid `docker compose down -v` unless you want to delete the database volume too.

---

## Database Persistence

When running with Docker, the SQLite database is stored in a named Docker volume.

That means your data survives:

- container restarts
- image rebuilds
- stopping and starting the app again

---

## Useful Commands

### Backend

bash uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

### Frontend
bash npm run dev

### Docker
bash docker compose up --build docker compose down docker compose logs -f

---

## Troubleshooting

### Backend won't start
Check that:

- your virtual environment is activated
- dependencies are installed
- you're running the backend from the correct folder
- the database directory exists and is writable

### Frontend can't reach the backend
Check that:

- the backend is running
- the frontend API URL is correct
- Docker Compose started both services successfully

### Database errors after changing models
If you change your SQLAlchemy models, the SQLite schema may need to be updated too. During development, you may need to recreate the database or add a migration step.

---
