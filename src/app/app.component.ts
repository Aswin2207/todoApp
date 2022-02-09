import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { intialData } from './state/todo.action';
import { list } from './state/todo.model';
import { todoState } from './state/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'To-Do-App';
  buttonChange:boolean;
  constructor(private router: Router,private store: Store<todoState>) { 

  }

  ngOnInit(): void {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){ 
         if(routerData.url.includes('list')){
          this.buttonChange=true;
         }
         else{
          this.buttonChange=false;
         }
    } 
})
  var list:list=JSON.parse(localStorage.getItem('toDoList'));
  var count=JSON.parse(localStorage.getItem('countList'));
  var countNumber=count;
  if(list)
  this.store.dispatch(intialData({data:list,count:countNumber}));
  }
}
