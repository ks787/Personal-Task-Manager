# Personal Task Manager

## Project Title & Brief Description
**Personal Task Manager**
This project is a full-stack personal task manager application chosen to demonstrate proficiency in building modern web applications. It allows users to create, read, update, delete, and reorder tasks. The application features a clean, responsive user interface with drag-and-drop capabilities for task prioritization, and relies on a lightweight Node.js/Express backend that persists data securely to a local JSON file. 

## Live Demo Links
- **Frontend (Vercel):** [https://client-xi-bice.vercel.app/](https://client-xi-bice.vercel.app/)
- **Backend API (Render):** [https://personal-task-manager-api-q11f.onrender.com](https://personal-task-manager-api-q11f.onrender.com)

## Tech Stack
- **Frontend:** 
  - **React:** Used for building a dynamic, component-driven user interface.
  - **Vite:** Chosen as the build tool for its incredibly fast hot module replacement (HMR) and optimized production builds.
  - **Tailwind CSS:** Utilized for rapid, utility-first styling to create a responsive and modern design without writing custom CSS files.
  - **@dnd-kit:** Implemented for accessible and smooth drag-and-drop functionality to reorder tasks.
- **Backend:**
  - **Node.js & Express:** Selected for the server environment due to its lightweight, non-blocking architecture and seamless JavaScript integration with the frontend.
  - **Cors:** Used to securely handle cross-origin requests between the Vercel frontend and Render backend.
  - **Jest & Supertest:** Utilized for robust automated API testing.
- **Storage:** Local flat JSON file (`tasks.json`) was chosen over a full database to keep the backend lightweight and extremely fast for a personal-scale application.

## How to Run Locally
*Ensure you have Node.js installed before proceeding.*

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Project-
   ```

2. **Start the Backend Server:**
   ```bash
   cd server
   npm install
   npm start
   ```
   *(The server will run on `http://localhost:3001`)*

3. **Start the Frontend Development Server:**
   Open a **new terminal window/tab**, and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *(The frontend will be available at `http://localhost:5173`)*

## API Documentation
Base URL (Local): `http://localhost:3001/api`

| Method | Path | Description | Request Body | Response Shape |
|--------|------|-------------|--------------|----------------|
| **GET** | `/tasks` | List all tasks | None | `{ tasks: [{ id, title, description, dueDate, completed, createdAt, updatedAt }] }` |
| **POST** | `/tasks` | Create a new task | `{ title: string, description?: string, dueDate?: string }` | `{ task: { ...TaskObject } }` |
| **PUT** | `/tasks/:id` | Update an existing task | `{ title: string, description: string, dueDate: string }` | `{ task: { ...TaskObject } }` |
| **PATCH** | `/tasks/:id/toggle` | Toggle task completion | None | `{ task: { ...TaskObject } }` |
| **PATCH** | `/tasks/reorder` | Reorder task list | `{ taskIds: string[] }` | `{ tasks: [{ ...TaskObject }] }` |
| **DELETE**| `/tasks/:id` | Delete a task | None | `{ message: "Task deleted", task: { ...DeletedTaskObject } }` |

## Project Structure
```text
Project-/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/            # API fetch wrappers (tasks.js)
│   │   ├── components/     # Reusable UI components (TaskForm, TaskList, etc.)
│   │   ├── hooks/          # Custom React hooks (useTasks.js)
│   │   ├── utils/          # Helper functions (dateUtils.js)
│   │   ├── App.jsx         # Main application layout
│   │   └── main.jsx        # React DOM entry point
│   ├── index.html          # Vite HTML entry
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js/Express Application
│   ├── __tests__/          # Automated API tests (Jest)
│   ├── data/               # Persistent JSON storage
│   │   └── tasks.json      # The flat-file database
│   ├── middleware/         # Express middlewares (error handlers, validation)
│   ├── routes/             # API route definitions (tasks.js)
│   ├── services/           # Core business logic (taskService.js)
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
├── .gitignore              # Git ignore rules for node_modules and .env
└── README.md               # Project documentation
```

## Next Steps
**What was deliberately left out:**
- A robust relational database (like PostgreSQL or MongoDB) was skipped in favor of a JSON file to drastically reduce setup complexity and focus purely on core CRUD mechanics.
- User authentication and multi-user tenancy were omitted to keep the scope strictly focused on a *personal* task manager.

**What I would build next:**
- **Database Migration:** Swap out the `tasks.json` file for MongoDB/Mongoose to support infinite horizontal scaling and concurrent writing safely.
- **Authentication:** Integrate NextAuth or Firebase to allow multiple users to securely manage their own separate task lists.
- **Push Notifications:** Add web push notifications or email reminders via SendGrid for tasks that are approaching their due dates.
- **Categories & Tags:** Allow users to group tasks into different projects or tag them with custom labels for better organization.
