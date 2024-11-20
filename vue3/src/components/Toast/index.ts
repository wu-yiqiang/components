import { createVNode, render } from 'vue';
import Toast from './index.vue';

const div = document.createElement('div');
const MESSAGE_TIMEOUT = 2000;
// 添加到body上
document.body.appendChild(div);

// 定时器标识
let timer: any = null;

const renderMessage = (vnode: any, duration: number) => {
    render(null, div); // 清空上一个虚拟dom
    render(vnode, div);
    clearTimeout(timer); // 清理上一个定时器
    if (duration) {
        console.log('sssssss')
        timer = setTimeout(() => {
            render(null, div);
        }, duration);
    }
};

// 根据不同的调用创建虚拟dom
export default {
    error: (text: string, duration: number = MESSAGE_TIMEOUT) => {
        const vnode = createVNode(Toast, { type: 'error', text, duration })
        renderMessage(vnode, duration);
    },
    warn: (text: string, duration: number = MESSAGE_TIMEOUT) => {
        const vnode = createVNode(Toast, { type: 'warn', text, duration })
        renderMessage(vnode, duration);
    },
    success: (text: string, duration: number = MESSAGE_TIMEOUT) => {
        const vnode = createVNode(Toast, { type: 'success', text, duration })
        renderMessage(vnode, duration);
    },
    info: (text: string, duration: number = MESSAGE_TIMEOUT) => {
        const vnode = createVNode(Toast, { type: 'info', text, duration })
        renderMessage(vnode, duration);
    },
}
