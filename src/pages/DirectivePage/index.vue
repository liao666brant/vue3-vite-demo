<template>
  <div class="app">Hello world!</div>

  <p>next img</p>

  <img v-img-lazy="imgUrl" alt="" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const imgUrl =
  'https://img1.gtimg.com/ninja/2/2021/01/ninja161106114732204.jpg';

const state = reactive({
  name: 'App',
});
</script>

<style lang="scss" scoped>
.app {
  margin: 500px 0;
}
</style>
