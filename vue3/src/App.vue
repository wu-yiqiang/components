

<template>
  <!-- <Progress :progress="progress" contents="30%"/> -->
  <!-- <Tabs :tabs="['网络', '萨达','萨达','萨达']" /> -->
  <!-- <RouterView /> -->
  <Drag />
</template>
<script setup lang="ts">
import Drag from './components/Drag.vue'
import { RouterLink, RouterView } from 'vue-router'
import Tabs from '@/components/Tabs.vue'
import tabs1 from './components/tabs1.vue'
import Progress from  '@/components/Progress.vue'
import WaveLoading from  '@/components/WaveLoading.vue'
let progress = ref(30)
// onMounted(() => {
//  setInterval(() => {
//    if (progress.value + 10 > 100) return
//    progress.value = progress.value + 10
//    console.log('sdsd', progress.value )
//  }, 900)
// })
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
