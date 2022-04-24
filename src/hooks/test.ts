const setData = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  obj[key] = value;
};

setData({ name: 'Tom', age: 0 }, 'age', 1);
