import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskItem from './TaskItem';

/**
 * A draggable wrapper around TaskItem using @dnd-kit/sortable.
 */
export default function SortableTaskItem({
  task,
  overdue,
  isDeleting,
  onToggle,
  onEdit,
  onDelete,
  isDragDisabled,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: isDragDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    position: isDragging ? 'relative' : undefined,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskItem
        task={task}
        overdue={overdue}
        isDeleting={isDeleting}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        dragListeners={listeners}
        dragAttributes={attributes}
        isDragDisabled={isDragDisabled}
      />
    </div>
  );
}
