import { TodoReducer } from './reducer';

const actionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

interface Payload {
  type: string;
}

interface ActionModel {
  type: keyof typeof actionTypes;
  payload: any;
}

export { actionTypes, TodoReducer, Payload, ActionModel };
export default actionTypes;
