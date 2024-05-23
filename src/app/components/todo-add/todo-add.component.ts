import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../models/todo';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  addTask!: FormGroup;
  private todoService = inject(TodoService);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addTask = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      text: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submitTask() {
    if (this.addTask.valid) {
      const newTask: Omit<TodoModel, 'id'> = this.addTask.value; // Omit the id to add it later
      const todo: TodoModel = {
        ...newTask,
        id: Date.now(), // Ensure ID is a number
        completed: false,
        editing: false,
      };
      this.todoService
        .addTodo(todo)
        .then(() => {
          // Reset the form after successful submission
          this.addTask.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been created',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error('Error adding task: ', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
