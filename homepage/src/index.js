import './styles/reset.css';
import './styles/style.css';
import { projects } from './data/projects.js';

import iconSprite from './assets/icons.svg?raw';

document.body.insertAdjacentHTML('afterbegin', iconSprite);

// Function to render projects
function renderProjects() {
  const projectsContainer = document.querySelector('#projects');
  const featuredProjects = projects.filter((project) => project.featured);

  const projectsHTML = featuredProjects
    .map(
      (project) => `
    <div class="project-card">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" />
        <div class="project-overlay">
          <a href="${project.liveUrl}" class="project-link" aria-label="View live demo">
            <svg class="icon">
              <use href="#icon-external"></use>
            </svg>
          </a>
          <a href="${project.githubUrl}" class="project-link" aria-label="View source code">
            <svg class="icon">
              <use href="#icon-github"></use>
            </svg>
          </a>
        </div>
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>

      </div>
    </div>
  `
    )
    .join('');

  projectsContainer.innerHTML = `
    <h2>Projects</h2>
    <div class="projects-grid">
      ${projectsHTML}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
