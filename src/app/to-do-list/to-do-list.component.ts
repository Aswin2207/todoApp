import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteList } from '../state/todo.action';
import { todoState } from '../state/todo.state';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'status', 'actions'];
  dataSource = [];
  toDoList;
  constructor(private store: Store<todoState>) { }

  ngOnInit() {
    this.toDoList= this.store.select('todoList');
    this.toDoList.subscribe((res:any)=>{
      if(res.todoList!=null)
      this.dataSource=res.todoList;
    })
  }
  deleteList(id){
    this.store.dispatch(deleteList({id:id}));
    var todoList=JSON.parse(localStorage.getItem('toDoList'));
    var filteredList=todoList.filter(res=>res.id!=id);
    filteredList=filteredList.length ==0 ?localStorage.removeItem('toDoList'):localStorage.setItem('toDoList',JSON.stringify(filteredList));
    

  }

}
