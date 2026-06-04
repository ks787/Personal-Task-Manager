import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskForm from './TaskForm';
import EmptyState from './EmptyState';

/**
 * Renders the filtered task list inside a DnD context.
 * Inline edit mode swaps a TaskItem with TaskForm.
 */
export default function TaskList({
  tasks,
  editingTask,
  isOverdue,
  deletingTaskId,
  filter,
  searchQuery,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onReorder,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Disable dragging when list is filtered to prevent confusing jumps
  const isDragDisabled = filter !== 'all' || searchQuery.trim().length > 0;

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      onReorder(active.id, over.id);
    }
  }

  if (tasks.length === 0) {
    return <EmptyState filter={filter} searchQuery={searchQuery} />;
  }

  return (
    <section aria-label="Task list">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id}>
                {editingTask?.id === task.id ? (
                  <TaskForm
                    initialValues={{
                      title: task.title,
                      description: task.description,
                      dueDate: task.dueDate || '',
                    }}
                    onSubmit={onSaveEdit}
                    onCancel={onCancelEdit}
                    isLoading={isLoading}
                  />
                ) : (
                  <SortableTaskItem
                    task={task}
                    overdue={isOverdue(task)}
                    isDeleting={deletingTaskId === task.id}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDragDisabled={isDragDisabled}
                  />
                )}
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
}
