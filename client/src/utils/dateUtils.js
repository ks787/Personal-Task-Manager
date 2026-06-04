/**
 * Formats a YYYY-MM-DD date string into a human-readable date.
 * e.g. "2026-06-15" → "Jun 15, 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Returns true if a task has a dueDate in the past and is not completed.
 */
export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate + 'T00:00:00');
  return due < today;
}
