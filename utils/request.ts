import axios from 'axios';
// import { getCache } from '@/utils/cache'
// import {TOKEN_KEY} from '@/enums/cacheEnum'
import { useUserStoreWithOut } from '@/store/modules/user';
import { message } from 'ant-design-vue';
import i18n from '@/locales/index';
import router from '@/router';
import { FULL_RESPONSE } from './serverEnum';

let userStore = null;
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    withCredentials: true, // 允许携带cookie
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config): any => {
        if (userStore === null) {
            userStore = useUserStoreWithOut();
        }
        const token = userStore.getToken;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        userStore.setLoading(true);
        // if (config.method == "get") {
        //   console.log('sdsd', config.method)
        //   config.paramsSerializer = function(params) {
        //     return Qs.stringify(params, {arrayFormat: 'repeat'})
        //   }
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        userStore.setLoading(true);
        return Promise.reject(error);
    },
) as any;

const responseWhitelist = ['/api/file/upload'];

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;

        const exist = responseWhitelist.some((a) =>
            a.includes(response.config.url),
        );

        if (res.code && res.code !== 200) {
            // `token` 过期或者账号已在别处登录
            userStore.setLoading(false);
            if (res.code === 401 || res.code === '401') {
                message.destroy();
                message.warning(i18n.global.t('401'));
                router.push('/login');
            } else {
                message.destroy();
                message.error(res.message || i18n.global.t(res.code));
                return Promise.reject(res);
            }
            return exist ? res : res?.data || res;
            // return Promise.reject(service.interceptors.response);
        } else {
            userStore.setLoading(false);

            if (response?.config?.headers[FULL_RESPONSE]) {
                return response;
            }
            return exist ? res : res?.data || res;
        }
    },
    (error) => {
        // 对响应错误做点什么
        if (error) {
            const code = error.response;

            if (code) {
                const { status, data, message: msg } = code;
                message.destroy();
                message.error(data?.message);
                const codeArr = [400, 401, 403, 404, 413, 422, 502, 500];
                if (codeArr.includes(status)) {
                    message.destroy();
                    message.error(i18n.global.t(msg || status.toString()));
                    if (status == 401) router.push('/login');
                } else {
                    message.destroy();
                    message.error(data?.message);
                }
            } else {
                message.destroy();
                message.error(i18n.global.t('networkError'));
            }
            userStore.setLoading(false);
        }
        userStore.setLoading(false);
        return Promise.reject(error);
    },
);

// 导出 axios 实例
export default service as any;
