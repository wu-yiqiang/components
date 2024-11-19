const tokenKey = 'as67A&%6C9^YUas1&';
import { AES_ECB_ENCRYPT, AES_ECB_DECRYPT } from '@/utils/encrypt';
import { TOKEN_KEY } from '@/enums/cacheEnum';
const noEncryptKey = [TOKEN_KEY];
export const setCache = (key: string, value: any) => {
    if (noEncryptKey.includes(key)) {
        // tokenKey = value
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        const valueStr = JSON.stringify(value);
        const newvalue = AES_ECB_ENCRYPT(valueStr, tokenKey);
        localStorage.setItem(key, newvalue);
    }
};

export const getCache = (key: string) => {
    if (noEncryptKey.includes(key)) {
        const data: any = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } else {
        const data: any = localStorage.getItem(key);
        if (data) {
            const newData = AES_ECB_DECRYPT(data, tokenKey);
            return newData ? JSON.parse(newData) : newData;
        }
        return null;
    }
};

export const removeCache = (key: string) => {
    localStorage.removeItem(key);
};
