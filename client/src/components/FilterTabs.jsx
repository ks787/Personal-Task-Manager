const TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

/**
 * All / Active / Completed pill filter tabs.
 */
export default function FilterTabs({ filter, onFilterChange }) {
  return (
    <nav aria-label="Filter tasks" className="overflow-x-auto">
      <div className="flex gap-1 min-w-max" role="tablist">
        {TABS.map((tab) => {
          const isActive = filter === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
                ${isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
