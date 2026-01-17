import createActionButton from './utils.js';

function projectActions(onEdit, onDelete) {
  const actions = document.createElement('span');
  actions.className = 'project-actions';

  const editBtn = createActionButton({
    className: 'edit-project-btn',
    iconId: 'icon-edit',
    onClick: onEdit,
  });

  const deleteBtn = createActionButton({
    className: 'delete-project-btn',
    iconId: 'icon-trash',
    onClick: onDelete,
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  return actions;
}

export function renderProjects(manager, options = {}) {
  const { onDeleteProject, onEditProject, currentProject, onProjectSelect } =
    options;
  const projectsNav = document.querySelector('.projects-nav');
  projectsNav.innerHTML = '';

  manager.getAllProjects().forEach(({ name, project }) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';

    const btn = document.createElement('button');
    btn.className = `nav-btn ${
      currentProject?.id === project.id ? 'active' : ''
    }`;
    btn.innerHTML = `
      <svg class="icon"><use href="#icon-project"></use></svg>
      ${name}
    `;
    btn.addEventListener('click', () => {
      onProjectSelect?.(project);
    });

    projectItem.appendChild(btn);

    if (name !== 'Default') {
      const actions = projectActions(
        () => onEditProject?.(project),
        () => onDeleteProject?.(project)
      );
      projectItem.appendChild(actions);
    }

    projectsNav.appendChild(projectItem);
  });
}

export function setupProjectModal(onCreateProject) {
  const addBtn = document.querySelector('.add-project-btn');
  const modalOverlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('.project-form');
  const input = document.querySelector('.project-name-input');
  const closeBtn = document.querySelector('.close-modal-btn');

  addBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    input.value = '';
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      onCreateProject(input.value.trim());
      modalOverlay.style.display = 'none';
      form.reset();
    }
  });
}
