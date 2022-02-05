<template>
  <main class="container">
    <el-card v-for="(item, index) in state.newList" :key="index" class="news-card">
      <template #header>
        {{ item.title }}
      </template>
      <div class="content" @click="viewDetail(item)" v-html="item.articleAbstract"></div>
      <div class="author-name">{{ item.authorName }}</div>
    </el-card>
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>
<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive } from 'vue';
import { COVID19News, COVID19NewsModel } from '@/api/news';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  newList: [] as COVID19NewsModel[],
});

const route = useRoute();
console.log('[ route ] 🚀, ', route.meta.keepAlive);
const router = useRouter();

const getInfo = async () => {
  console.log('[ getInfo ] 🚀, ');
  const data = await COVID19News();
  state.newList = data;
};

const viewDetail = (item: COVID19NewsModel) => {
  router.push({
    name: 'NewsDetail',
    params: { ...item },
  });
};

defineExpose({ name: 'Home' });

onBeforeMount(() => {
  console.log(state.newList);
  getInfo();
});
onUnmounted(() => {
  console.log('Home销毁了');
});
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}
.news-card {
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-card__body) {
    padding-top: 0;
  }

  margin: 10px;
  .content {
    /* stylelint-disable-next-line value-no-vendor-prefix */
    display: -webkit-box;
    overflow: hidden;
    text-indent: 2em;
    text-overflow: ellipsis;
    cursor: pointer;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .content:hover {
    color: rgb(240 180 180);
    transition: 0.5s;
  }
  .author-name {
    text-align: right;
  }
}
</style>
