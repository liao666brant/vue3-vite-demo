<template>
  <div>Hello world!</div>
</template>

<script setup lang="ts">
import { useReducer } from '@/hooks';
import { actionTypes, TodoReducer, ActionModel } from './store';
import { reactive } from 'vue';

const state = reactive({
  name: 'App',
});

const [todoList, todoDispatch] = useReducer<ActionModel['type']>(
  TodoReducer,
  []
);
todoList;
todoDispatch({
  type: 'REMOVE_TODO',
  payload: 12,
});
</script>

<style scoped></style>
