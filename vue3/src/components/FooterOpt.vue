<template>
    <section class="FooterBar">
        <div class="opt-left">
            <a-button
                v-if="isClose"
                type="primary"
                ghost
                @click="handleClose"
                :disabled="disabled"
            >
                <LeftOutlined />
                {{ closeTitle }}
            </a-button>
            <slot name="left" />
        </div>
        <div class="opt-right">
            <slot name="right" />
            <a-button
                v-if="isOk"
                type="primary"
                :loading="loading"
                :disabled="disabled"
                @click="handleOk"
                >{{ okTitle }}
            </a-button>
        </div>
    </section>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'ok']);
const props = defineProps({
    loading: {
        required: false,
        type: Boolean,
        default: false,
    },
    isClose: {
        required: false,
        type: Boolean,
        default: true,
    },
    closeTitle: {
        required: false,
        type: String,
        default: '',
    },
    isOk: {
        required: false,
        type: Boolean,
        default: true,
    },
    okTitle: {
        required: false,
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
const handleClose = () => {
    emit('close');
};
const handleOk = debounce(() => {
    emit('ok');
});
</script>
<style scoped lang="scss">
.FooterBar {
    $margin: 14px;
    display: flex;
    justify-content: space-between;
    margin-top: $margin;

    .disabled {
        border: none;
    }

    .opt-left {
        display: flex;
        column-gap: 10px;
        align-items: center;
    }
    .opt-right {
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    @include mobile() {
        margin-block-end: $margin;
    }
}
</style>
