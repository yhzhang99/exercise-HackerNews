<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta :description="timeConvert(item.time)">
          <a slot="title" :href="item.url" target="blank">{{ item.title }}</a>
        </a-list-item-meta>
        <div id="tap">
          <a-icon type="message" /> {{ item.descendants }} comments
          <br /><a-icon type="like" /> {{ item.score }} points
        </div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
  </div>
</template>
<script>
import request from '../api/agent';
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
export default {
  directives: { infiniteScroll },
  data() {
    return {
      loading: false,
      busy: false,
      nowId: 0,
      isSending: false,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    ...mapMutations(['changeCh', 'addData', 'addId', 'changeTopic']),
    fetchData() {
      request
        .get({
          url: `${this.topic}stories.json`,
        })
        .then((response) => {
          this.addId(response);
          this.getNews();
        });
    },
    getNews() {
      let news = [];
      for (let i = this.nowId; i < this.nowId + 10; i++) {
        news.push(
          request.get({
            url: `item/${this.id[i]}.json?print=pretty`,
          })
        );
      }
      this.nowId = this.nowId + 10;
      Promise.all(news).then((res) => {
        this.addData(res);
        this.isSending = false;
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 200) {
        this.$message.warning('Infinite List loaded all');
        this.busy = true;
        this.loading = false;
        return;
      }
      if (this.id[this.nowId] && !this.isSending) {
        this.isSending = true;
        this.getNews();
      }
    },
    timeConvert(timestamp) {
      return new Date(parseInt(timestamp) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ');
    },
  },
  computed: {
    ...mapState(['topic', 'data', 'id']),
  },
  watch: {
    $route(to) {
      this.changeTopic(to.params.class);
      this.fetchData((res) => {
        this.addData(res);
      });
      this.nowId = 0;
    },
  },
};
</script>
<style>
.ant-list-item {
  background-color: #fff;
  height: 82px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.demo-infinite-container {
  width: 1110px;
  margin: 0 auto;
  padding: 8px 24px;
  height: 100%;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.ant-spin-dot {
  top: 70px;
}
#tap {
  position: absolute;
  left: 950px;
  text-align: left;
}
</style>
