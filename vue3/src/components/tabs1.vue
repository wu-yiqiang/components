<template>
  <nav class="nav93">
    <input type="radio" name="radio93" id="radio93-1" checked="" />
    <label for="radio93-1" class="nav-tab93">首页</label>
    <input type="radio" name="radio93" id="radio93-2" />
    <label for="radio93-2" class="nav-tab93">设计</label>
    <input type="radio" name="radio93" id="radio93-3" />
    <label for="radio93-3" class="nav-tab93">前端</label>
    <span class="slide93"></span>
</nav>
</template>
<script lang="ts" setup>
import { reactive, watch, computed, ref } from 'vue'
const props = defineProps({
    tabs: {
        type: Array,
    }
})
</script>
<style lang="scss" scoped>
$--width: 68px;
.nav93{
    padding: 6px;
    position: relative;
    overflow: hidden;
    display: flex;
    background-color: #fff;
    align-items: center;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    border-radius: 28px;
    input[name='radio93']{
    display: none;
}
}
.nav-tab93{
    width: 68px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #3d3d3d;
    background-color: transparent;
    transition: all 0.3s linear;
    cursor: pointer;
    z-index: 2;
    &:hover{
    transform: translateY(-1px);
}
}
.nav93 input[name='radio93']:checked + .nav-tab93{
    color: #45873c;
}
.slide93{
    width: $--width;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    background-color: rgba(0, 129, 12, 0.1);
    position: absolute;
    transition: all 0.3s linear;
}
#radio93-1:checked ~ .slide93{
    transform: translateX(0 * $--width);
}
#radio93-2:checked ~ .slide93{
    transform: translateX(1* $--width);
}
#radio93-3:checked ~ .slide93{
    transform: translateX(2* $--width);
}
</style>
