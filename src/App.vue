<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['HomePage']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
// import '@/styles/reset.scss';
</script>

<style>
body,
html {
  margin: 0;
  font-size: 16px;
  font-family: '微软雅黑', Arial, Helvetica, sans-serif;
}
</style>
