import { useEffect, useCallback } from 'react';

/**
 * Accessible delete confirmation modal.
 * Keyboard: Escape → cancel, Enter → confirm.
 */
export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter') {
        if (document.activeElement?.textContent?.toLowerCase() === 'cancel') {
          onCancel();
        } else {
          e.preventDefault();
          onConfirm();
        }
      }
    },
    [onCancel, onConfirm]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onCancel}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="text-center">
          <h2 id="confirm-dialog-title" className="text-base font-semibold text-slate-800">
            Delete task?
          </h2>
          <p id="confirm-dialog-desc" className="mt-1 text-sm text-slate-500">
            Are you sure you want to delete{' '}
            <span className="font-medium text-slate-700">"{task.title}"</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 justify-center pt-1">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium
              text-slate-700 transition hover:bg-slate-50 hover:border-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            autoFocus
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white
              transition hover:bg-red-700 active:bg-red-800
              focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
