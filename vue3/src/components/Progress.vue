<template>
  <div class="Progress">
  </div>
  <!--<progress class="Progress" :value="progress" :max="max" />-->
</template>
<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true,
    default: 0
  },
  contents: {
    type: String,
    required: false,
    default: ""
  },
  max: {
    type: Number,
    required: false,
    default: 100
  }
})
</script>
<style lang="scss" scoped>
.Progress {
  position: relative;
  width: 300px;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #E4CCFF;
  &::before {
    position: absolute;
    content: "";
    width: 30%;
    height: 100%;
    background-color: #9747FF;
    // animation: progress 10s forwards;
  }

  //  @keyframes progress {
  //    99% {
  //      background: #9747FF;
  //    }
  //    100% {
  //      background-color: #14AE5C;
  //      width: 100%;
  //    }
  //  }
}
</style>
