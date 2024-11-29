// 阶乘
const factorial = (n: number) => n <= 1 ? 1 : n * factorial(n - 1);

// 斐波那契数组生成器
const fibonacci = (n: number) =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);