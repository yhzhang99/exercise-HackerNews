<template>
  <div id="app">
    <hacker-news></hacker-news>
    <div id="bd"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import HackerNews from './components/HackerNews.vue';

export default {
  name: 'App',
  components: {
    HackerNews,
  },
};
</script>
<style scoped>
#app {
  min-height: 100vh;
  background-color: #f2f7fa;
}
#bd {
  height: 70px;
}
</style>
