<template>
  <section class="Tabs">
   <div v-for="(tab, index) in tabs" :key="index" :class="[startIndex == index ?'tab active': 'tab']" @click="setCurrent(index)">{{ tab }}</div>
   <div class="hover-slide"></div>
   <div class="click-slide"></div>
  </section>
</template>
<script lang="ts" setup>
import { reactive, watch, computed, ref } from 'vue'
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: []
    },
});
let startIndex = ref(0)
let endIndex = ref(0)
let setCurrent = (name: number) => {
  endIndex.value = startIndex.value
  startIndex.value = name
  console.log("sdsdsd", endIndex.value, startIndex.value)
}
</script>
<style lang="scss" scoped>
$--n: 4;
$--width: 150px;
.Tabs{
  display: flex;
  align-items: center;
  justify-content: start;
  width: 600px;
  border-radius: 999999px;
  background-color: #fff;
  column-gap: 10px;
  height: 44px;
  padding: 2px 10px;
  .tab {
    color: rgb(70,100,180);
    flex: 1;
    padding: 4px 10px;
    display: grid;
    place-content: center;
    cursor: pointer;
    border-radius: 9999px;
    &:hover {
      background-color: rgba(170,190,255, 0.5);
      transition: all 0.5s;
      transform: translateX(calc($--width * var(--n)));
      // animation-direction: alternate;
      // background-color: rgba(170,190,255);
    }

    @keyframes tranlate {
      0% {

      }
      100% {
        transform: translateX(calc($--n * $--width));
      }
    }
  }
  .active {
      background-color: rgba(170,190,255);
      z-index: 999999;
    }
}
</style>
