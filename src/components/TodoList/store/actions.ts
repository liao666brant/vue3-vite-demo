import type { Payload } from './index';

const addTodo = (state: any, payload: Payload) => {
  state.push(payload);
};

const toggleTodo = (state: any, payload: Payload) => {
  for (const item of state) {
    if (item.id === payload) {
      item.complete = !item.complete;
    }
  }
};

const removeTodo = (state: any, payload: Payload) => {
  for (let index = 0; index < state.length; index++) {
    const item = state[index];
    if (item.id === payload) {
      state.splice(index, 1);
      break;
    }
  }
};

export { addTodo, toggleTodo, removeTodo };
