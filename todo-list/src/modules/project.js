import Todo from './todo.js';

class Project {
  constructor(name, id = crypto.randomUUID()) {
    this.id = id;
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  updateTodo(index, updates) {
    if (this.todos[index]) {
      this.todos[index].updateDetails(updates);
    }
  }

  completeTodo(index) {
    if (this.todos[index]) {
      this.todos[index].toggleCompletion();
    }
  }

  removeTodoById(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  getAllTodos() {
    return this.todos;
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getIncompleteTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  getTodosByPriority(priority) {
    return this.todos.filter((todo) => todo.priority === priority);
  }
}

export default Project;
