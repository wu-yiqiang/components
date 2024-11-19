<template>
    <!-- <div class="Loading"></div> -->
    <div v-if="spin" class="atom-spinner">
        <div class="spinner-inner">
            <div class="spinner-line spinner-line-o"></div>
            <div class="spinner-line spinner-line-g"></div>
            <div class="spinner-line spinner-line-b"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    spin: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>
<style scoped lang='scss'>
// $--w: 8px;
// .Loading {
//     width: 80px;
//     aspect-ratio: 1 / 1;
//     display: inline-block;
//     // border:$--w solid #f3f3f3;
//     // // border-top: 5px solid red;
//     // border-right: $--w solid #DCCB7F;
//     // border-bottom: $--w solid #413A9E;
//     // border-left: $--w solid #81A74F;
//     background: linear-gradient(#DCCB7F,#413A9E,#81A74F);
//     border-radius: 50%;
//     // mask: radial-gradient(transparent 110px, #000 110px);
//     // animation: loading-360 0.8s infinite linear;
// }

// @keyframes loading-360 {
//     0% {
//         transform: rotate(0deg);
//         /*动画起始的时候旋转了0度*/
//     }

//     100% {
//         transform: rotate(360deg);
//         /*动画结束的时候旋转了360度*/
//     }
// }

// .atom-spinner,
// .atom-spinner * {
//     box-sizing: border-box;
// }

.atom-spinner {
    z-index: 9999999999;
    height: 70px;
    width: 70px;
    overflow: hidden;
    // background-color: rgba(0, 0, 0, 0.4);
    .spinner-inner {
        position: relative;
        display: block;
        height: 100%;
        width: 100%;

        .spinner-line {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border-left-width: calc(100px / 25);
            border-top-width: calc(100px / 25);
            border-left-style: solid;
            border-top-style: solid;
            border-top-color: transparent;
        }

        .spinner-line-b {
            border-left-color: #413A9E;
        }

        .spinner-line-o {
            border-left-color: #DCCB7F;
        }

        .spinner-line-g {
            border-left-color: #81A74F;
        }

        .spinner-line:nth-child(1) {
            animation: atom-spinner-animation-1 1s linear infinite;
            transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
        }

        .spinner-line:nth-child(2) {
            animation: atom-spinner-animation-2 1s linear infinite;
            transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
        }

        .spinner-line:nth-child(3) {
            animation: atom-spinner-animation-3 1s linear infinite;
            transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
        }
    }
}



@keyframes atom-spinner-animation-1 {
    100% {
        transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
    }
}

@keyframes atom-spinner-animation-2 {
    100% {
        transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
    }
}

@keyframes atom-spinner-animation-3 {
    100% {
        transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
    }
}
</style>