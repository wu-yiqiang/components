<template>
    <Teleport v-if="open" to="body">
        <dialog class="CustomDialog" @keydown="(event) => handleEsc(event)">
            <div v-if="closable" class="close" @click="open = false">
                <SvgIcon name="off" size="20px" />
            </div>
            <div class="contents">
                <slot />
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
const emit = defineEmits(['update:visible']);
const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
        default: false,
    },
    closable: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const open = computed({
    get() {
        return props.visible;
    },
    set(value) {
        emit('update:visible', value);
    },
});
const handleEsc = (e: Event) => {
    if (e?.keyCode == 27) open.value = false;
};
</script>
<style scoped lang="scss">
.CustomDialog {
    position: sticky;
    width: 100%;
    height: 100%;
    cursor: pointer;
    @include hor-ver-align-grid();
    display: flex;
    animation: scale-up-center-open 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)
        both;
    .close {
        position: fixed;
        right: 36px;
        top: 20px;
        z-index: 9999999;
        width: 48px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: rgba(19, 18, 17, 0.7);
        @include hor-ver-align-grid();

        &:hover {
            background-color: rgba(19, 18, 17, 1);
        }
    }

    .contents {
        flex: 1;
        @include hor-ver-align-grid();
    }
}

@keyframes scale-up-center-open {
    0% {
        transform: translate(0, -100%) scale(0);
        background-color: rgba(255, 255, 255, 1);
    }

    100% {
        transform: translate(0, -100%) scale(1);
        background-color: rgba(102, 128, 158, 0.7);
    }
}
</style>
