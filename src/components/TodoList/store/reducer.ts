import actionTypes from './index';
import type { ActionModel } from './index';
import { addTodo, toggleTodo, removeTodo } from './actions';

interface Callback {
  (state: any, payload: any): void;
}

/**
 * Reducer函数
 * 执行一个逻辑函数
 * @param {*} state 状态数据
 * @param {ActionModel} action 执行的函数参数,函数名和装载值
 * @return {*}
 */
const TodoReducer = (state: any, action: ActionModel): void => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_TODO:
      return addTodo(state, payload);
    case actionTypes.TOGGLE_TODO:
      return toggleTodo(state, payload);
    case actionTypes.REMOVE_TODO:
      return removeTodo(state, payload);
    default:
      break;
  }
};

export { TodoReducer };
