import axios from 'axios';

const service = axios.create({
    baseURL: './',
    timeout: 50000,
    withCredentials: true, // 允许携带cookie
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config: Object): any => {
        // if (userStore === null) {
        //     userStore = useUserStoreWithOut();
        // }
        // const token = userStore.getToken;
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        // userStore.setLoading(true);
        // if (config.method == "get") {
        //   console.log('sdsd', config.method)
        //   config.paramsSerializer = function(params) {
        //     return Qs.stringify(params, {arrayFormat: 'repeat'})
        //   }
        // }
        return config;
    },
    (error: Error) => {
        return Promise.reject(error);
    },
) as any;

const responseWhitelist = ['/api/file/upload'];

// 添加响应拦截器
service.interceptors.response.use(
    (response: Object) => {
        const res = response?.data;
        if (res?.code && res.code !== 200) {
            return res?.data || res;
        }
        return Promise.reject(res)
    },
    (error: Error) => {
        // 对响应错误做点什么
        if (error) {
            const code = error?.response;
            if (code) {
                const { status, data, message: msg } = code;
                const codeArr = [400, 401, 403, 404, 413, 422, 502, 500];
                if (codeArr.includes(status)) {
                    if (status == 401) return
                }
            }        }
        return Promise.reject(error);
    },
);

// 导出 axios 实例
export default service as any;
