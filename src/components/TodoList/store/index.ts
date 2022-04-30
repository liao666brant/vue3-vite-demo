import { TodoReducer } from './reducer';

// ! 设置只读的字典
enum actionTypes {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

interface ActionModel {
  type: keyof typeof actionTypes;
  payload?: any;
}

export { actionTypes, TodoReducer, ActionModel };
export default actionTypes;
