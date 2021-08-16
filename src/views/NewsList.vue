<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="newsData">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="timeConvert(item.time)">
          <a slot="title" :href="item.href">{{ item.title }}</a>
        </a-list-item-meta>
        <div>
          <a-icon type="message" /> 615 comments <br /><a-icon type="check" />
          1223 points
        </div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import reqwest from 'reqwest';
import infiniteScroll from 'vue-infinite-scroll';
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
export default {
  directives: { infiniteScroll },
  data() {
    return {};
  },
  beforeMount() {
    this.getIdList();
  },
  methods: {
    ...mapMutations(['changeLoading', 'changeBusy']),
    ...mapActions(['getIdList']),

    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res);
        },
      });
    },
    handleInfiniteOnLoad() {
      this.changeLoading(true);

      this.getIdList();
    },
    timeConvert(timestamp) {
      return new Date(parseInt(timestamp) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ');
    },
  },

  computed: {
    ...mapState(['newsData', 'loading', 'busy']),
  },
};
</script>
<style>
.ant-list-item {
  background-color: #f2f7fa;
  height: 60px;
  padding: 5px;
  border-radius: 10px;
}
.demo-infinite-container {
  width: 1110px;
  margin: 0 auto;

  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
