// 排列
const anagrams = (str: string): object => {

  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];

  return str.split('').reduce((acc, letter, i) =>

    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map((val: string) => letter + val)), []);

};

// 大写每个单词首字母
const capitalizeEveryWord = (str: string) => str.replace(/\b[a-z]/g, (char: string) => char.toUpperCase());

// 首字母大写
const capitalize = (str: string, lowerRest = false) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));

// 是否是回文字符串
const palindrome = (str: string) => {

  const s = str.toLowerCase().replace(/[\W_]/g,'');

  return s === s.split('').reverse().join('');

}

// 转义特殊字符
const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
