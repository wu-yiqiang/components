<template>
  <div class="WaveLoading">
    <!-- 水缸 -->
    <div class="main-box">
      <!-- 百分比数字 -->
      <div class="main-number">{{ percent }}</div>
      <!-- 水波效果 -->
      <div ref="wave" class="wave"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// const percent = ref(0);
const wave = ref<HTMLDivElement | null>(null);
const props = defineProps({
    percent: {
        type: Number,
        required: true,
        default: 0
    },
});
// 监听百分比，计算 top
watch(
  () => props?.percent,
  v => {
    const waveEle = wave.value;
    if (waveEle) {
      waveEle.style.top = `${200 * (1 - v / 100)}px`;
    }
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss">
.WaveLoading {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-box {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: #fff;
    border: #fff solid 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    // 增加样式隐藏溢出
    overflow: hidden;

    .main-number {
      font-size: 100px;
      z-index: 1;
      user-select: none;
    }
  }

  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .wave {
    position: absolute;
    top: 200px;
    width: 400px;
    height: 400px;
    background: rgb(168, 168, 231);
    border-radius: 40%;
    animation: rotateAnimation 2s linear infinite;
  }

  .percent-bar {
    width: 200px;
    background: #fff;
  }
}
</style>