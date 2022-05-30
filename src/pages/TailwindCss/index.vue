<template>
  <div
    class="w-1/3 h-28 text-center m-auto my-3 bg-slate-300 shadow-lg rounded"
  >
    Hello world!
  </div>

  <!-- <a
    class="inline-block bg-red-400 px-4 py-1 text-center rounded hover:bg-slate-500"
  >
    超链接
  </a> -->

  <button class="btn">点击</button>
  <button class="btn">点击1</button>
  <button class="btn">点击2</button>
  <button class="btn">点击3</button>
  <button class="btn">点击4</button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.btn {
  @apply py-2 p-4 rounded bg-red-400 text-center hover:bg-slate-500 mx-1;
}
</style>
