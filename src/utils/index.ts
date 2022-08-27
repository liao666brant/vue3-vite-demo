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

const updateObject = <T extends Object>(target: T, source: T, valid: boolean) => {
  for (const key in target) {
    if (key in source) {
      // if (mode === 'truth' && (source[key] ?? true)) continue;

      if (valid && [undefined, null].some((value) => source[key] === value)) continue;
      target[key] = source[key];
    }
  }
};

import { request } from './request';
export { request, updateObject };
