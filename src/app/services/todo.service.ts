import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { TodoModel } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosCollection = collection(this.firestore, 'todos');

  constructor(private firestore: Firestore) {}

  getTodos(): Observable<TodoModel[]> {
    return collectionData(this.todosCollection, {
      idField: 'id',
    }) as Observable<TodoModel[]>;
  }

  addTodo(todo: TodoModel) {
    return addDoc(this.todosCollection, todo);
  }

  updateTodo(todoId: number, data: Partial<TodoModel>) {
    const todoDoc = doc(this.firestore, `todos/${todoId}`);
    return updateDoc(todoDoc, data);
  }

  deleteTodo(todoId: number) {
    const todoDoc = doc(this.firestore, `todos/${todoId}`);
    return deleteDoc(todoDoc);
  }
}
