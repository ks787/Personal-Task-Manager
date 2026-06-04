import { formatDate } from '../utils/dateUtils';

/**
 * Renders a single task row.
 */
export default function TaskItem({
  task,
  overdue,
  isDeleting,
  onToggle,
  onEdit,
  onDelete,
  dragListeners,
  dragAttributes,
  isDragDisabled,
}) {
  return (
    <article
      className={`group bg-white rounded-xl border shadow-sm p-4
        flex items-start gap-3 transition-all duration-300 hover:shadow-md
        ${isDeleting ? 'task-fade-out' : 'task-slide-in'}
        ${overdue
          ? 'border-l-4 border-l-red-400 border-t-slate-200 border-r-slate-200 border-b-slate-200'
          : 'border-slate-200'}
        ${task.completed ? 'opacity-70' : ''}`}
      aria-label={`Task: ${task.title}${overdue ? ', overdue' : ''}${task.completed ? ', completed' : ''}${isDeleting ? ', deleting' : ''}`}
    >
      {/* Drag handle */}
      {!isDragDisabled && dragListeners && dragAttributes && (
        <div
          className="pt-0.5 flex-shrink-0 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors touch-none"
          {...dragAttributes}
          {...dragListeners}
          aria-label="Drag to reorder"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </div>
      )}

      {/* Checkbox */}
      <div className="pt-0.5 flex-shrink-0">
        <input
          id={`toggle-${task.id}`}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start flex-wrap gap-2">
          <span className={`text-sm font-medium break-words
            ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {task.title}
          </span>

          {overdue && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
              Overdue
            </span>
          )}

          {task.completed && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              Done
            </span>
          )}
        </div>

        {task.description && (
          <p className="mt-1 text-xs text-slate-500 break-words leading-relaxed">
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <p className={`mt-1 text-xs font-medium ${overdue ? 'text-red-600' : 'text-slate-400'}`}>
            Due {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          aria-label={`Edit "${task.title}"`}
          className="rounded-lg p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50
            transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        <button
          onClick={() => onDelete(task)}
          aria-label={`Delete "${task.title}"`}
          className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50
            transition focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </article>
  );
}
