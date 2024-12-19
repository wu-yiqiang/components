<template>
  <section class='WaveLoading'>
    <div class="circle">
      <div class="wave"></div>
    </div>
  </section>
</template>

<script setup lang='ts'>
</script>
<style scoped lang='scss'>
.WaveLoading {
  .circle {
    width: 160px;
    border-radius: 50%;
    background-color: gold;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    .wave {
      transform: translateY(0);
      width: 160px;
      background-color: blue;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      animation: spin 2s linear both;
      animation-direction: alternate;
    }

    @keyframes spin {
      0% {
        transform: translateY(160px) rotate(0deg);
      }
      100% {
        transform: translateY(0px) rotate(360deg);
      }
    }
  }


}
</style>
