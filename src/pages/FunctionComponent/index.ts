import { h, render } from 'vue';

import Component from './funCmp.vue';

export function funComponent() {
  const VNode = h(Component);
  const container = document.createElement('div');
  // document.body.appendChild(container);
  render(VNode, container);
}
