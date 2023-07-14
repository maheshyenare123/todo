import { TodosService } from './_services/todos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Todo } from './_models/todo';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoFormGroup!: FormGroup;
  todo!: Todo
  todos = new BehaviorSubject<any>([])
  constructor(private fb: FormBuilder, private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos()
    this.loadTodo(0)
  }

  getTodos() {
    this.todos.next(this.todosService.getTodos());
  }

  edit(id: number) {
    this.loadTodo(id)
  }

  loadTodo(id: number) {
    if (id == 0) {
      this.todo = new Todo();
      this.loadForm()
    } else {
      const todos = this.todos.getValue();
      const index = todos.findIndex((task: any) => task.id === id);
      this.todo = todos[index]
      this.loadForm()
    }
  }

  loadForm() {
    this.todoFormGroup = this.fb.group({
      id: [this.todo.id, Validators.required],
      title: [this.todo.title, Validators.required],
      date: [this.todo.date, Validators.required],
    })
  }

  save() {
    debugger
    this.prepareData()
    if (this.todo.id == 0) {
      this.todo.id = Math.random()
      this.add()
    } else {
      this.update()
    }
  }

  cancel() {
    this.loadTodo(0)
  }

  prepareData() {
    const formData = this.todoFormGroup.value
    this.todo = formData
  }
  selectRow(id: number) {
    debugger
    const todos = this.todos.getValue();
    const taskIndex = todos.findIndex((task: any) => task.id === id);
    todos[taskIndex].completed = !todos[taskIndex].completed;
    this.todos.next(todos)

  }

  add() {
    debugger
    this.todosService.addTodo(this.todo)
    alert('save successfully');
    this.loadTodo(0);
    this.getTodos()
  }

  update() {
    this.todosService.updateTodo(this.todo)
    alert('update successfully');
    this.loadTodo(0);
    this.getTodos()
  }

  deleteTodo(id: number) {
    const response = confirm("Are you sure you want to delete record?");

    if (response) {
      this.todosService.deleteTodo(id)
      confirm('Delete Successfully.')
      this.getTodos()
    } else {

    }

  }

  isControlValid(controlName: string): boolean {
    const control = this.todoFormGroup.controls[controlName]
    return control.valid && (control.dirty || control.touched)
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.todoFormGroup.controls[controlName]
    return control.invalid && (control.dirty || control.touched)
  }

  controlHasError(validation: string, controlName: string): boolean {
    const control = this.todoFormGroup.controls[controlName]
    return control.hasError(validation) && (control.dirty || control.touched)
  }

}
