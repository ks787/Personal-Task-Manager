const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Central fetch wrapper — all API functions call this.
 * Throws an Error with the server's error message on non-2xx responses.
 */
async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

/** Returns { tasks: Task[] } */
export function fetchTasks() {
  return apiFetch('/tasks');
}

/** Returns { task: Task } */
export function createTask(payload) {
  return apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** Returns { task: Task } */
export function updateTask(id, payload) {
  return apiFetch(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

/** Returns { task: Task } */
export function toggleTask(id) {
  return apiFetch(`/tasks/${id}/toggle`, { method: 'PATCH' });
}

/** Returns { message: string } */
export function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, { method: 'DELETE' });
}

/** Returns { tasks: Task[] } */
export function reorderTasks(taskIds) {
  return apiFetch('/tasks/reorder', {
    method: 'PATCH',
    body: JSON.stringify({ taskIds }),
  });
}
