export function typeJudge(data: any, value?: string) {
  const res = Object.prototype.toString.call(data);
  const type = res.replace(/object|\[|\]/g, '').trim();
  if (value === undefined) {
    return type;
  } else {
    return value === type;
  }
}
