<template>
  <teleport to="body">
    <div>Hello world!</div>
    <p>this is a function Component</p>
  </teleport>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  name: 'App',
});
</script>

<style scoped></style>
