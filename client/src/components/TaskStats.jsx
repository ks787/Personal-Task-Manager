/**
 * Displays active and completed task counts in the header.
 */
export default function TaskStats({ activeCount, completedCount }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
        <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
        {activeCount} active
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">
        <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
        {completedCount} done
      </span>
    </div>
  );
}
