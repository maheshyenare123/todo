import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  getTodos(): any[] {
    let todos = JSON.parse(localStorage.getItem('todos')!);
    if (todos == undefined || todos == null) {
      todos = []
    }
    return todos;
  }

  addTodo(newTodo: any) {
    let todos = JSON.parse(localStorage.getItem('todos')!);
    if (todos == undefined || todos == null) {
      todos = []
    }
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  updateTodo(newTodo: any) {
    let todos = JSON.parse(localStorage.getItem('todos')!);

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == newTodo.id) {
        todos[i] = newTodo;
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteTodo(id: number) {
    let todos = JSON.parse(localStorage.getItem('todos')!);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }

}
