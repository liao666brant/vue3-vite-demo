<template>
  <div>{{ store.test }}</div>
  <el-divider></el-divider>
  <el-button type="primary" size="default" @click="handleTo">to Why</el-button>
  <el-divider></el-divider>
  <p>useState: {{ count }}</p>
  <el-button type="primary" size="default" @click="setCount(count + 1)">
    +
  </el-button>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store';
import { ElMessage } from 'element-plus';
import useState from '@/hooks/useState';

const router = useRouter();
const store = mainStore();

const [count, setCount] = useState(0);

setCount(1);

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
