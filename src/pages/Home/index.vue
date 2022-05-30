<template>
  <main class="home-container">
    <router-view></router-view>
    <el-skeleton :loading="state.loading" :rows="5" animated>
      <transition-group
        v-infinite-scroll="load"
        tag="ul"
        name="list"
        class="infinite-list"
        :infinite-scroll-delay="200"
        :infinite-scroll-distance="100"
      >
        <el-card
          v-for="(item, index) in state.loadNews"
          :key="index"
          class="news-card"
        >
          <template #header>{{ item.title }}</template>
          <div
            v-dompurify-html="item.articleAbstract"
            class="content"
            @click="viewDetail(item)"
          ></div>
          <div class="author-name">{{ item.authorName }}</div>
        </el-card>
        <el-empty
          v-show="state.showEmpty"
          key="empty"
          description="没有了呢~~"
        ></el-empty>
      </transition-group>
    </el-skeleton>
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>
<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { COVID19News, COVID19NewsModel } from '@/api/news';

const state = reactive({
  loading: true,
  showEmpty: false,
  newList: [] as COVID19NewsModel[],
  loadNews: [] as COVID19NewsModel[],
});

const router = useRouter();

const getInfo = async () => {
  console.log('[ getInfo ] 🚀, ');
  const data = await COVID19News();
  state.newList = data;
  state.loadNews = data.slice(0, 10);
  state.loading = false;
};

const viewDetail = (item: COVID19NewsModel) => {
  router.push({
    name: 'NewsDetail',
    params: { ...item },
  });
};

const load = () => {
  const len = state.loadNews.length;
  if (state.loading === false) {
    state.loadNews.push(...state.newList.slice(len, len + 5));
    console.log('[ state.loadNews ] 🚀, ', state.loadNews.length);
  }
  if (state.loadNews.length === state.newList.length) {
    state.showEmpty = true;
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
.home-container {
  padding: 10px;
}
.infinite-list {
  padding: 0;
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

// .list-enter-active {
//   // transition: all 0.3s ease-out;
//   transition: all 1s ease;
// }
// .list-leave-active {
//   // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
//   transition: all 1s ease;
// }
// .list-enter-from,
// .list-leave-to {
//   opacity: 0;
//   transform: translateX(20px);
// }
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;

  // transform: translateY(30px);
  transform: translateX(20px);
}
</style>
