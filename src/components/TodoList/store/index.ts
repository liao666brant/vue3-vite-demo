import { TodoReducer } from './reducer';

// ! 设置只读的字典
const actionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

interface ActionModel {
  type: keyof typeof actionTypes;
  payload?: any;
}

export { ActionModel, actionTypes, TodoReducer };
export default actionTypes;
