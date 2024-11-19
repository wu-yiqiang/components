import {
    GetOptions,
    PostQueryListByType,
    PostQueryListStrByType,
} from '@/api/cases';
import { getCache, setCache } from './cache';
import { isArlang } from '@/hooks/index';

const SYSTEM_ENUM = 'EHSE-SYSTEM_ENUM';
const systemEnumList: any = ref(getCache(SYSTEM_ENUM) || {});

export const clearSystemEnumList = () => {
    systemEnumList.value = {};
};
export const getServerEnum = (
    keys: Array<string> | string,
    type: string | Function = 'queryListByType',
    cd?: Function,
): Promise<any> => {
    return new Promise(async (resolve) => {
        const enumTypeList = Array.isArray(keys) ? keys : [keys];
        const requestKeys: Array<string> = [];
        enumTypeList.forEach((key) => {
            if (!systemEnumList.value[key]?.length) {
                requestKeys.push(key);
            }
        });

        if (requestKeys.length) {
            let data = {};
            if (type === 'queryListByType') {
                data = await PostQueryListByType(requestKeys);
            }
            if (type === 'queryListStrByType') {
                data = await PostQueryListStrByType(requestKeys);
            }
            if (typeof type === 'function') {
                const res = await type();
                const list = res?.data || res;
                data = {
                    [Array.isArray(keys) ? keys[0] : keys]: cd?.(list) || list,
                };
            }
            if (type === 'getLovList') {
                const ress = await Promise.all(
                    requestKeys.map((key) => GetOptions(key)),
                );
                console.log(ress);
                ress?.forEach((res, index) => {
                    data[requestKeys[index]] = res || [];
                });
            }

            Object.keys(data).forEach((key) => {
                systemEnumList.value[key] = data[key];
            });
        }
        setCache(SYSTEM_ENUM, systemEnumList.value);
        resolve(
            !Array.isArray(keys)
                ? systemEnumList.value[keys]
                : systemEnumList.value,
        );
    });
};

export const getEnumLabel = (
    key: string,
    value: string,
    shortTitle = false,
) => {
    if(!value)return ''
    if (systemEnumList.value[key]) {
        const item = systemEnumList.value[key].find(
            (item: any) => item.code == value || item.id == value,
        );
        // console.log(systemEnumList.value[key],item,value,key)
        return item
            ? shortTitle
                ? item.shortTitle
                : isArlang.value
                ? item.entityValueAr || item.eventTitleAr
                : item.entityValueEn || item.eventTitleEn
            : '-';
    }
};

export const getEnumStyle = (key: string, value: string) => {
    if (!value) return;
    if (systemEnumList.value[key]) {
        const item = systemEnumList.value[key].find(
            (item: any) => item.code === value || item.id === value,
        );
        return item && item.color
            ? { color: item.color, backgroundColor: item.backgroundColor }
            : {};
    }
};

export const INVESTIGATE_TYPE = 'INVESTIGATE_TYPE';
export const INVESTIGATE_LEVEL = 'INVESTIGATE_LEVEL';
export const INVESTIGATE_METHOD = 'INVESTIGATE_METHOD';
export const EVIDENCE_TYPE = 'EVIDENCE_TYPE';
export const ACTION_PRIORITY = 'ACTION_PRIORITY';
export const ACTION_TYPE = 'ACTION_TYPE';
export const CASE_STATUS = 'CASE_STATUS';
export const VIOLATION = 'VIOLATION';
export const CASE_EVENT_TYPE = 'CASE_EVENT_TYPE';
export const DEPARTMENT_LISTS = 'DEPARTMENT_LISTS';
export const LIGHT_LISTS = 'LIGHT_LISTS';
export const WEATHER = 'WEATHER';
export enum FilesContentTypesEnum {
    Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    Doc = 'application/octet-stream',
    PDF = 'application/pdf',
}
export const FULL_RESPONSE = 'X-Custom-Full-Response';
