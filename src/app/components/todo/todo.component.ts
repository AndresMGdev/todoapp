import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoModel } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { map } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class TodoComponent implements OnInit {
  todoList = signal<TodoModel[]>([]);
  private todoService = inject(TodoService);

  ngOnInit() {
    this.todoService
      .getTodos()
      .pipe(
        map((todos) => {
          this.todoList.set(todos);
        })
      )
      .subscribe();
  }

  toggleTodo(todoId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const completed = input.checked;

    this.todoService
      .updateTodo(todoId, { completed })
      .then(() => {
        const todos = this.todoList();
        const todoIndex = todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex > -1) {
          todos[todoIndex].completed = completed;
          this.todoList.set([...todos]);
        }
      })
      .catch((error) => {
        console.error('Error updating todo: ', error);
      });
  }

  editTodo(todo: TodoModel) {
    todo.editing = true;
    this.todoList.set([...this.todoList()]);
  }

  cancelEdit(todo: TodoModel) {
    todo.editing = false;
    this.todoList.set([...this.todoList()]);
  }

  updateTodo(todo: TodoModel) {
    todo.editing = false;
    this.todoService
      .updateTodo(todo.id, { title: todo.title, text: todo.text })
      .then(() => {
        const todos = this.todoList();
        const todoIndex = todos.findIndex((t) => t.id === todo.id);
        if (todoIndex > -1) {
          todos[todoIndex] = todo;
          this.todoList.set([...todos]);
        }
      })
      .catch((error) => {
        console.error('Error updating todo: ', error);
      });
  }

  deleteTodo(todoId: number) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task has been deleted',
      showConfirmButton: false,
      timer: 2000,
    });
    this.todoService
      .deleteTodo(todoId)
      .then(() => {
        const todos = this.todoList().filter((todo) => todo.id !== todoId);
        this.todoList.set([...todos]);
      })
      .catch((error) => {
        console.error('Error deleting todo: ', error);
      });
  }
}
