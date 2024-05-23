import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';

export const routes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: 'todo-add', component: TodoAddComponent },
  { path: '**', redirectTo: 'todo' },
];
