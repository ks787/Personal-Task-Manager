import { useState } from 'react';

const EMPTY_FORM = { title: '', description: '', dueDate: '' };

/**
 * Shared form used for both adding a new task and editing an existing one.
 */
export default function TaskForm({ onSubmit, initialValues, onCancel, isLoading }) {
  const [values, setValues] = useState(initialValues || EMPTY_FORM);
  const [titleError, setTitleError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(initialValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name === 'title') setTitleError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!values.title.trim() || isSubmitting) {
      if (!values.title.trim()) setTitleError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        dueDate: values.dueDate || null,
      });
      if (!isEditMode) setValues(EMPTY_FORM);
    } catch {
      // Error toast handled inside the hook
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
      aria-label={isEditMode ? 'Edit task' : 'Add new task'}
    >
      {/* Title */}
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-slate-700 mb-1">
          Title <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          maxLength={100}
          required
          aria-required="true"
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? 'title-error' : undefined}
          className={`w-full rounded-lg border px-3 py-2 text-sm transition
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${titleError
              ? 'border-red-400 bg-red-50 text-red-900 placeholder-red-300'
              : 'border-slate-300 bg-white text-slate-800 placeholder-slate-400 hover:border-slate-400'
            }`}
        />
        {titleError && (
          <p id="title-error" role="alert" className="mt-1 text-xs text-red-600">
            {titleError}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-slate-700 mb-1">
          Description <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="task-description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Add more details…"
          maxLength={1000}
          rows={2}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
            text-slate-800 placeholder-slate-400 resize-none transition
            hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="task-due-date" className="block text-sm font-medium text-slate-700 mb-1">
          Due date <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={values.dueDate || ''}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
            text-slate-800 transition hover:border-slate-400
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white
            transition hover:bg-blue-700 active:bg-blue-800
            disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting || isLoading ? 'Saving…' : isEditMode ? 'Save changes' : 'Add task'}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium
              text-slate-600 transition hover:bg-slate-50 hover:border-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
