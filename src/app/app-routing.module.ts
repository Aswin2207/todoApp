import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


const routes: Routes = [
  { path: 'create-todo', component: CreateTodoComponent },
  { path: 'edit-todo/:id', component: CreateTodoComponent },
  { path: 'todo-list', component: ToDoListComponent },
  { path: '', redirectTo: 'todo-list',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
