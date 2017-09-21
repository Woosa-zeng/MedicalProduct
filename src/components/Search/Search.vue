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
  <section class="tabs-wrapper">
    <div class="tabs-pane" v-for="(li,index) in tabList" @click="handleTabs(index)" :class="{'active': currentTab === index }">
      <div class="tabs-text">{{li.title}}</div>
    </div>
  </section>
  <section class="dropdown-wrapper">
    <div class="dropdown-item" v-for="(li,index) in dropdownList" :class="{'active': currentDropdown === index }" @click="handleDropdown(index)">
      <div class="dropdown-title">{{li.title}} <i class="icon iconfont icon-up"></i></div>
    </div>
  </section>
  <section class="layer-wrapper" :class="{'layer-active': areaLayer === currentDropdown}">
    <div class="layer-content area-layer">
      <ul>
        <li class="layer-cell" :class="{'active': currentArea === index}" v-for="(li,index) in areaList" @click="handleArea(li.text, index)">{{li.text}}</li>
      </ul>
    </div>
  </section>
  <section class="layer-wrapper" :class="{'layer-active': titleLayer === currentDropdown}">
    <div class="layer-content title-layer">
      <ul>
        <li class="layer-cell" :class="{'active': currentTitle === index}" v-for="(li,index) in titleList" @click="handleTitle(li.text, index)">{{li.text}}</li>
      </ul>
    </div>
  </section>
  <section class="layer-wrapper" :class="{'layer-active': timeLayer === currentDropdown}">
    <div class="layer-content time-layer">
      <h2 class="layer-header">预约时间（可多选）</h2>
      <div class="layer-time-wrapper">
        <ul class="row">
          <li class="week cell" v-for="li in weekData">{{li.text}}</li>
        </ul>
        <ul class="row" ref="am">
          <li class="time cell am" @click="handleAm(li,index)" v-for="(li,index) in amData">{{li.text}} <i class="icon iconfont icon-gou"></i></li>
        </ul>
        <ul class="row" ref="pm">
          <li class="time cell pm" @click="handlePm(li,index)" v-for="(li,index) in pmData">{{li.text}}<i class="icon iconfont icon-gou"></i></li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <div class="btn-cancel btn" @click="cancel">取消</div>
        <div class="btn-confirm btn" @click="confirm">确定</div>
      </div>
    </div>
  </section>
  <section class="content">
    <div class="nav-title">
      <div class="nav-title-left">医生</div>
      <div class="nav-title-right"><i class="icon iconfont icon-icon"></i>筛选</div>
    </div>
    <ul class="item-wrapper">
      <li class="list-item" v-for="li in contentList">
        <div class="list-item-left">
          <img src="./1_01.png" class="item-img">
        </div>
        <div class="list-item-right">
          <div class="item-title-wrapper">
            <span class="item-name">{{li.name}}</span>
            <span class="item-title">{{li.title}}</span>
            <span class="item-tag" v-if="li.tag">可咨询</span>
            <span class="item-num">预约量：{{li.num}}</span>
          </div>
          <div class="item-addr-wrapper">
            <span class="item-addr">{{li.addr}}</span>
            <span class="item-office">{{li.office}}</span>
          </div>
          <div class="item-des-wrapper">
            <span class="item-des">擅长领域：{{li.des}}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</div>
</template>
<script type="text/ecmascript-6">
  import { Search } from 'vux'
  function hasClass(ele, cName) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'))
  }
  function addClass(ele, cName) {
    if (!hasClass(ele, cName)) {
      ele.className += ' ' + cName
    }
  }
  function removeClass(ele, cName) {
    if (hasClass(ele, cName)) {
      ele.className = ele.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), '')
    }
  }
  export default{
    data() {
      return {
        results: [], // 搜索数据
        value: '', // 搜索数据
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
        dropdownList: [
          {
            title: '区域'
          },
          {
            title: '医生职称'
          },
          {
            title: '预约时间'
          }
        ], // 下拉层title
        contentList: [
          {
            url: './1_01.png',
            name: '赵可欣',
            title: '主任医生',
            tag: 1,
            num: 112,
            addr: '北京协和医院',
            office: '乳腺外科',
            des: '乳腺肿瘤'
          },
          {
            url: './1_02.png',
            name: '韩大生',
            title: '主任医生',
            tag: 0,
            num: 73,
            addr: '北京协和医院',
            office: '乳腺外科',
            des: '乳腺肿瘤'
          },
          {
            url: './1_03.png',
            name: '陈淑',
            title: '主任医生',
            tag: 1,
            num: 44,
            addr: '北京协和医院',
            office: '乳腺外科',
            des: '乳腺肿瘤'
          }
        ], // 列表数据
        areaList: [
          {
            text: '不限区域'
          },
          {
            text: '罗湖'
          },
          {
            text: '福田'
          },
          {
            text: '南山'
          },
          {
            text: '宝安'
          },
          {
            text: '龙华'
          },
          {
            text: '盐田'
          },
          {
            text: '光明新区'
          }
        ], // 区域数据
        currentArea: -1, // 当前areaId -1不限
        titleList: [
          {
            text: '主治医师'
          },
          {
            text: '副主任'
          },
          {
            text: '主任医师'
          }
        ], // 医生title
        currentTitle: -1, // 当前医生id -1不限
        currentTab: 0, // 当前tab
        currentDropdown: -1, // 当前Dropdown, -1表示收起
        areaLayer: 0, // 下拉展开层id
        titleLayer: 1, // 下拉展开层id
        timeLayer: 2, // 下拉展开层id
        weekData: [
          {
            text: '周一'
          },
          {
            text: '周二'
          },
          {
            text: '周三'
          },
          {
            text: '周四'
          },
          {
            text: '周五'
          }
        ],
        amData: [
          {
            tag: '周一',
            text: '上午'
          },
          {
            tag: '周二',
            text: '上午'
          },
          {
            tag: '周三',
            text: '上午'
          },
          {
            tag: '周四',
            text: '上午'
          },
          {
            tag: '周五',
            text: '上午'
          }
        ],
        pmData: [
          {
            tag: '周一',
            text: '下午'
          },
          {
            tag: '周二',
            text: '下午'
          },
          {
            tag: '周三',
            text: '下午'
          },
          {
            tag: '周四',
            text: '下午'
          },
          {
            tag: '周五',
            text: '下午'
          }
        ],
        selectAm: [],
        selectPm: []
      }
    },
    created() {},
    methods: {
      confirm() {
        let am = this.selectAm
        let pm = this.selectPm
        let text = ''
        for (let i = 0; i < am.length; i++) {
          text += am[i].tag + am[i].text + ','
        }
        for (let i = 0; i < pm.length; i++) {
          text += pm[i].tag + pm[i].text + ','
        }
        if (text.length < 1) {
          alert(`请选择日期`)
        } else {
          alert(`您选择的日期有：${text.substr(0, text.length - 1)}`)
        }
        this.currentDropdown = -1
      },
      cancel() {
        let am = this.$refs.am.getElementsByTagName('li')
        let pm = this.$refs.pm.getElementsByTagName('li')
        for (let i = 0; i < am.length; i++) {
          removeClass(am[i], 'active')
        }
        for (let i = 0; i < pm.length; i++) {
          removeClass(pm[i], 'active')
        }
        this.selectAm = []
        this.selectPm = []
        this.currentDropdown = -1
      },
      handleAm(item, index) {
        let list = this.selectAm
        let cell = this.$refs.am.getElementsByTagName('li')[index]
        console.log(cell)
        let flag = false
        for (let i = 0; i < list.length; i++) {
          if (list[i].tag === item.tag) {
            list.splice(i, 1)
            removeClass(cell, 'active')
            flag = true
          }
        }
        if (!flag) {
          list.splice(list.length, 0, item)
          addClass(cell, 'active')
        }
        this.selectAm = list
      },
      handlePm(item, index) {
        let list = this.selectPm
        let cell = this.$refs.pm.getElementsByTagName('li')[index]
        let flag = false
        for (let i = 0; i < list.length; i++) {
          if (list[i].tag === item.tag) {
            list.splice(i, 1)
            removeClass(cell, 'active')
            flag = true
          }
        }
        if (!flag) {
          list.splice(list.length, 0, item)
          addClass(cell, 'active')
        }
        this.selectPm = list
      },
      handleArea(text, index) {
        this.currentDropdown = -1
        this.dropdownList[0].title = text
        this.currentArea = index
      },
      handleTitle(text, index) {
        this.currentDropdown = -1
        this.dropdownList[1].title = text
        this.currentTitle = index
      },
      handleTabs(index) {
        this.currentTab = index
      },
      handleDropdown(index) {
        this.currentDropdown = index
      },
      // 搜索功能
      setFocus() {
        this.$refs.search.setFocus()
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult(val) {
        if (val.length) {
          console.log(`getResult === ${val}`)
        }
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      }
    },
    components: {
      Search
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
@import url('../../common/less/index.less');
.layer-wrapper{
  position: fixed;
  z-index: 666;
  background-color: rgba(20, 20, 20, 0.5);
  width: 100%;
  height: 100%;
  visibility: hidden;
  .layer-content{
    padding: 0 10px;
    background: #f5f5f5;
    overflow: hidden;
    .border-1px-top();
    .layer-cell{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      .border-1px();
      &:last-child{
        .border-none();
       }
    }
    .active{
      color: @base-blue;
    }
  }
  .time-layer{
    .layer-header{
      margin: 0;
      line-height: 50px;
      font-size: 14px;
    }
    .layer-time-wrapper{
      margin-bottom: 20px;
    }
    .btn-wrapper{
      display: flex;
      margin-bottom: 30px;
      .btn{
        flex: 1;
        margin: 0 5px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
      }
      .btn-cancel{
        border: 1px solid #bcbcbc;
      }
      .btn-confirm{
        color: #fff;
        border: 1px solid @base-blue;
        background: @base-blue;
      }
    }
    .row{
      display: flex;
      .cell{
        flex: 1;
        box-sizing: border-box;
        position: relative;
        line-height: 35px;
        text-align: center;
        over-flow: hidden;
        .icon-gou{
          position: absolute;
          right: -2px;
          bottom: -9px;
          font-size: 24px;
          visibility: hidden;
        }
      }
      .week{
        color: #bcbcbc;
      }
      .time{
        border: 1px solid #fff;
      }
      .active{
        background: rgba(52, 84, 150, 0.14);
        border: 1px solid @base-blue;
      }
    }
  }
}
.layer-active{
  visibility: visible;
  .time-layer{
    .active{
      .icon-gou{
        visibility: visible !important;
      }
    }
  }
}
.content{
  margin-top: 5px;
  background: #fff;
  .nav-title{
    display: flex;
    line-height: 30px;
    .border-1px();
    .nav-title-left,.nav-title-right{
      flex: 1;
      font-size: 14px;
      color: #bcbcbc;
    }
    .nav-title-left{
      margin-left: 10px;
    }
    .nav-title-right{
      text-align: right;
      margin-right: 10px;
      .icon{
        margin-right: 3px;
        vertical-align: middle;
        font-size: 13px;
      }
    }
  }
  .item-wrapper{
    padding: 0 10px;
    .list-item{
      display: flex;
      .border-1px();
      &:last-child{
        .border-none();
       }
      .list-item-left{
        flex: 0 0 75px;
        width: 75px;
        padding: 10px 0;
        .item-img{
          width: 65px;
        }
      }
      .list-item-right{
        flex: 1;
        padding: 10px 0;
        color: #696969;
        .item-name{
          margin-right: 5px;
          font-size: 16px;
          font-weight: 800;
          color: #333;
        }
        .item-tag{
          display: inline-block;
          padding: 0 4px;
          line-height: 20px;
          font-size: 10px;
          background: #cde3f8;
          border-radius: 3px;
        }
        .item-title,.item-addr,.item-office,.item-des,.item-num{
          margin-right: 5px;
          font-size: 14px;
        }
        .item-des,.item-num{
          color:#bfbfbf;
        }
        .item-num{
          float: right;
        }
      }
    }
  }
}

.tabs-wrapper{
  background: #fff;
  display: flex;
  .tabs-pane{
    flex: 1;
    padding: 14px 0;
    .tabs-text{
      line-height: 15px;
      text-align: center;
      border-right: 1px solid #ccc;
      font-size: 15px;
      font-weight: 600;
    }
    &:last-child{
      .tabs-text{
        border-right-color: transparent;
      }
    }
  }
  .active{
    color: @base-blue;
    border-bottom: 2px solid;
  }
}
.dropdown-wrapper{
  display: flex;
  background: #f5f5f5;
  .border-1px-top();
  .dropdown-item{
    flex: 1;
    padding: 14px 0;
    .dropdown-title{
      position: relative;
      line-height: 15px;
      text-align: center;
      border-right: 1px solid #ccc;
      font-size: 15px;
      .icon-up{
        position: absolute;
        margin-left: 4px;
        font-size: 15px;
        color: #333;
      }
    }
    &:last-child{
      .dropdown-title{
        border-right-color: transparent;
      }
    }
  }
  .active{
    .dropdown-title{
      color: @base-blue;
      .icon-up{
        color: @base-blue;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
