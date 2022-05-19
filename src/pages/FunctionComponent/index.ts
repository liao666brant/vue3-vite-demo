import Component from './index.vue';
import { h, render } from 'vue';

export function funComponent() {
  const VNode = h(Component);
  const container = document.createElement('div');
  // document.body.appendChild(container);
  render(VNode, container);
}
