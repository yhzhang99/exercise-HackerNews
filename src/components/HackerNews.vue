<template>
  <div id="wrap">
    <h1>Hacker News Headlins</h1>
    <div id="main">
      <ul>
        <li @click="clearDa"><router-link to="/top">🔥Top</router-link></li>
        <li @click="clearDa"><router-link to="/best">👍Best</router-link></li>
        <li @click="clearDa"><router-link to="/new">✨New</router-link></li>
        <li @click="clearDa"><router-link to="/ask">🙋‍♀️Ask</router-link></li>
        <li @click="clearDa"><router-link to="/show">📰Show</router-link></li>
        <li @click="clearDa"><router-link to="/job">💼Job</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['clearData', 'changeCh']),
    clearDa() {
      this.clearData();
    },
  },
};
</script>

<style scoped>
#wrap {
  width: 1110px;
  text-align: center;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  padding-top: 70px;
  padding-bottom: 30px;
  color: #3571fa;
  background-color: #f2f7fa;
}
#main {
  color: #ce3273;
  font-size: 24px;
}
ul {
  float: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}
li {
  float: left;
  padding: 10px;
}
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  color: #099a56 !important;
}
</style>
