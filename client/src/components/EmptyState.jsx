/**
 * Context-aware empty state shown when no tasks match the current filter/search.
 */
export default function EmptyState({ filter, searchQuery }) {
  const message = searchQuery
    ? 'No tasks match your search.'
    : filter === 'active'
    ? "No active tasks — you're all caught up!"
    : filter === 'completed'
    ? 'No completed tasks yet — keep going!'
    : 'No tasks yet — add one above to get started!';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="status">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-slate-200 mb-5"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="48" height="48" rx="8" fill="currentColor" />
        <rect x="16" y="20" width="20" height="4" rx="2" fill="white" opacity="0.6" />
        <rect x="16" y="30" width="32" height="4" rx="2" fill="white" opacity="0.4" />
        <rect x="16" y="40" width="24" height="4" rx="2" fill="white" opacity="0.3" />
        <circle cx="48" cy="48" r="10" fill="#3b82f6" />
        <path d="M44 48l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <p className="text-base font-medium text-slate-500">{message}</p>

      {searchQuery && (
        <p className="mt-1 text-sm text-slate-400">
          Try a different search term or clear the search bar.
        </p>
      )}
    </div>
  );
}
