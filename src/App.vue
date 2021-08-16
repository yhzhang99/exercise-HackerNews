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
#bd {
  height: 70px;
}
</style>
