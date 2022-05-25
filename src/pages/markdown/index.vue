<template>
  <br />
  <br />
  <br />
  <br />
  <MdEditor v-model="content" class="md-editor" :readonly="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MdEditor from '@/components/MilkDown/index.vue';

const content = ref('# Hello milkdown everybody');
</script>

<style scoped lang="scss">
.md-editor {
  margin: 0 auto;
  width: 500px;
}
</style>
