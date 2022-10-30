<template>
  <canvas id="canvas" ref="$canvas" width="600" height="600"></canvas>
  <br />

  <button @click="test">1</button>

  <el-button type="primary" size="default" @click="exportCanvas(theCanvas as fabric.Canvas)">
    导出图片
  </el-button>

  <el-button type="primary" @click="preFn">pre</el-button>
  <!-- <el-button type="primary" size="default" @click="saveFn">保存操作</el-button> -->

  <!-- <button>next</button> -->
</template>

<script setup lang="ts">
import { fabric } from 'fabric';
import { onMounted, ref } from 'vue';

const $canvas = ref<HTMLCanvasElement>();
const theCanvas = ref<fabric.Canvas | null>(null);

const history: any[] = [];

const test = () => {
  return false;
};

/**
 * 导出 canvas 图片
 * @param canvas
 */
function exportCanvas(canvas: fabric.Canvas) {
  const dataURL = canvas.toDataURL({ format: 'png' });
  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const initCanvas = () => {
  if (!$canvas.value) return;
  const canvas = new fabric.Canvas($canvas.value);
  theCanvas.value = canvas;
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 200,
    height: 200,
  });
  const circle = new fabric.Circle({
    radius: 20,
    fill: 'red',
    left: 0,
    top: 0,
  });

  canvas.add(rect, circle);

  canvas.on('object:modified', function (e) {
    console.log('[ e ] 🚀, ', e);
    history.push(e);
  });

  // rect.fill = 'green';
  // rect.set('fill', 'green');
  rect.set({
    fill: 'green',
    width: 222,
    height: 100,
    stroke: 'red',
    strokeWidth: 5,
  });
};

const preFn = () => {
  // theCanvas.value?.
  const tail = history[history.length - 1];
  tail;
};

onMounted(() => {
  initCanvas();
});
</script>

<style scoped lang="scss">
#canvas {
  border: 1px solid #cccccc;
}
</style>
