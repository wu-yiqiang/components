<template>
    <transition name="fade">
        <div class="Toast" :style="MESSAGE_STYLE[props.type]" v-if="isShow">
            <span class="text">{{ props.text }}</span>
            <div v-if="!duration" class="icon" @click="handleClose">
                <SvgIcon name="closure" size="18px" />
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
const isShow = ref<boolean>(false)
const props = defineProps({
    // 消息文本
    text: {
        type: String,
        default: ""
    },
    // 消息类型： "info" | "success" | "warn" | "error"
    type: {
        type: String,
        default: "warn"
    },
    // 消息停留时间：0 表示需要手动关闭
    duration: {
        type: Number,
        default: 2000
    }
})
type MessageStyle = {
    icon: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
};

type MessageStyleKeys = "info" | "success" | "warn" | "error"; // 支持的类型

interface IMessageStyle {
    [index in MessageStyleKeys]: MessageStyle;
    [index: string]: MessageStyle;
}
const MESSAGE_STYLE: IMessageStyle = {
    warn: {
        icon: "icon-warn-fill",
        color: "#FFFFFF",
        backgroundColor: "#FF7A00",
        borderColor: "#FF7A00",
    },
    error: {
        icon: "icon-error-fill",
        color: "#FFFFFF",
        backgroundColor: "#CB0000",
        borderColor: "#CB0000",
    },
    success: {
        icon: "icon-success-fill",
        color: "#FFFFFF",
        backgroundColor: "#27682C",
        borderColor: "#27682C",
    },
    info: {
        icon: "icon-info-fill",
        color: "#FFFFFF",
        backgroundColor: "#165DFF",
        borderColor: "#165DFF",
    },
};

const handleClose = () => {
    isShow.value = false
}

onMounted(() => {
    isShow.value = true
    console.log('duration', props?.duration);
    if (props.duration) {
        setTimeout(() => {
            handleClose()
        }, props.duration)
    }

})
</script>

<style scoped lang="scss">
.fade-enter-active {
    animation: fade .5s;
}

.fade-leave-active {
    animation: fade .5s reverse;
}

/* 定义帧动画 */
@keyframes fade {
    0% {
        opacity: 0;
        transform: translate(-50%,-50px);
    }

    100% {
        opacity: 1;
    }
}

.Toast {
    min-width: 300px;
    // max-width: 560px;
    padding: 8px 14px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    .text {
        flex: 1;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        @include text-elipsis();
        @include hor-ver-align-grid();
    }
    .icon {
        @include hor-align();
        cursor: pointer;
    }
}
</style>
