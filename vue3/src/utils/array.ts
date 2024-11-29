// 取数组平均值
const average = (arr: []) => arr.reduce((acc: number, val: number) => acc + val, 0) / arr.length;

// 计数数组中值的出现次数
const countOccurrences = (arr: [], value: never) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

// 数组降维
const deepFlatten = (arr: any) => arr.reduce((a:[], v: never) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);

// 数组之间的区别
const difference = (a:[], b: []) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
// 两点之间的距离
const distance = (x0: number, y0: number, x1: number, y1: number) => Math.hypot(x1 - x0, y1 - y0);