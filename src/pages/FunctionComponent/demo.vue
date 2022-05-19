<template>
  <el-button type="primary" size="default" @click="open">open</el-button>
</template>

<script setup lang="ts">
import { funComponent } from './index';

const open = () => {
  return funComponent();
};
</script>
