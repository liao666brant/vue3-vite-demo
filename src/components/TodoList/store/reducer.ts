import { addTodo, removeTodo, toggleTodo } from './actions';
import type { ActionModel } from './index';
import actionTypes from './index';

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
      addTodo(state, payload);
      break;
    case actionTypes.TOGGLE_TODO:
      toggleTodo(state, payload);
      break;
    case actionTypes.REMOVE_TODO:
      removeTodo(state, payload);
      break;
    default:
      break;
  }
};

export { TodoReducer };
