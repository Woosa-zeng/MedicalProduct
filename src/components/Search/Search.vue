<template lang="html">
<div class="search">
  <section class="search-condition">
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
  </section>
  <section class="search-layer">
    <section class="layer-wrapper" :class="{'layer-active': areaLayer === currentDropdown}" @click.self="handleArea('区域', -1)">
      <div class="layer-content area-layer">
        <ul>
          <li class="layer-cell" :class="{'active': currentArea === index}" v-for="(li,index) in areaList" @click.stop="handleArea(li.text, index)">{{li.text}}</li>
        </ul>
      </div>
    </section>
    <section class="layer-wrapper" :class="{'layer-active': titleLayer === currentDropdown}" @click.self="handleTitle('医生职称', -1)">
      <div class="layer-content title-layer">
        <ul>
          <li class="layer-cell" :class="{'active': currentTitle === index}" v-for="(li,index) in titleList" @click.stop="handleTitle(li.text, index)">{{li.text}}</li>
        </ul>
      </div>
    </section>
    <section class="layer-wrapper" :class="{'layer-active': timeLayer === currentDropdown}" @click.self="cancel">
      <div class="layer-content time-layer">
        <h2 class="layer-header">预约时间（可多选）</h2>
        <div class="layer-time-wrapper">
          <ul class="row">
            <li class="week cell" v-for="li in weekData">{{li.text}}</li>
          </ul>
          <ul class="row">
            <li class="time cell" :class="[li.active ? 'active': '']" @click.stop="handleTimer(li)" v-for="li in timer">{{li.text}} <i class="icon iconfont icon-gou"></i></li>
          </ul>
        </div>
        <div class="btn-wrapper">
          <div class="btn-cancel btn" @click="cancel">取消</div>
          <div class="btn-confirm btn" @click="confirm">确定</div>
        </div>
      </div>
    </section>
  </section>
  <section class="content">
    <div class="nav-title">
      <div class="nav-title-left">医生</div>
      <div class="nav-title-right"><i class="icon iconfont icon-icon"></i>筛选</div>
    </div>
    <ul class="item-wrapper">
      <li class="list-item" v-for="li in contentList" @click="quizDoctor(li.name)">
        <div class="list-item-left">
          <img :src="li.url" class="item-img">
        </div>
        <dl class="list-item-right">
          <dt class="item-title-wrapper">
            <span class="item-name">{{li.name}}</span>
            <span class="item-title">{{li.title}}</span>
            <span class="item-tag" v-if="li.tag">可咨询</span>
            <span class="item-num">预约量：{{li.num}}</span>
          </dt>
          <dd class="item-addr-wrapper">
            <span class="item-addr">{{li.addr}}</span>
            <span class="item-office">{{li.office}}</span>
          </dd>
          <dd class="item-des-wrapper">
            <span class="item-des">擅长领域：{{li.des}}</span>
          </dd>
        </dl>
      </li>
    </ul>
  </section>
</div>
</template>
<script type="text/ecmascript-6">
  import { Search } from 'vux'
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
            url: 'https://raw.githubusercontent.com/Woosa-zeng/MedicalProduct/master/src/components/Search/1_01.png',
            name: '赵可欣',
            title: '主任医生',
            tag: 1,
            num: 112,
            addr: '北京协和医院',
            office: '乳腺外科',
            des: '乳腺肿瘤'
          },
          {
            url: 'https://raw.githubusercontent.com/Woosa-zeng/MedicalProduct/master/src/components/Search/1_02.png',
            name: '韩大生',
            title: '主任医生',
            tag: 0,
            num: 73,
            addr: '北京协和医院',
            office: '乳腺外科',
            des: '乳腺肿瘤'
          },
          {
            url: 'https://raw.githubusercontent.com/Woosa-zeng/MedicalProduct/master/src/components/Search/1_03.png',
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
        timer: [
          {
            active: false,
            tag: '周一',
            text: '上午'
          },
          {
            active: false,
            tag: '周二',
            text: '上午'
          },
          {
            active: false,
            tag: '周三',
            text: '上午'
          },
          {
            active: false,
            tag: '周四',
            text: '上午'
          },
          {
            active: false,
            tag: '周五',
            text: '上午'
          },
          {
            active: false,
            tag: '周一',
            text: '下午'
          },
          {
            active: false,
            tag: '周二',
            text: '下午'
          },
          {
            active: false,
            tag: '周三',
            text: '下午'
          },
          {
            active: false,
            tag: '周四',
            text: '下午'
          },
          {
            active: false,
            tag: '周五',
            text: '下午'
          }
        ]
      }
    },
    computed: {
      selectTimer() {
        return this.$store.getters.timer
      }
    },
    created() {},
    methods: {
      quizDoctor(name) {
        this.$store.commit('DOCTOR', {doctor: name})
        this.$router.push({name: 'Quiz'})
      },
      confirm() {
        let list = this.selectTimer
        let text = ''
        for (let i = 0; i < list.length; i++) {
          text += list[i].tag + list[i].text + ','
        }
        if (text.length < 1) {
          alert(`请选择日期`)
        } else {
          alert(`您选择的日期有：${text.substr(0, text.length - 1)}`)
        }
        this.currentDropdown = -1
      },
      cancel() {
        // this.selectTimer = []
        this.$store.commit('TIMER', {timer: []})
        for (let i = 0; i < this.timer.length; i++) {
          this.timer[i].active = false
        }
        this.currentDropdown = -1
      },
      handleTimer(item) {
        let list = this.selectTimer
        let flag = false
        for (let i = 0; i < list.length; i++) {
          if (list[i].tag === item.tag && list[i].text === item.text) {
            list.splice(i, 1) // 从数组中取出
            item.active = false // 设置class
            flag = true
          }
        }
        if (!flag) {
          item.active = true // 设置class
          list.splice(list.length, 0, item) // 加入数组
        }
        this.$store.commit('TIMER', {timer: list})
        // this.selectTimer = list
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
        if (this.currentDropdown === index) {
          this.currentDropdown = -1
        } else {
          this.currentDropdown = index
        }
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
.search{
  height: 100%;
}
dl,dd{
  margin: 0;
}
.layer-wrapper{
  position: absolute;
  z-index: 666;
  background-color: rgba(20, 20, 20, 0.3);
  width: 100%;
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
      width: 100%;
      font-size: 0;
      .cell{
        display: inline-block;
        width: 20%;
        box-sizing: border-box;
        position: relative;
        line-height: 35px;
        text-align: center;
        over-flow: hidden;
        font-size: 16px;
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
        margin: 10px 0;
        .item-img{
          width: 65px;
          border-radius: 5px;
        }
      }
      .list-item-right{
        flex: 1;
        margin: 10px 0;
        color: #696969;
        .item-name{
          display: inline-block;
          width: 50px;
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
        .item-title,.item-addr{
          margin-right: 15px;
          font-size: 14px;
        }
        .item-des,.item-num{
          color:#bfbfbf;
        }
        .item-des,.item-office{
          font-size: 14px;
        }
        .item-num{
          float: right;
          font-size: 12px;
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
