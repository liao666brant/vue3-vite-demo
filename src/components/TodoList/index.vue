<template>
  <div>Hello world!</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { useReducer } from '@/hooks';

import { ActionModel,actionTypes, TodoReducer } from './store';

const state = reactive({
  name: 'App',
});

const [todoList, todoDispatch] = useReducer(TodoReducer, []);
todoList;
todoDispatch({ type: 'Add' });
</script>

<style scoped></style>
