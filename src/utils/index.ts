export function typeJudge(data: any, value?: string) {
  const res = Object.prototype.toString.call(data);
  const type = res.replace(/object|\[|\]/g, '').trim();
  if (value === undefined) {
    return type;
  } else {
    return value === type;
  }
}

export const setCssAttr = (key: string, value: string) => {
  if (typeof value === 'string' && typeof value === 'string') {
    window.document.documentElement.setAttribute(key, value);
  }
};

import { request } from './request';
export { request };
