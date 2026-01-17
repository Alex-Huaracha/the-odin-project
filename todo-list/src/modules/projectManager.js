import Project from './project.js';
import Todo from './todo.js';
import Storage from './storage.js';

class ProjectManager {
  constructor() {
    this.projects = {};
    this.currentProject = null;
    this.load();

    if (Object.keys(this.projects).length === 0) {
      this.createProject('Default');
      this.save();
    }

    if (!this.currentProject) {
      this.currentProject = this.getProject('Default');
    }
  }

  createProject(name) {
    if (!this.projects[name]) {
      this.projects[name] = new Project(name);
      this.save();
    }
  }

  getProject(name) {
    return this.projects[name];
  }

  getProjectById(id) {
    return Object.values(this.projects).find((project) => project.id === id);
  }

  deleteProjectById(id) {
    const projectToDelete = this.getProjectById(id);
    if (!projectToDelete) return false;

    if (projectToDelete.name === 'Default') return false;

    if (this.currentProject?.id === id) {
      this.currentProject = this.getProject('Default');
    }

    for (const [name, project] of Object.entries(this.projects)) {
      if (project.id === id) {
        delete this.projects[name];
        this.save();
        return true;
      }
    }
    return false;
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getAllProjects() {
    return Object.entries(this.projects).map(([name, project]) => ({
      name,
      project,
    }));
  }

  save() {
    Storage.save('projects', this.projects);
  }

  load() {
    const parsed = Storage.load('projects');
    if (parsed) {
      for (const [name, projectData] of Object.entries(parsed)) {
        const project = new Project();
        project.todos = projectData.todos.map(
          (todo) =>
            new Todo(
              todo.title,
              todo.description,
              todo.dueDate,
              todo.priority,
              todo.completed
            )
        );
        this.projects[name] = project;
      }
    }
  }
}

export default ProjectManager;
