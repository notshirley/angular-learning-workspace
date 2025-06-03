import { Component } from '@angular/core';
import { CrudService, Todo } from './crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const DEFAULT_TODO = {
  id: 0,
  title: '',
  description: '',
  dueDate: undefined,
  isCompleted: false,
  isEditing: false,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo: Todo = { ...DEFAULT_TODO };
  editCache: { [id: number]: Todo } = {};

  constructor(private crudService: CrudService) {
    this.crudService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
  }

  removeTodo(id: number): void {
    this.crudService.deleteTodo(id);
  }

  addTodo(todo: Todo): void {
    if (!todo.title.trim()) {
      alert('Title is required');
    } else {
      todo.id = this.todos.length ? this.todos.length : 1;
      this.crudService.addTodo(todo);
      this.newTodo = { ...DEFAULT_TODO };
    }
  }

  editTodo(id: number): void {
    const todo = this.todos[id];
    if (todo) {
      todo.isEditing = true;
      this.editCache[id] = {
        ...todo,
        dueDate: todo.dueDate ? this.toDateInputValue(todo.dueDate) : undefined,
      } as Todo;
    }
  }

  toDateInputValue(date: Date | string): string {
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const adjustedDate = new Date(d.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  }

  updateTodo(todo: Todo): void {
    const cache = this.editCache[todo.id];
    if (!cache || !cache.title?.trim()) {
      alert('Title is required');
    } else {
      this.crudService.editTodo(cache);
      todo.isEditing = false;
      delete this.editCache[todo.id];
    }
  }

  cancelEditMode(id: number): void {
    this.todos[id].isEditing = false;
    delete this.editCache[id];
  }

  markAsCompleted(id: number): void {
    const todo = this.todos[id];
    todo.isCompleted = !todo.isCompleted;
    this.crudService.editTodo(todo);
  }

  clearList() {
    this.crudService.clearTodos();
  }
}
