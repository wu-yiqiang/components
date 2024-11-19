import { PostMfaLogin } from '@/api/login';
import { useUserStore } from '@/store/modules/user';

export const getSSoCode = () => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    return code;
};

export const handleMfalogin = async (code) => {
    try {
        const userStore = useUserStore();

        const data = await PostMfaLogin({ code });
        userStore.setUserLoginInfo(data);
        const path = userStore.getHome();
        return Promise.resolve(path);
    } catch (err) {
        console.log('error', err);
        return Promise.reject(err);
    }
};

export const clearLocationCode = () => {
    location.search = ''
};
