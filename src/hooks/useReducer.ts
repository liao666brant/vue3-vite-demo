import { reactive } from 'vue';

interface Dispatch<T> {
  ({ type, payload }: { type: T; payload: any }): void;
}

/**
 * Reducer状态管理钩子
 * 同状态的逻辑函数集合,进行统一的状态管理
 * @template T 泛型,可调用函数的类型签名
 * @param {Function} reducer 具体的reducer,执行action函数需要类型名和payload装载值
 * @param {*} initialState 初始值
 */
export default function useReducer<T>(reducer: Function, initialState: any) {
  const state = reactive(initialState);
  const action = {} as { type: T; payload: any };

  const dispatch: Dispatch<T> = ({ type, payload }) => {
    action.type = type;
    action.payload = payload;
    reducer(state, action);
  };

  return [state, dispatch] as [typeof initialState, typeof dispatch];
}
