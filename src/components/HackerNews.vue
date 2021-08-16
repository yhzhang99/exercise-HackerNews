<template>
  <div id="wrap">
    <h1>Hacker News Headlins</h1>
    <div id="main">
      <ul>
        <li @click="clearDa"><router-link to="/top">Top</router-link></li>
        <li @click="clearDa"><router-link to="/best">Best</router-link></li>
        <li @click="clearDa"><router-link to="/new">New</router-link></li>
        <li @click="clearDa"><router-link to="/ask">Ask</router-link></li>
        <li @click="clearDa"><router-link to="/show">Show</router-link></li>
        <li @click="clearDa"><router-link to="/job">Job</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
export default {
  methods: {
    ...mapActions(['getIdList']),
    ...mapMutations(['changeTopic', 'clearData']),
    clearDa() {
      // this.clearData();
      this.clearData();
    },
  },
  watch: {
    $route(to) {
      this.changeTopic(to.params.class);
      this.getIdList();
    },
  },
  computed: {
    ...mapState(['newsData', 'loading', 'id']),
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
  margin-top: 70px;
  color: #3571fa;
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
</style>
