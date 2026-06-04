const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Default data file — can be overridden by tests via TASKS_FILE env var
const DATA_FILE = process.env.TASKS_FILE || path.join(__dirname, '../data/tasks.json');

/**
 * Reads and parses tasks.json.
 * Returns an empty array if the file is missing or contains invalid JSON.
 */
function readTasks() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Serialises and writes the tasks array back to disk.
 */
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

/**
 * Returns all tasks (newest first by array order).
 */
function getAllTasks() {
  return readTasks();
}

/**
 * Creates a new task, persists it, and returns the saved task.
 */
function createTask({ title, description = '', dueDate = null }) {
  const tasks = readTasks();

  const task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.unshift(task);
  writeTasks(tasks);
  return task;
}

/**
 * Updates an existing task's mutable fields and returns the updated task.
 * Returns null if no task with the given id exists.
 */
function updateTask(id, { title, description, dueDate }) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  const updated = {
    ...tasks[index],
    title: title !== undefined ? title.trim() : tasks[index].title,
    description: description !== undefined ? description.trim() : tasks[index].description,
    dueDate: dueDate !== undefined ? dueDate || null : tasks[index].dueDate,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updated;
  writeTasks(tasks);
  return updated;
}

/**
 * Flips a task's completed boolean and returns the updated task.
 * Returns null if the task does not exist.
 */
function toggleTask(id) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    completed: !tasks[index].completed,
    updatedAt: new Date().toISOString(),
  };

  writeTasks(tasks);
  return tasks[index];
}

/**
 * Removes a task and returns the deleted task.
 * Returns null if the task does not exist.
 */
function deleteTask(id) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);
  return deleted;
}

/**
 * Reorders tasks based on an array of IDs and writes to disk.
 * Preserves tasks not included in the array at the end.
 */
function reorderTasks(orderedIds) {
  const tasks = readTasks();
  const taskMap = new Map(tasks.map((t) => [t.id, t]));
  const newTasks = orderedIds.map((id) => taskMap.get(id)).filter(Boolean);

  const orderedSet = new Set(orderedIds);
  const remaining = tasks.filter((t) => !orderedSet.has(t.id));

  const finalTasks = [...newTasks, ...remaining];
  writeTasks(finalTasks);
  return finalTasks;
}

module.exports = {
  readTasks,
  writeTasks,
  getAllTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  reorderTasks,
};
// Improved filesystem safety
