<template>
  <div>123</div>
  <el-divider></el-divider>
  <el-button type="primary" size="default" @click="handleTo">to Why</el-button>

  <el-divider></el-divider>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleTo = () => {
  router.push({
    name: 'Why',
  });
};

onUnmounted(() => {
  console.log('Other销毁了');
});

defineExpose({ name: 'Other' });
</script>

<style scoped></style>
