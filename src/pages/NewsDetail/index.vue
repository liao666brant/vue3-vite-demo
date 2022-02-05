<template>
  <div class="main">
    <el-card class="news-card">
      <template #header>
        {{ params.title }}
      </template>
      <div class="content" v-html="params.articleAbstract"></div>
      <div class="author-name">{{ params.authorName }}</div>
      <router-link to="/other">to</router-link>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { COVID19NewsModel } from '@/api/news';
import { useRoute } from 'vue-router';

const route = useRoute();
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
