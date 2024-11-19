<template>
    <section class="ItforceSteps">
        <div
            v-if="type == 1"
            v-for="(item, index) in items"
            :key="index"
            :class="[
                index + 1 < currentStep
                    ? 'done item'
                    : index + 1 == currentStep
                      ? 'current item'
                      : 'item',
            ]"
        >
            <span v-if="index" class="line"></span>
            <span v-if="index + 1 >= currentStep" class="indicator">{{
                index + 1
            }}</span>
            <span v-else class="indicator done">
                <CheckOutlined />
            </span>
            <span class="title">{{ item }}</span>
        </div>
        <div v-if="type == 2" class="type2">
            <div
                v-if="isArlang"
                v-for="(item, index) in items"
                :key="index"
                :class="[
                    index + 1 <= currentStep ? 'done-item' : '',
                    index == 0
                        ? 'ar-start-step-item done-item'
                        : 'ar-end-step-item',
                    'step-item ar-offset',
                ]"
            >
                {{ item }}
            </div>
            <div
                v-else
                v-for="(item, k) in items"
                :key="k"
                :class="[
                    k + 1 <= currentStep ? 'done-item' : '',
                    k == 0 ? 'start-step-item done-item' : 'end-step-item',
                    'step-item offset',
                ]"
            >
                {{ item }}
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { isArlang, isEnlang, isCnlang } from '@/hooks/index';
import { CheckOutlined } from '@ant-design/icons-vue';
const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => [],
    },
    type: {
        type: Number,
        required: false,
        default: 1,
    },
    currentStep: {
        type: Number,
        required: true,
        default: 1,
    },
});
</script>
<style scoped lang="scss">
$--active-color: var(--color-primary);

@mixin active-status {
    color: $--active-color;
    .line {
        background: repeating-linear-gradient(
            to right,
            $--active-color,
            $--active-color 2px,
            transparent 2px,
            transparent 4px
        );
    }

    .indicator {
        background-color: rgba(255, 122, 0, 0.1);
    }
}

.ItforceSteps {
    display: flex;
    justify-content: center;
    column-gap: 8px;
    // margin: 10px 0;
    padding: 10px 0;
    height: $--steps-height;
    $title-padding: 8px;

    .item {
        display: flex;
        align-items: center;
        color: rgba(102, 128, 158, 1);
        column-gap: 3px;

        .line {
            background: repeating-linear-gradient(
                to right,
                rgba(102, 128, 158, 0.5),
                rgba(102, 128, 158, 0.5) 2px,
                transparent 2px,
                transparent 4px
            );
            height: 1px;
            width: 60px;
            // margin: 0 6px;
        }

        .indicator {
            width: 28px;
            height: 28px;
            background: rgba(102, 128, 158, 0.1);
            font-size: 12px;
            font-weight: 500;
            display: grid;
            place-content: center;
            border-radius: 4px;
            // margin-right: 10px;
        }

        .title {
            font-size: 12px;
            font-weight: 600;
            padding: $title-padding 0;
        }
    }

    .done {
        @include active-status();
    }

    .current {
        @include active-status();

        .title {
            border-bottom: 2px solid $--active-color;
        }
    }

    .type2 {
        display: flex;
        align-items: center;

        .step-item {
            width: 235px;
            height: 30px;
            background-color: #dae0e6;
            color: #fff;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: 700;
        }

        .start-step-item {
            clip-path: polygon(0 0, 92% 0%, 100% 50%, 92% 100%, 0% 100%);
        }

        .end-step-item {
            clip-path: polygon(
                92% 0%,
                100% 50%,
                92% 100%,
                0% 100%,
                8% 50%,
                0% 0%
            );
        }

        .offset {
            margin-right: -10px;
        }
        .ar-offset {
            margin-left: -10px;
        }

        .done-item {
            background-color: #ff7a00;
        }

        .ar-start-step-item {
            clip-path: polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 50%);
        }

        .ar-end-step-item {
            clip-path: polygon(
                100% 0%,
                92% 50%,
                100% 100%,
                8% 100%,
                0% 50%,
                8% 0%
            );
        }
    }

    @include mobile() {
        padding: $title-padding 0px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 4px;

        .title {
            display: none;
        }

        .step-item,
        .line {
            width: 3rem !important;
        }
    }
}
</style>
