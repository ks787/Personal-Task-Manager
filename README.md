# Personal Task Manager

## Project Overview
A full-stack personal task manager built with a React + Vite frontend and an Express REST API backend. It uses a flat JSON file for data persistence.

## Installation
1. Clone the repository.
2. Run `npm install` in both `/client` and `/server` directories.

## Environment Variables
Client:
- `VITE_API_URL`: URL of the backend API

Server:
- `PORT`: Port to run the server on
- `CORS_ORIGIN`: Allowed origin for CORS
- `TASKS_FILE`: Custom path for tasks JSON file (optional)

## Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Backend Setup
```bash
cd server
npm install
npm start
```

## API Documentation
- `GET /api/tasks`: List tasks
- `POST /api/tasks`: Create task
- `PUT /api/tasks/:id`: Update task
- `PATCH /api/tasks/:id/toggle`: Toggle completion
- `PATCH /api/tasks/reorder`: Reorder tasks
- `DELETE /api/tasks/:id`: Delete task

## Testing Instructions
```bash
cd server
npm test
```

## Deployment Guide
- Frontend: Deploy the `client` directory to Vercel and set `VITE_API_URL` to the backend URL.
- Backend: Deploy the `server` directory to Render and set `CORS_ORIGIN` to the Vercel URL.
