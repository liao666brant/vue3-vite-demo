<template>
  <main class="container">
    <ul v-infinite-scroll="load" class="infinite-list" infinite-scroll-distance="20">
      <el-card v-for="(item, index) in state.loadNews" :key="index" class="news-card">
        <template #header>
          {{ item.title }}
        </template>
        <div v-dompurify-html="item.articleAbstract" class="content" @click="viewDetail(item)"></div>
        <div class="author-name">{{ item.authorName }}</div>
      </el-card>
    </ul>
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
import { useRouter } from 'vue-router';

const state = reactive({
  newList: [] as COVID19NewsModel[],
  loadNews: [] as COVID19NewsModel[],
});

const router = useRouter();
let isLoading = false;

const getInfo = async () => {
  console.log('[ getInfo ] 🚀, ');
  const data = await COVID19News();
  state.newList = data;
  state.loadNews = data.slice(0, 10);
  isLoading = true;
};

const viewDetail = (item: COVID19NewsModel) => {
  router.push({
    name: 'NewsDetail',
    params: { ...item },
  });
};

const load = () => {
  console.log('[ load ] 🚀');
  const len = state.loadNews.length;
  if (isLoading === true) {
    state.loadNews.push(...state.newList.slice(len, len + 5));
    console.log('[ state.loadNews ] 🚀, ', state.loadNews.length);
  }
};

defineExpose({ name: 'Home' });

onBeforeMount(() => {
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
