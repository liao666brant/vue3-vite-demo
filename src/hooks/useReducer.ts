/*
 * useReducer 是 useState的代替方案，用于 state 复杂变化
 * useReducer 是单个组件状态管理，组件通讯还需要 props
 * redux 是全局状态管理，多组件共享数据
 */

import { reactive, UnwrapNestedRefs } from 'vue';
interface DispatchParams<T = string> {
  type: T;
  payload?: any;
}

type UseReducer<T> = [UnwrapNestedRefs<T>, <U>(action: DispatchParams<U>) => void];

/**
 * Reducer状态管理钩子
 * 同状态的逻辑函数集合,进行统一的状态管理
 * @template T 泛型,可调用函数的类型签名
 * @param {Function} reducer 具体的reducer,执行action函数需要类型名和payload装载值
 * @param {*} initialState 初始值
 */
function useReducer<T extends object>(reducer: Function, initialState: T) {
  const state = reactive(initialState);

  const dispatch = <U>(action: DispatchParams<U>) => {
    if (Object.prototype.toString.call(action) !== '[object Object]') {
      throw new TypeError(`The Parameter 'action' must be the type 'Object'.`);
    }
    if (!('type' in action)) {
      throw new ReferenceError(`The parameter 'action' need a property 'type'`);
    }
    const { type, payload } = action;
    reducer(state, action);
  };

  return [state, dispatch] as UseReducer<T>;
}

export default useReducer;
