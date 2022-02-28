<template>
  <div>{{ store.test }}</div>
  <el-divider></el-divider>
  <el-button type="primary" size="default" @click="handleTo">to Why</el-button>
  <el-divider></el-divider>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store';
import { ElMessage } from 'element-plus';

const router = useRouter();
const store = mainStore();
console.log('[ store ] 🚀, ', store);

const handleTo = () => {
  router.push({
    name: 'Why',
  });
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};

onUnmounted(() => {
  console.log('Other销毁了');
});

defineExpose({ name: 'Other' });
</script>

<style scoped></style>
