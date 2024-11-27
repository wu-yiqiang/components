<!--
 * @Description: 贝赛尔曲线 (加入购物车动画)
-->
<template>
    <div class="cubic-bezier-ball" v-for="item in ballList" :ref="(el) => setRefAction(el, item)" :key="item">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue';
const ballList = ref<any>([])
const ballRef = ref<any>([])

//将循环ref放入到数组中
const setRefAction = (el: any, item: number) => {
    ballRef.value[item] = el;
}

//开始执行动画
const start = (point: any, time = 1, xcubic = 'linear', ycubic = 'ease-in') => {
    const nowTime = new Date().getTime();
    //新增一个动画节点
    ballList.value.push(nowTime);
    //dom渲染后增加动画效果
    nextTick(() => {
        const ele = ballRef.value[nowTime];
        ele.style.left = `${point.x1}px`;
        ele.style.top = `${point.y1}px`;
        ele.style.opacity = 1;
        setTimeout(() => {
            ele.style.left = `${point.x2}px`;
            ele.style.top = `${point.y2}px`;
            ele.style.transition = `left ${time}s ${xcubic}, top ${time}s ${ycubic}`;
        })
        setTimeout(() => {
            ele.style.opacity = 0;
            ele.style.left = `${point.x1}px`;
            ele.style.top = `${point.y1}px`;
            //动画结束回收dom
            removeDom(nowTime);
        }, time * 1000)
    })
}

//动画结束回收dom
const removeDom = (nowTime: number) => {
    ballList.value = ballList.value.filter((item: number) => {
        return item != nowTime;
    })
}

//暴露出给父组件调用的方法
defineExpose({
    start
})

</script>
<style>
.cubic-bezier-ball {
    position: absolute;
    opacity: 0;
}
</style>

<!--使用案例-->
<!--<template>-->
<!--  <div class="content">-->
<!--    <CubicBezier ref="myCubic">-->
<!--      <svg t="1695348660789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
<!--        p-id="1465" width="20" height="20">-->
<!--        <path-->
<!--          d="M506.83068651 972.52299106c-253.57580322 0-459.88264913-206.30684576-459.8826491-459.88264905s206.30684576-459.88264913 459.8826491-459.8826489 459.88264913 206.30684576 459.88264927 459.8826489-206.29520623 459.88264913-459.88264927 459.88264905z m0-861.55230987c-221.4771603 0-401.66966071 180.19250042-401.66966084 401.66966082s180.19250042 401.66966071 401.66966084 401.66966077 401.66966071-180.19250042 401.66966099-401.66966077-180.18086076-401.66966071-401.66966099-401.66966082z"-->
<!--          fill="#1296db" p-id="1466"></path>-->
<!--        <path-->
<!--          d="M765.2614472 547.56814069H260.05416494a29.10649413 29.10649413 0 1 1 0-58.21299783h505.20728226a29.10649413 29.10649413 0 1 1 0 58.21299783z"-->
<!--          fill="#1296db" p-id="1467"></path>-->
<!--        <path-->
<!--          d="M512.65198161 809.52661635a29.10649413 29.10649413 0 0 1-29.10649422-29.10650362v-523.91694194a29.10649413 29.10649413 0 1 1 58.21299789 0v523.91694194a29.10649413 29.10649413 0 0 1-29.10650367 29.10650362z"-->
<!--          fill="#1296db" p-id="1468"></path>-->
<!--          </svg>-->
<!--    </CubicBezier>-->
<!--    <button class="btn" @click="getData">开始</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import CubicBezier from './CubicBezier.vue';-->
<!--import { ref } from 'vue';-->
<!--const myCubic = ref<any>();-->
<!--const params = {-->
<!--  point: { x1: 250, y1: 50, x2: 100, y2: 400 },-->
<!--  time: 0.5,-->
<!--  xcubic: 'linear',-->
<!--  ycubic: 'cubic-bezier(0.49,-0.29,0.75,0.41)',-->
<!--}-->

<!--const getData = () => {-->
<!--  myCubic.value.start(params.point, params.time, params.xcubic, params.ycubic)-->
<!--}-->
<!--</script>-->