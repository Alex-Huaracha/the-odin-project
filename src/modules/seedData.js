import Todo from './todo.js';

export function seedDefaultData(manager) {
  const defaultProject = manager.getProject('Default');
  if (defaultProject.getAllTodos().length === 0) {
    defaultProject.addTodo(
      new Todo(
        'Learn JavaScript',
        'Understand the basics of JavaScript',
        '2023-10-01',
        true
      )
    );
    defaultProject.addTodo(
      new Todo(
        'Build a Todo App',
        'Create a simple todo application using vanilla JS',
        '2024-10-05',
        false
      )
    );
    defaultProject.addTodo(
      new Todo(
        'Review Code',
        'Go through the code and ensure it follows best practices',
        '2025-10-03',
        false
      )
    );
    defaultProject.addTodo(
      new Todo(
        'Write Tests',
        'Implement unit tests for the application',
        '2025-10-10',
        false
      )
    );
    defaultProject.addTodo(
      new Todo(
        'Troubleshoot Bugs',
        'Implement unit tests for the application',
        // Today like '2025-10-10'
        new Date().toISOString().split('T')[0],
        false
      )
    );
    manager.save();
  }

  if (!manager.getProject('Work')) {
    manager.createProject('Work');
    const workProject = manager.getProject('Work');
    workProject.addTodo(
      new Todo(
        'Prepare Presentation',
        'Create slides for the upcoming meeting',
        '2024-11-01',
        true
      )
    );
    manager.save();
  }
}
