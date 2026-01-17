import './reset.css';
import './style.css';

import ProjectManager from './modules/projectManager';
import Todo from './modules/todo';
import { renderTodos } from './dom/todos.js';
import { seedDefaultData } from './modules/seedData.js';
import { createTodoItem } from './dom/todos.js';

import { renderProjects, setupProjectModal } from './dom/projects.js';

// Load SVG icons and insert them into the DOM
fetch('assets/icons.svg')
  .then((res) => res.text())
  .then((svg) => {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });

// Init ProjectManager and seed data if necessary
const manager = new ProjectManager();
seedDefaultData(manager);

// ==================== PROJECT HANDLERS ====================
function handleDeleteProject(project) {
  const confirmed = confirm(
    `Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`
  );

  if (confirmed) {
    const success = manager.deleteProjectById(project.id);
    if (success) {
      renderUI();
    }
  }
}

function handleEditProject(project) {
  const newName = prompt('Enter the new project name:', project.name);
  if (newName && newName.trim() !== '' && newName !== project.name) {
    if (manager.projects[newName]) {
      alert(
        'A project with this name already exists. Please choose a different name.'
      );
      return;
    }

    delete manager.projects[project.name];
    project.name = newName;
    manager.projects[newName] = project;
    manager.save();

    renderUI(project);
  }
}

function handleProjectSelect(project) {
  showAddTodoForm();
  renderUI(project);
}

// ==================== TODO HANDLERS ====================
function handleCreateTodo(todoData) {
  const currentProject = manager.getCurrentProject();
  const todo = new Todo(
    todoData.title,
    todoData.description,
    todoData.dueDate,
    todoData.priority
  );

  currentProject.addTodo(todo);
  manager.save();
  renderUI();
}

function handleTogglePriority(todo) {
  todo.togglePriority();
  manager.save();
  renderUI();
}

function handleEditTodo(todo) {
  const newTitle = prompt('Enter new title:', todo.title);
  if (newTitle && newTitle.trim()) {
    todo.updateDetails({ title: newTitle.trim() });
    manager.save();
    renderUI();
  }
}

function handleDeleteTodo(todo) {
  const confirmed = confirm(`Delete "${todo.title}"?`);
  if (confirmed) {
    const currentProject = manager.getCurrentProject();
    currentProject.removeTodoById(todo.id);
    manager.save();
    renderUI();
  }
}

setupProjectModal((projectName) => {
  manager.createProject(projectName);
  manager.save();
  renderUI();
});

// ==================== UI UTILITIES ====================
function hideAddTodoForm() {
  const addTodoSection = document.querySelector('.add-todo-section');
  if (addTodoSection) {
    addTodoSection.style.display = 'none';
  }
}

function showAddTodoForm() {
  const addTodoSection = document.querySelector('.add-todo-section');
  if (addTodoSection) {
    addTodoSection.style.display = 'flex';
  }
}

function updateActiveFilter(activeFilter) {
  // Remove active class from all nav buttons
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Add active class to current filter
  const filterBtn = document.querySelector(`[data-filter="${activeFilter}"]`);
  if (filterBtn) {
    filterBtn.classList.add('active');
  }

  // Remove active class from project buttons when using filters
  if (activeFilter !== 'all') {
    document.querySelectorAll('.projects-nav .nav-btn').forEach((btn) => {
      btn.classList.remove('active');
    });
  }
}

// ==================== UI RENDERING ====================
function renderUI(currentProject = null) {
  if (currentProject) {
    manager.setCurrentProject(currentProject);
  }

  const current = manager.getCurrentProject();

  renderProjects(manager, {
    onDeleteProject: handleDeleteProject,
    onEditProject: handleEditProject,
    onProjectSelect: handleProjectSelect,
    currentProject: current,
  });

  renderTodos(current, {
    onTogglePriority: handleTogglePriority,
    onEditTodo: handleEditTodo,
    onDeleteTodo: handleDeleteTodo,
  });

  showAddTodoForm();
}

// ==================== FILTER HANDLERS ====================
function handleTodayFilter() {
  const today = new Date().toISOString().split('T')[0];

  const allTodos = getAllTodosFromAllProjects();
  const todayTodos = allTodos.filter((todo) => todo.dueDate === today);

  hideAddTodoForm();
  renderFilteredTodos(todayTodos, 'Today');
  updateActiveFilter('today');
}

function handleUpcomingFilter() {
  const today = new Date();

  const allTodos = getAllTodosFromAllProjects();
  const upcomingTodos = allTodos.filter((todo) => {
    if (!todo.dueDate) return false;
    const todoDate = new Date(todo.dueDate);
    return todoDate > today;
  });

  hideAddTodoForm();
  renderFilteredTodos(upcomingTodos, 'Upcoming');
  updateActiveFilter('upcoming');
}

function handleCompletedFilter() {
  const allTodos = getAllTodosFromAllProjects();
  const completedTodos = allTodos.filter((todo) => todo.completed);

  hideAddTodoForm();
  renderFilteredTodos(completedTodos, 'Completed');
  updateActiveFilter('completed');
}

function handleAllTodos() {
  showAddTodoForm();
  renderUI();
  updateActiveFilter('all');
}

function getAllTodosFromAllProjects() {
  const allProjects = manager.getAllProjects();
  let allTodos = [];

  allProjects.forEach(({ name, project }) => {
    project.getAllTodos().forEach((todo) => {
      const originalProjectName = todo.projectName;
      todo.projectName = name;
      allTodos.push(todo);

      if (originalProjectName) {
        todo.projectName = originalProjectName;
      } else {
        delete todo.projectName;
      }
    });
  });

  return allTodos;
}

function renderFilteredTodos(todos, filterName) {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  if (todos.length === 0) {
    mainContent.innerHTML = `<p class="no-todos">No ${filterName.toLowerCase()} todos.</p>`;
    return;
  }

  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo, {
      onTogglePriority: handleTogglePriority,
      onEditTodo: handleEditTodo,
      onDeleteTodo: handleDeleteTodo,
      showProjectName: true,
    });
    mainContent.appendChild(todoItem);
  });
}

// ==================== SETUP ====================
function setupNavigation() {
  // Today button
  const todayBtn = document.querySelector('[data-filter="today"]');
  todayBtn?.addEventListener('click', handleTodayFilter);

  // Upcoming button
  const upcomingBtn = document.querySelector('[data-filter="upcoming"]');
  upcomingBtn?.addEventListener('click', handleUpcomingFilter);

  // Completed button
  const completedBtn = document.querySelector('[data-filter="completed"]');
  completedBtn?.addEventListener('click', handleCompletedFilter);
}

function setupTodoForm() {
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const addTodoInput = document.querySelector('.add-todo-input');
  const addTodoDescription = document.querySelector('.add-todo-description');
  const addTodoDate = document.querySelector('.add-todo-date');

  addTodoBtn?.addEventListener('click', () => {
    const title = addTodoInput.value.trim();
    if (title) {
      handleCreateTodo({
        title,
        description: addTodoDescription.value.trim(),
        dueDate: addTodoDate.value,
        priority: false,
      });

      // Clear form
      addTodoInput.value = '';
      addTodoDescription.value = '';
      addTodoDate.value = '';
    }
  });

  // Add Enter key support for quick todo creation
  addTodoInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoBtn.click();
    }
  });
}

setupNavigation();
setupTodoForm();

renderUI();
