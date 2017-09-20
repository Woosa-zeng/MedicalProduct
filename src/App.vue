<template>
  <div id="app" style="height: 100%;">
    <loading v-model="isLoading"></loading>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  create() {
    console.log(this.isLoading)
  },
  methods: {
  }
}
</script>

<style lang="less">
#app {
  font-family: "PingFang SC",Arial,sans-serif;
}
body {
  background-color: #eeeff3;
  color: #333;
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
