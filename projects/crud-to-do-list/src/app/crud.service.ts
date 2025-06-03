import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  isCompleted: boolean;
  isEditing?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private todos = new BehaviorSubject<Todo[]>([
    {
      id: 0,
      title: 'Sample Todo',
      description: 'This is a sample todo item',
      dueDate: new Date(),
      isCompleted: true,
    },
    {
      id: 1,
      title: 'Another Todo',
      description: 'This is another sample todo item',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Third Todo',
      isCompleted: false,
    },
  ]);

  get todos$(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  addTodo(todo: Todo): void {
    const currentTodos = this.todos.getValue();
    this.todos.next([...currentTodos, todo]);
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todos.getValue();
    const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
    this.todos.next(updatedTodos);
  }

  editTodo(updatedTodo: Todo): void {
    const currentTodos = this.todos.getValue();
    const updatedTodos = currentTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.todos.next(updatedTodos);
  }

  clearTodos(): void {
    this.todos.next([]);
  }
}
