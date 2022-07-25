<template>
  <div>Hello world!</div>
</template>

<script setup lang="ts">
import { useReducer } from '@/hooks';

import { TodoReducer } from './store';

const [todoList, todoDispatch] = useReducer(TodoReducer, []);
todoList;
todoDispatch({ type: 'Add' });
</script>

<style scoped></style>
