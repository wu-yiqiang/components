import dayjs from 'dayjs';


// 获取列表数据
export const getLists = async (
    getList: Function,
    params: any | null = null,
    callback: Function | null = null,
) => {
    const data = await getList(params);
    const values = Array.isArray(data)
        ? data
        : data?.content
        ? data?.content
        : [];
    if (callback) {
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                const item = values[key];
                callback(item);
            }
        }
    }
    return values;
};

export const flatten = (arr) => {
    return arr.reduce((result, item) => {
        return result.concat(
            item,
            Array.isArray(item.children) ? flatten(item.children) : [],
        );
    }, []);
};

// 寻找节点下的子目录
export function getTreeItem(tree: any[], nameId: string): any {
    for (const node of tree) {
        if (node.meta.nameId === nameId) {
            return node;
        }
        if (node.children && node.children.length > 0) {
            const foundNode = getTreeItem(node.children, nameId);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}

export const showCurrentLang = (
    item: any,
    cn: boolean,
    en: boolean,
    ar: boolean,
) => {
    if (isEmpty(item)) return '';
    if (cn) return item.nameZh;
    if (en) return item.nameEn;
    if (ar) {
        if (item.nameAr) {
            return item.nameAr;
        } else {
            return item.nameEn;
        }
    }
};

// 数组对象去重
export const uniqueListObj = (arr: [], attr: any) => {
    const hash = {};
    return arr.reduce((accum, item) => {
        hash[item[attr]] ? '' : (hash[item[attr]] = true && accum.push(item));
        return accum;
    }, []);
};

export const getNodePath = (tree, targetId) => {
    const path = [];
    function traverse(node, id) {
        if (node && Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                const currentId = node[i].title;
                if (currentId === id) {
                    path.unshift(node[i]?.title);
                    return true;
                }
                if (
                    node[i]?.children?.length &&
                    traverse(node[i].children, id)
                ) {
                    path.unshift(node[i]?.title);
                    return true;
                }
            }
        } else if (node && node.title === id) {
            path.unshift(node.title);
            return path;
        }
        return false;
    }
    traverse(tree, targetId);
    return path;
};

export const getNode = (tree, targetId) => {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node && node.title == targetId) return node;
        if (node?.children && node?.children?.length) {
            const data = getNode(node?.children, targetId);
            if (data) return data;
        }
    }
};

// 超出字符个数显示省略号
export const omitCharacters = (strs: string, num = 16) => {
    if (!strs) return strs;
    if (strs.length <= num) return strs;
    const str = strs.substr(0, num) + '...';
    return str;
};

// 随机整数
export const randomInt = (n = 99999999999) => {
    return Math.floor(Math.random() * n) + 1;
};

// 清空对象空值的属性
export const clearNull = (obj) => {
    const newObj = Object.keys(obj)
        .filter((k) => ![null, '', undefined].includes(obj[k]))
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
    return newObj;
};

// 两个数组是否存在交集
export const isExitIntersection = (
    array1: (string | number)[],
    array2: (string | number)[],
) => {
    return array1?.filter((item: any) => array2.includes(item))?.length;
};

export const scrollToTop = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.scrollTo(0, 0);
    }
};

export const calculateTimeDifference = (
    startDate: Date,
    endDate: Date,
    isStr: Boolean = false,
    $t: any,
) => {
    // 将输入字符串转换为 Date 对象
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // 计算时间差（以毫秒为单位）
    const difference = end - start;
    // 将时间差转换为秒、分钟、小时、天等
    const seconds = Math.floor(Math.abs(difference) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // 剩余的秒、分钟、小时
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    let time = '';
    if (!isStr) {
        if (days > 3) {
            time = `${days} ${$t('days')}`;
            // time = `${days} 天 ${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
        } else if (hours > 0) {
            time = `${hours}:${String(remainingMinutes).padStart(2, '0')}`;
        } else {
            time = `${String(remainingMinutes).padStart(2, '0')}:${String(
                remainingSeconds,
            ).padStart(2, '0')}`;
        }
    } else {
        if (days >= 2) {
            time = `${$t('within')} ${days + 1} ${$t('days')}`;
            // time = `${days} 天 ${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
        } else if (hours > 0) {
            time = `${$t('within')} ${hours + 1} ${$t('hours2')}`;
        } else {
            time = `${$t('within')} 1 ${$t('hours2')}`;
        }
    }
    return { time, difference, days, hours };
};

export const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // 月份在 Date 对象中是从 0 开始的，所以需要减 1
};

export const formatDate = (date: Date, hoursMinutes = true) => {
    return date
        ? dayjs(date).format(`DD-MM-YYYY ${hoursMinutes ? 'HH:mm' : ''}`)
        : '';
};
export const formatNumber = (number: Number) => {
    return number.toLocaleString('en-US');
};

export const toLocaleUpperCase = (str: String) => {
    return str.toLocaleUpperCase();
};
