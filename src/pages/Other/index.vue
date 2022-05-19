<template>
  <div>{{ store.test }}</div>
  <el-divider></el-divider>
  <el-button type="primary" size="default" @click="handleTo">to Why</el-button>
  <el-divider></el-divider>
  <p>useState: {{ count }}</p>
  <el-button type="primary" size="default" @click="setCount(count + 1)">
    +
  </el-button>
  <el-button
    type="primary"
    size="default"
    @click="setCount((value) => value.value - 1)"
  >
    -
  </el-button>

  <div>
    <h3>useReactive</h3>
    <p>名字: {{ data.name }}</p>
    <p>年龄: {{ data.age }}</p>
  </div>

  <el-button @click="setData('age', (state) => state + 1)">age+</el-button>
  <button @click="setData('age', data.age - 1)">age-</button>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store';
import { ElMessage } from 'element-plus';
import useState from '@/hooks/useState';
import useReactive from '@/hooks/useReactive';
import { last } from 'lodash';
console.log('[ last ] 🚀, ', last);

const router = useRouter();
const store = mainStore();

const [count, setCount] = useState(0);

const [data, setData] = useReactive({
  name: 'other',
  age: 12,
  address: '北京',
  alive: true,
});
setData({
  address: '上海',
});

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
