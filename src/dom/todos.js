import createActionButton from './utils.js';
import { format, parseISO } from 'date-fns';

function todoActions(todo, onPriority, onEdit, onDelete) {
  const actions = document.createElement('span');
  actions.className = 'todo-actions';

  const priorityBtn = createActionButton({
    className: `priority-btn ${todo.priority ? 'priority-active' : ''}`,
    iconId: 'icon-star',
    onClick: onPriority,
  });

  const editBtn = createActionButton({
    className: 'edit-todo-btn',
    iconId: 'icon-edit',
    onClick: onEdit,
  });

  const deleteBtn = createActionButton({
    className: 'delete-todo-btn',
    iconId: 'icon-trash',
    onClick: onDelete,
  });

  actions.appendChild(priorityBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  return actions;
}

function createTodoItem(todo, options = {}) {
  const {
    onTogglePriority,
    onEditTodo,
    onDeleteTodo,
    showProjectName = false,
  } = options;

  const div = document.createElement('div');
  div.className = `todo-item ${todo.completed ? 'completed' : ''} ${
    todo.priority ? 'priority' : ''
  }`;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todo.toggleCompletion();
    div.classList.toggle('completed', todo.completed);
  });

  // Content section (Title/Details)
  const content = document.createElement('div');
  content.className = 'todo-content';

  if (showProjectName && todo.projectName) {
    const projectBadge = document.createElement('span');
    projectBadge.className = 'project-badge';
    projectBadge.textContent = todo.projectName;
    content.appendChild(projectBadge);
  }

  if (todo.priority) {
    const priorityBadge = document.createElement('span');
    priorityBadge.className = 'priority-badge';
    priorityBadge.textContent = 'Important';
    content.appendChild(priorityBadge);
  }

  const title = document.createElement('h4');
  title.className = 'todo-title';
  title.textContent = todo.title;
  content.appendChild(title);

  if (todo.description) {
    const description = document.createElement('p');
    description.className = 'todo-description';
    description.textContent = todo.description;
    content.appendChild(description);
  }

  // Date section
  const dateSection = document.createElement('div');
  dateSection.className = 'todo-date-section';

  if (todo.dueDate) {
    const date = document.createElement('span');
    date.className = 'todo-date';
    try {
      date.textContent = format(parseISO(todo.dueDate), 'dd/MM/yyyy');
    } catch {
      date.textContent = todo.dueDate;
    }
    dateSection.appendChild(date);
  }

  // Actions
  const actions = todoActions(
    todo,
    () => onTogglePriority?.(todo),
    () => onEditTodo?.(todo),
    () => onDeleteTodo?.(todo)
  );

  // Append in order: checkbox | content | date | actions
  div.appendChild(checkbox);
  div.appendChild(content);
  div.appendChild(dateSection);
  div.appendChild(actions);

  return div;
}

export function renderTodos(project, options = {}) {
  const { onTogglePriority, onEditTodo, onDeleteTodo } = options;
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  if (!project || project.getAllTodos().length === 0) {
    mainContent.innerHTML =
      '<p class="no-todos">No todos yet. Add one above!</p>';
    return;
  }

  project.getAllTodos().forEach((todo) => {
    const todoItem = createTodoItem(todo, {
      onTogglePriority,
      onEditTodo,
      onDeleteTodo,
    });
    mainContent.appendChild(todoItem);
  });
}

export { createTodoItem };
