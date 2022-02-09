import { createReducer, on } from "@ngrx/store";
import { addList, deleteList, intialData, updateList } from "./todo.action";
import { intialState } from "./todo.state";

const _todoReducer = createReducer(intialState,
    on(addList, (state,action) => {
        return {
            ...state,
            todoList:[...state.todoList,action.data],
            countList:state.countList+1
            
        }
    }),
    on(deleteList,(state,action)=>{
        return {
            ...state,
            todoList:state.todoList.filter(res=>res.id!=action.id),
            
        }
    }),
    on(updateList,(state,action)=>{
        return {

            ...state,
            todoList:state.todoList.map((value) => value.id === action.data.id ? {...value, name: action.data.taskName,date:action.data.date,status:action.data.status} : value) ,
            
        }
    }),
    on(intialData,(state,action)=>{
        return {

            ...state,
            todoList:state.todoList.concat(action.data),
            countList:action.count
            
        }
    }))

export function todoReducer(state, action) {
  return _todoReducer(state,action);
}