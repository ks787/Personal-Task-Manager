import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import TaskStats from './components/TaskStats';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

/**
 * Root layout — wires the useTasks hook to all child components.
 * No data fetching happens here; App is purely structural.
 */
export default function App() {
  const {
    loading,
    error,
    filter,
    searchQuery,
    editingTask,
    confirmDelete,
    toast,
    filteredTasks,
    activeCount,
    completedCount,
    isOverdue,
    deletingTaskId,
    addTask,
    saveEdit,
    toggleTask,
    reorderTasks,
    setEditingTask,
    setConfirmDelete,
    confirmDeleteTask,
    setFilter,
    setSearchQuery,
    setToast,
  } = useTasks();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" role="status" aria-label="Loading tasks">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-slate-500 text-sm font-medium">Loading your tasks…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Personal Task Manager
            </h1>
          </div>
          <TaskStats activeCount={activeCount} completedCount={completedCount} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Add task form */}
        <TaskForm onSubmit={addTask} isLoading={false} />

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          editingTask={editingTask}
          isOverdue={isOverdue}
          deletingTaskId={deletingTaskId}
          filter={filter}
          searchQuery={searchQuery}
          isLoading={false}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={setConfirmDelete}
          onSaveEdit={saveEdit}
          onCancelEdit={() => setEditingTask(null)}
          onReorder={reorderTasks}
        />
      </main>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <ConfirmDialog
          task={confirmDelete}
          onConfirm={confirmDeleteTask}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
