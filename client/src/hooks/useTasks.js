import { useState, useEffect, useCallback, useMemo } from 'react';
import * as api from '../api/tasks';
import { isOverdue } from '../utils/dateUtils';

/**
 * Central state hub for the task manager.
 *
 * All task data and mutations live here so every component receives plain
 * props — no component fetches data or calls the API directly.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // ---------------------------------------------------------------------------
  // Toast helper
  // ---------------------------------------------------------------------------

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // ---------------------------------------------------------------------------
  // Load tasks — called once on mount
  // ---------------------------------------------------------------------------

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ---------------------------------------------------------------------------
  // Mutations
  // ---------------------------------------------------------------------------

  const addTask = useCallback(async (payload) => {
    try {
      const data = await api.createTask(payload);
      setTasks((prev) => [data.task, ...prev]);
      showToast('Task added!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
      throw err; // Re-throw so TaskForm can clear its loading state
    }
  }, [showToast]);

  const saveEdit = useCallback(async (payload) => {
    try {
      const data = await api.updateTask(editingTask.id, payload);
      setTasks((prev) => prev.map((t) => (t.id === data.task.id ? data.task : t)));
      setEditingTask(null);
      showToast('Task updated!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  }, [editingTask, showToast]);

  const handleToggleTask = useCallback(async (id) => {
    try {
      const data = await api.toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === data.task.id ? data.task : t)));
    } catch (err) {
      showToast(err.message, 'error');
    }
  }, [showToast]);

  const confirmDeleteTask = useCallback(async () => {
    if (!confirmDelete) return;
    const idToDelete = confirmDelete.id;
    setDeletingTaskId(idToDelete);
    setConfirmDelete(null);

    // Wait for fade-out transition (300 ms) before hitting the API
    setTimeout(async () => {
      try {
        await api.deleteTask(idToDelete);
        setTasks((prev) => prev.filter((t) => t.id !== idToDelete));
        showToast('Task deleted.', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setDeletingTaskId(null);
      }
    }, 300);
  }, [confirmDelete, showToast]);

  const handleReorder = useCallback(async (activeId, overId) => {
    if (activeId === overId) return;

    // Optimistic UI update
    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex((t) => t.id === activeId);
      const newIndex = prevTasks.findIndex((t) => t.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prevTasks;

      const newTasks = [...prevTasks];
      const [movedItem] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedItem);

      // Fire off API in background — revert on failure
      api.reorderTasks(newTasks.map((t) => t.id)).catch((err) => {
        showToast('Failed to reorder: ' + err.message, 'error');
        loadTasks();
      });

      return newTasks;
    });
  }, [showToast, loadTasks]);

  // ---------------------------------------------------------------------------
  // Derived values — computed on every render, not stored in state
  // ---------------------------------------------------------------------------

  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchQuery]);

  const activeCount = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);

  return {
    // State
    tasks,
    loading,
    error,
    filter,
    searchQuery,
    editingTask,
    confirmDelete,
    toast,
    deletingTaskId,
    // Derived
    filteredTasks,
    activeCount,
    completedCount,
    isOverdue,
    // Methods
    loadTasks,
    addTask,
    saveEdit,
    toggleTask: handleToggleTask,
    reorderTasks: handleReorder,
    setEditingTask,
    setConfirmDelete,
    confirmDeleteTask,
    setFilter,
    setSearchQuery,
    setToast,
  };
}
