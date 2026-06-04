import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskStats from './components/TaskStats';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const {
    loading,
    error,
    filter,
    searchQuery,
    editingTask,
    confirmDelete,
    toast,
    deletingTaskId,
    filteredTasks,
    activeCount,
    completedCount,
    isOverdue,
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

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            {isAdding ? 'Cancel' : 'Add Task'}
          </button>
        </header>

        <TaskStats activeCount={activeCount} completedCount={completedCount} />

        {isAdding && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <TaskForm 
              initialValues={{ title: '', description: '', dueDate: '' }}
              onSubmit={async (payload) => {
                await addTask(payload);
                setIsAdding(false);
              }}
              onCancel={() => setIsAdding(false)}
              isLoading={loading}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 font-medium">
            {error}
          </div>
        )}

        <main>
          <TaskList
            tasks={filteredTasks}
            editingTask={editingTask}
            isOverdue={isOverdue}
            deletingTaskId={deletingTaskId}
            filter={filter}
            searchQuery={searchQuery}
            isLoading={loading}
            onToggle={toggleTask}
            onEdit={setEditingTask}
            onDelete={setConfirmDelete}
            onSaveEdit={saveEdit}
            onCancelEdit={() => setEditingTask(null)}
            onReorder={reorderTasks}
          />
        </main>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          task={confirmDelete}
          onConfirm={confirmDeleteTask}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white font-medium flex items-center gap-3 transition-opacity duration-300 ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="opacity-75 hover:opacity-100 text-xl leading-none">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
