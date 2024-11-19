import i18n from '@/locales/index';
import { validateInfos } from 'ant-design-vue/es/form/useForm';

export function isStrongPassword(password: string) {
    const reg =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~_@^!&#$%\*-\+=:,\\?\[\]\{}]).{8,16}$/;
    return reg.test(password);
}

export function isEmail(email: string) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}

export function isUnInt(value: string) {
    const reg = /^\+?[1-9][0-9]*$/;
    return reg.test(value);
}

export function isArray(arg: []) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return Array.isArray(arg);
}

// 表单自定义校验方法
export function isStrongPasswordForm(
    rule: any,
    password: string,
    callback: Function,
) {
    if (!password) {
        return callback(new Error(i18n.global.t('passwordIsRequired')));
    }
    if (!isStrongPassword(password)) {
        callback(new Error(i18n.global.t('passwordValidation')));
        return;
    }
    return callback();
}

export function isStrongPasswordFormButNotRequired(
    rule: any,
    password: string,
    callback: Function,
) {
    if (!password) {
        return callback();
    }
    if (!isStrongPassword(password)) {
        callback(new Error(i18n.global.t('passwordValidation')));
        return;
    }
    return callback();
}

export function isEmailForm(rule: any, email: any, callback: Function) {
    if (!email) {
        return callback(new Error(i18n.global.t('emailAddressIsRequired')));
    }
    if (!isEmail(email)) {
        callback(new Error(i18n.global.t('emailValidation')));
        return;
    }
    return callback();
}

/**
 * 判断中国、阿拉伯、美国、英国手机号
 * @param phone 电话
 * @returns
 */
export function isPhone(rule: any, value: any, callback: Function) {
    const reg = /^((\+|00)86)?1[3-9]\d{9}$/;
    if (!reg.test(value)) {
        callback(new Error(i18n.global.t('phoneNumberValidation')));
        return;
    } else if (!value) {
        callback(new Error(i18n.global.t('号码必填')));
    }
    return callback();
}

export function validateInfoToBool(infos: validateInfos) {
    if (infos) {
        return Object.values(infos)?.every(
            (element) => element?.validateStatus == 'success',
        );
    } else {
        return false;
    }
}
