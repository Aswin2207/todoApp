import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { parse } from 'querystring';
import { addList, updateList } from '../state/todo.action';
import { list } from '../state/todo.model';
import { todoState } from '../state/todo.state';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit, OnDestroy {

  constructor(public formBuilder: FormBuilder, private _snackBar: MatSnackBar, private store: Store<todoState>,
    private router: Router, private activeRoute: ActivatedRoute) {

  }
  status = [];
  listForm: any;
  date;
  taskName;
  priorityStatus;
  countList: number;
  id;
  toDoList;
  ngOnInit() {
    this.status = [{ id: 1, priortyName: 'High' }, { id: 2, priortyName: 'Medium' }, { id: 3, priortyName: 'Low' }];
    this.listForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      taskName: ['', [Validators.required]],
      priorityStatus: ['', [Validators.required]],
    });
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.getFormValues();
    this.store.select('todoList').subscribe((res: any) => {
      this.countList = res.countList;
      if (this.id)
        this.toDoList = res.todoList.find((data) => data.id == this.id);
    });
    if (this.id) {
      this.setFormValues();
    }

  }
  getFormValues() {
    this.date = this.listForm.get('date');
    this.taskName = this.listForm.get('taskName');
    this.priorityStatus = this.listForm.get('priorityStatus');
  }

  setFormValues() {
    this.listForm.get('date').setValue(this.toDoList.date);
    this.listForm.get('taskName').setValue(this.toDoList.taskName);
    this.listForm.get('priorityStatus').setValue(this.toDoList.status);
  }

  createToDo() {
    var toDoList = localStorage.getItem('toDoList');
    if (!toDoList) {
      var list: list = { id: this.countList, date: this.date.value, taskName: this.taskName.value, status: this.priorityStatus.value };
      toDoList = JSON.stringify([list]);
      localStorage.setItem('toDoList', toDoList);
      this.store.dispatch(addList({ data: list }));
      localStorage.setItem('countList', JSON.stringify(this.countList));
    }
    else {
      var list: list = { id: this.countList, date: this.date.value, taskName: this.taskName.value, status: this.priorityStatus.value };
      var parsedList = JSON.parse(toDoList);
      var pushList = [...parsedList, list];
      toDoList = JSON.stringify(pushList);
      localStorage.setItem('toDoList', toDoList);
      if (localStorage.getItem('countList')) {
        localStorage.removeItem('countList');
        localStorage.setItem('countList', JSON.stringify(this.countList));
      }
      this.store.dispatch(addList({ data: list }));
    }
    this.router.navigate(['/todo-list']);
    this.openSnackBar("Todo Added to the List SuccessFully!");

  }

  updateToDo() {
    var toDoList = JSON.parse(localStorage.getItem('toDoList'));
    var parsedList = toDoList.map((value) => value.id === this.id ? { ...value, name: this.taskName.value, date: this.date.value, status: this.priorityStatus.value } : value);
    parsedList = JSON.stringify(parsedList);
    localStorage.setItem('toDoList', parsedList);
    var list: list = { id: this.toDoList.id, date: this.date.value, taskName: this.taskName.value, status: this.priorityStatus.value };
    this.store.dispatch(updateList({ data: list }));
    this.openSnackBar("Todo Updated SuccessFully!");
    this.router.navigate(['/todo-list']);

  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000
    });

  }

  ngOnDestroy() {
    this.listForm.reset();
    this.id = undefined;
  }
}
