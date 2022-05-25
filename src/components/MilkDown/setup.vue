<template>
  <VueEditor :editor="editor" />
</template>

<script setup lang="ts">
import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
} from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { useEditor,VueEditor } from '@milkdown/vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '# Hello milkdown',
  },
  readonly: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['update:modelValue']);

const editable = () => !props.readonly;
const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, props.modelValue);
      ctx.set(editorViewOptionsCtx, { editable });
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
        emits('update:modelValue', markdown);
      });
    })
    .use(listener)
    .use(nord)
    .use(commonmark)
);
</script>
