import { createAction, props } from "@ngrx/store";
import { list } from "./todo.model";

export const addList=createAction('addList',props<{data:list}>());
export const updateList=createAction('updateList',props<{data:list}>());
export const deleteList=createAction('deleteList',props<{id:number}>());
export const intialData=createAction('intialData',props<{data:list,count:number}>());