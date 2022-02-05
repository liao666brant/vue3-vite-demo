<template>
  <div>123</div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

onUnmounted(() => {
  console.log('Other销毁了');
});

defineExpose({ name: 'Other' });
</script>

<style scoped></style>
