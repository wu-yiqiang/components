<template>
    <section class="According">
        <div class="header">
            <div class="left-box">
                <div class="title" @click="handleDirection">
                    <UpOutlined v-if="!isUp" />
                    <DownOutlined v-else />
                    <template v-if="$slots.title">
                        <slot name="title" />
                    </template>
                    <template v-else>
                        {{ title }}
                    </template>
                </div>
            </div>
            <div v-if="$slots.tools" class="right-box">
                <slot name="tools" />
            </div>
        </div>
        <div :class="[!isUp ? 'contents' : 'content']">
            <slot name="contents" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['active']);
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
let isUp = ref(false);
const handleDirection = () => {
    isUp.value = !isUp.value;
    emit('active');
};
</script>
<style scoped lang="scss">
.According {
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid #eaebf0;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 4px;
        background-color: #eaebf0;
        cursor: pointer;
        .left-box .right-box {
            display: flex;
            row-gap: 10px;
        }
        .title {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 600;
            line-height: 14.52px;
            text-align: left;
            background-color: #eaebf0;
            padding: 0 6px;
            color: #66809e;
            border-radius: 3px 3px 0 0;
            cursor: pointer;
            column-gap: 6px;
        }
    }

    .contents {
        padding: 14px;
        background-color: #fff;
        transition: all 0.5s ease;
        max-height: fit-content;
        border-radius: 0 0 3px 3px;
    }
    .content {
        height: 0;
        overflow: hidden;
        transition: all 0.5s ease;
    }
}
</style>
