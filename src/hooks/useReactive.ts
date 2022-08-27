import { reactive, ToRefs, toRefs } from 'vue';

interface Initial {
  [key: string]: any;
}

type SetReactive<T> = [
  T,
  <X extends T, Y extends keyof X>(
    key: Partial<T> | Y,
    value?: X[Y] | ((param: X[Y]) => X[Y])
  ) => void,
  ToRefs<T>
];

function useReactive<T extends object>(initialState: T) {
  const state = reactive<Initial>(initialState as unknown as object);
  const stateRefs = toRefs(state);

  const setObj = (key: T & Initial) => {
    // TODO 使用Object.assign() 重写
    for (const target in key) {
      if (target in key) {
        state[target] = key[target];
      }
    }
  };

  const setFun = (key: string, callback: (value: T) => void) => {
    const temp = callback(state[key]);
    if (typeof temp === typeof state[key]) {
      state[key] = temp;
    } else {
      console.warn(`函数返回的数据类型-${typeof temp}不与目标类型${typeof state[key]}一致`);
    }
  };

  const setValue = (key: string, value: any) => {
    if (typeof value === typeof state[key]) {
      state[key] = value;
    } else {
      console.warn(`[key] ${key} 的类型不与 state[key](${state[key]}) 一致 `);
    }
  };

  /**
   * 设置状态数据的实现方法
   */
  const setState = (key: any, value?: any): void => {
    if (key instanceof Object) {
      setObj(key);
    } else {
      if (value instanceof Function) {
        setFun(key, value);
      } else {
        setValue(key, value);
      }
    }
  };

  return [state, setState, stateRefs] as SetReactive<T>;
}

export default useReactive;
