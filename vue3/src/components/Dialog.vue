<template>
    <Teleport v-if="open" to="body">
        <dialog class="CustomDialog" @keydown="(event) => handleEsc(event)">
            <slot />
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
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
    position: fixed;
    z-index: 99999999999 !important;
    width: 100%;
    height: 100%;
    transform: translate(0, -100%);
    cursor: pointer;
    @include hor-ver-align-grid();
    display: flex;
    animation: scale-up-center-open 0.1s ease-in both;
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
