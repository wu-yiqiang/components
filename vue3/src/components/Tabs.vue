<template>
  <section class="Tabs">
   <div v-for="(tab, index) in tabs" :key="index" class="tab">{{ tab }}</div>
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
</script>
<style lang="scss" scoped>
.Tabs{
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #fff;
  width: 600px;
  border-radius: 999999px;
  background-color: gray;
  column-gap: 10px;
  height: 40px;
  padding: 2px 10px;
  .tab {
    flex: 1;
    padding: 4px 10px;
    display: grid;
    place-content: center;
    cursor: pointer;
    border-radius: 9999px;
    border: 1px solid blue;
  }
}
</style>
