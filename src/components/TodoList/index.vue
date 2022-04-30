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

const [todoList, todoDispatch] = useReducer(TodoReducer, []);
todoList;
todoDispatch({ type: 'Add' });
</script>

<style scoped></style>
