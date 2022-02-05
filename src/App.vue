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
}
</style>
