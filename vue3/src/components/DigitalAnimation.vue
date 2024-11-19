<template>
    <span class="DigAnimation">
        {{ formatNumber(currentVal) }}
    </span>
</template>

<script setup lang="ts">
import { formatNumber } from '@/utils/index'
const props = defineProps({
    end: {
        required: true,
        type: Number,
        default: 0,
    },
    duration: {
        required: false,
        type: Number,
        default: 2000, // （单位：毫秒）
    },
    start: {
        required: false,
        type: Number,
        default: 0,
    },
});
let currentVal = ref(0)
const DigAnimation = () => {
    const target = props.end ?? 0
    if (!target) {
        currentVal.value = Number(target);
        return;
    }
    currentVal.value = 0;
    const upDateNumber = () => {
        // 获取当前div的数值
        const d = Number(currentVal.value);
        // 设置数据增加的值，可以通过target除的数值确定怎么加数值的快慢
        const increment = target / 200;
        // 当数字小于最大值时，执行下面的操作
        if (d < target) {
            // 向上取整
            currentVal.value = Number(`${Math.ceil(d + increment)}`);
            // 1ms重新调用，不然它会在第一次运行完就结束
            setTimeout(upDateNumber, 1);
        } else {
            currentVal.value = Number(target);
        }
    };
    upDateNumber();
};
watch(
    () => props?.end,
    (newVal, oldValue) => {
        DigAnimation();
    },
    { immediate: true, deep: true },
);
</script>

<style scoped lang="scss">
.DigAnimation {}
</style>