<template>
  <div>测试一下</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('[ route ] 🚀, ', route);
</script>

<style scoped></style>
