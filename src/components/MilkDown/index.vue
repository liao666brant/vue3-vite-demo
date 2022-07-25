<template>
  <VueEditor :editor="editor" />
</template>

<script lang="ts">
import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
} from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { useEditor, VueEditor } from '@milkdown/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MilkDown',
  components: {
    VueEditor,
  },
  props: {
    modelValue: {
      type: String,
      default: '# Hello milkdown',
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit: emits }) {
    const editable = () => !props.readonly;

    const editor = useEditor((root) =>
      Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, props.modelValue);
          ctx.set(editorViewOptionsCtx, { editable });
          ctx
            .get(listenerCtx)
            // .markdownUpdated((ctx, markdown, prevMarkdown) => {
            .markdownUpdated((ctx, markdown) => {
              emits('update:modelValue', markdown);
            });
        })
        .use(listener)
        .use(nord)
        .use(commonmark)
    );
    return {
      defaultValueCtx,
      Editor,
      editorViewOptionsCtx,
      rootCtx,
      nord,
      VueEditor,
      useEditor,
      commonmark,
      listener,
      listenerCtx,
      props,
      emits,
      editable,
      editor,
    };
  },
});
</script>
