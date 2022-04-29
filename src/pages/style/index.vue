<template>
  <div class="title">Hello world!</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  name: 'App',
  color: 'pink',
  fontSize: 10,
});
</script>

<style scoped lang="scss">
.title {
  /**
   * css v-bind语法同样也适用于 <script setup>，
   * 且支持 JavaScript 表达式（需要用引号包裹起来）：
   * 实际的值会被编译成哈希化的 CSS 自定义 property，
   * 因此 CSS 本身仍然是静态的。
   * 自定义 property 会通过内联样式的方式应用到组件的根元素上，
   * 并且在源值变更的时候响应式地更新。
  */
  font-size: v-bind('`${state.fontSize}px`');
  color: v-bind('state.color');
}
</style>
