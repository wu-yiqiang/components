<template>
    <svg
        :class="svgClass"
        v-bind="$attrs"
        :style="{ color: color, fontSize: size }"
    >
        <use :xlink:href="iconName" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#fff',
    },
    size: {
        type: String,
        default: '',
    },
});
const iconName = computed(() => {
    return `#icon-${props.name}`;
});
const svgClass = computed(() =>
    props.name ? `svg-icon icon-${props.name}` : 't-svg-icon',
);
</script>

<style scoped lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    background-color: unset;
    color: unset;
    vertical-align: baseline;
}
</style>
