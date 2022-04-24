import { ref, Ref } from 'vue';

interface Setter<T> {
  (newState: T | ((value: Ref<T>) => T)): void;
}

const states: Ref[] = [],
  stateSetters: Function[] = [];
let stateIndex = 0;

/**
 * 根据传来的参数创建一个新的state
 */
function createState<T>(initialState: T, stateIndex: number) {
  const state = ref(initialState);

  return states[stateIndex] !== undefined ? states[stateIndex] : state;
}

/**
 * 产生一个state的状态改变函数
 */
function createSetter<T>(startIndex: number): Setter<T> {
  return (newState) => {
    if (newState instanceof Function) {
      states[startIndex].value = newState(states[startIndex]);
    } else {
      states[startIndex].value = newState;
    }
  };
}

function useState<T>(initialState: T) {
  states[stateIndex] = createState<T>(initialState, stateIndex);
  if (!stateSetters[stateIndex]) {
    stateSetters.push(createSetter<T>(stateIndex));
  }
  const _state = states[stateIndex];
  const _setState = stateSetters[stateIndex];
  stateIndex++;

  return [_state, _setState] as [Ref<T>, Setter<T>];
}

export default useState;
