<template>
  <div id="app" style="height: 100%;">
    <div class="app-content">
      <router-view></router-view>
    </div>
    <loading v-model="isLoading"></loading>
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
  overflow: hidden;
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
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .app-content{
    height: 100%;
  }
  .header{
    background: #333;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
}
</style>
