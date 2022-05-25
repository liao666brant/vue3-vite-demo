<template>
  <div class="main">
    <el-card class="news-card">
      <template #header>
        {{ params.title }}
      </template>
      <div v-dompurify-html="params.articleAbstract" class="content"></div>
      <div class="author-name">{{ params.authorName }}</div>
      <router-link :to="{ name: 'Other' }">to</router-link>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { COVID19NewsModel } from '@/api/news';

defineExpose({});

const route = useRoute();
const router = useRouter();
const params = reactive(route.params as unknown as COVID19NewsModel);

// console.log('[ params ] 🚀, ', params);

onUnmounted(() => {
  console.log('Detail销毁了');
});
</script>

<style scoped lang="scss">
.news-card {
  margin: 10px;
  .content {
    &::first-letter {
      float: left;
      padding-right: 5px;
      font-size: 2em;
      text-transform: uppercase;
    }
  }
  .author-name {
    text-align: right;
  }
}
</style>
