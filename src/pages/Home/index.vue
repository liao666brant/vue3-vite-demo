<template>
  <el-card>
    <h1>Hello World!</h1>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  name: 'Home',
});
</script>
