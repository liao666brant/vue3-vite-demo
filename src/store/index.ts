import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      test: 'Hello World',
      count: 0,
    };
  },
  getters: {},
  actions: {},
});
