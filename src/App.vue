<template>
  <div id="app" style="height: 100%;">
    <loading v-model="isLoading"></loading>
    <div class="header">
    </div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      :autoFixed="false"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      ref="search"></search>
    <div class="tab-layer">
      <div class="tab-item">百科咨询</div>
      <div class="tab-item">百科咨询</div>
      <div class="tab-item">百科咨询</div>
      <div class="tab-item">百科咨询</div>
    </div>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Loading, Search } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Loading,
    Search
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  create() {
    console.log(this.isLoading)
  }
}
</script>

<style lang="less">
@import url('./common/less/index.less');
#app {
  font-family: "PingFang SC",Arial,sans-serif;
}
body {
  background-color: #eeeff3;
}
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
  .header{
    background: #333;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
}
.tab-layer{
  background: #fff;
  display: flex;
  .border-1px();
  .tab-item{
    flex: 1;
  }
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
</style>
