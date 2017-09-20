<template lang="html">
<div class="search">
  <div class="header">搜索</div>
  <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    :autoFixed="false"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    ref="search">
  </search>
  <section class="tab-layer">
    <div class="tab-item" v-for="(li,index) in tabList" @click="selectTab(index)" :class="{'active': currentTab === index }">
      <div class="item-text">{{li.title}}</div>
    </div>
  </section>
  <section class="select-wrapper">
  </section>
</div>
</template>
<script type="text/ecmascript-6">
  import { Search } from 'vux'
  export default{
    data() {
      return {
        tabList: [
          {
            title: '百科咨询'
          },
          {
            title: '医患问答'
          },
          {
            title: '相关医生'
          },
          {
            title: '治疗药品'
          }
        ],
        currentTab: 0
      }
    },
    created() {},
    methods: {
      selectTab(index) {
        this.currentTab = index
        console.log(index)
      }
    },
    components: {
      Search
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
@import url('../../common/less/index.less');

.tab-layer{
  background: #fff;
  display: flex;
  .border-1px();
  .tab-item{
    flex: 1;
    padding: 11px 0;
    .item-text{
      text-align: center;
      border-right: 1px solid #ccc;
      font-size: 14px;
      line-height: 20px;
    }
    &:last-child{
    .item-text{
      border-right-color: transparent;
    }
  }
}
.active{
  color: @base-blue;
  border-bottom: 2px solid;
  }
}
</style>
