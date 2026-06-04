# Personal Task Manager

## Project Overview
A full-stack personal task manager built with a React + Vite frontend and an Express REST API backend. It uses a flat JSON file for data persistence.

## Live Links
- **Live Frontend URL:** [https://personal-task-manager-ecru-phi.vercel.app](https://personal-task-manager-ecru-phi.vercel.app)
- **Live Backend URL:** [https://personal-task-manager-api-r2b6.onrender.com](https://personal-task-manager-api-r2b6.onrender.com)

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Project-
   ```

2. **Frontend Setup:**
   ```bash
   cd client
   npm install
   cp .env.example .env # Set your local environment variables
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd server
   npm install
   cp .env.example .env # Set your local environment variables
   npm start
   ```

## Environment Variables

### Client (`client/.env`)
- `VITE_API_URL`: The URL of your backend API. For local development, this defaults to `http://localhost:3001/api`. For production, it must include `/api` at the end (e.g., `https://your-backend.onrender.com/api`).

### Server (`server/.env`)
- `PORT`: Port to run the server on (defaults to 3001).
- `CORS_ORIGIN`: Allowed origin for CORS (e.g., `https://your-frontend.vercel.app`).
- `TASKS_FILE`: Custom path for tasks JSON file (optional).

## Deployment Instructions

### Frontend Deployment (Vercel)
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Connect your GitHub repository and select it.
3. Set the **Framework Preset** to `Vite` (it usually auto-detects this).
4. Set the **Root Directory** to `client`.
5. Configure the Build and Output Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Expand **Environment Variables** and add:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api` (Replace with your actual backend URL)
7. Click **Deploy**.

### Backend Deployment (Render)
1. Log in to [Render](https://render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository and select it.
3. Set the **Root Directory** to `server`.
4. Configure the following settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Expand **Advanced** and add your Environment Variables:
   - `PORT`: (Render sets this automatically, but you can set it if you prefer)
   - `NODE_ENV`: `production`
6. Click **Create Web Service**.

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
