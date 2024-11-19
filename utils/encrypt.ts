import CryptoJS from 'crypto-js';
/**
 *
 * @param data
 * @returns {*}
 */
export function AES_ECB_ENCRYPT(data: string, secretKey: string) {
    if (!data) return null;
    const newKey = processKey(secretKey);
    const key = CryptoJS.enc.Utf8.parse(newKey);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
}

/**
 * 解密
 * @param data
 * @returns {*}
 */
export function AES_ECB_DECRYPT(data: string, secretKey: string) {
    if (!data) return null;
    const newKey = processKey(secretKey);
    const key = CryptoJS.enc.Utf8.parse(newKey);
    const decrypt = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

function processKey(secretKey: string) {
    let newKey = '';
    if (secretKey.length > 16) {
        newKey = secretKey.slice(0, 16);
    }
    if (secretKey.length == 16) {
        newKey = secretKey;
    }
    if (secretKey.length < 16) {
        newKey = secretKey;
        newKey = newKey.padEnd(16, '0');
    }
    return newKey;
}

/**
 * 封装的加密方法
 * @param password - 密码
 * @param email - 邮箱
 * @param secretKey - AES 加密密钥
 * @returns AES 加密后的数据
 */
export const encryptData = (password: string, email: string): string => {
    // utf-8 转换
    let message = CryptoJS.enc.Utf8.parse(password);
    let secret_key = CryptoJS.enc.Utf8.parse(processString(email));
    let iv = CryptoJS.enc.Utf8.parse('0000000000000000');
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(message, secret_key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return ciphertext.toString();
};

const processString = (input: string): string => {
    if (input.length < 24) {
        // 补足 0 到 24 个字符
        return input.padEnd(24, '0');
    } else {
        // 截取前 24 个字符
        return input.substring(0, 24);
    }
};
