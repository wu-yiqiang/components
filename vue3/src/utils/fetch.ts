// 封装的Fetch请求函数
const Fetch = (url: string, method = 'GET',params: object| null = null, data = null, headers = {}) => {
  const options = {
    method,
    ...{body: data ? JSON.stringify(data) : null},
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (params) url +=
    url +
    '?' +
    Object.entries(params)
      .reduce(
        (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
        Object.keys(params).length ? '?' : '',
      )
      .replace(/&$/, '')
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
};
