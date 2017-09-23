<template lang="html">
<div class="quiz">
  <div class="content-wrapper">
    <header>
      <i class="icon iconfont icon-arrow_lift" @click="goNext()"></i>
      向{{doctorName}}医生提问
    </header>
    <section>
      <div class="select-illness-wrapper" :class="{'active': active}" @click="selectIllness">
        <h2 class="select-title">选择病种</h2>
        <div class="arrow-img">
          <span class="ill-type">{{illnessType}}</span>
          <img src="./arrow.png" alt="" >
        </div>
      </div>
    </section>
    <section>
      <div class="desc-wrapper">
        <h2 class="title">病情描述</h2>
        <div>
          <textarea type="textarea" rows="5" v-model="desc" autocomplete="off" validateevent="true" class="el-textarea__inner" maxlength="200" placeholder="请详细描述您的症状，疾病和身体状况，便于医生能准确为您作出判断。">
          </textarea>
        </div>
        <div class="textarea-num">可输入{{num}}字</div>
      </div>
    </section>
    <section>
      <div class="img-upload-wrapper">
        <h2 class="title">图片上传</h2>
        <div class="img-upload">
          <div class="img-box box">
            <img src="./1_03.jpg" width="75" height="75">
            <i class="icon iconfont icon-jian"></i>
          </div>
          <div class="add-box box">
            <img src="./add_05.jpg" width="75" height="75">
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="btn-pay">立即支付10元</div>
  <div class="popover" :class="{'popover-active': active}" @click.self="selectIllnessType(-1,'')">
    <ul class="popover-layer">
      <li class="popover-list" :class="{'popover-list-active': currentType === index}" v-for="(li,index) in illnessList" @click.stop="selectIllnessType(index, li.title)">
        <div class="item">
          <span class="list-text">{{li.title}}</span>
          <i class="icon iconfont icon-icon-big-gou"></i>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        doctorName: this.$store.state.doctor.substr(0, 1),
        num: 200,
        desc: '',
        currentType: -1,
        active: false,
        illnessType: '',
        illnessList: [
          {
            title: '心脑血管'
          },
          {
            title: '心内科'
          },
          {
            title: '神经外科'
          },
          {
            title: '神经内科'
          },
          {
            title: '妇科'
          },
          {
            title: '便秘'
          },
          {
            title: '其他儿科常见问题'
          }
        ]
      }
    },
    watch: {
      desc: function(val) {
        this.num = 200 - val.length
      }
    },
    created() {},
    methods: {
      selectIllnessType(index, title) {
        this.illnessType = title
        this.currentType = index
        this.active = false
      },
      goNext() {
        this.$router.push({name: 'Search'})
      },
      selectIllness() {
        this.active = !this.active
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import url('../../common/less/index.less');
.quiz{
  position: relative;
  height: 100%;
  background: #fff;
  .title{
    margin: 10px 0;
    font-size: 16px;
  }
  header{
    background: #333;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    .icon-arrow_lift{
      position: absolute;
      left: 0;
      padding: 0 10px;
    }
  }
  section{
    background: #fff;
    border-bottom: 6px solid #EFEFF4;
    &:last-child{
       border-bottom-color: transparent;
     }
  }
  .select-illness-wrapper{
    position: relative;
    display: flex;
    height: 70px;
    margin: 0 15px;
    align-items: center;
    justify-content: space-between;
    .select-title{
      line-height: 1;
      font-size: 16px;
    }
    .arrow-img{
      .ill-type{
        margin-right: 10px;
      }
      img{
        width: 16px;
        height: 9px;
      }
    }
  }
  .active{
    img{
      transform: rotate(180deg);
    }
  }
  .desc-wrapper,.img-upload-wrapper{
    margin: 0 15px;
    overflow: hidden;
  }
  .desc-wrapper{
    .el-textarea__inner{
      width: 96%;
      line-height: 20px;
      font-size: 13px;
      border: none;
      resize: none;
      outline: none;
    }
    .textarea-num{
      margin-bottom: 10px;
      text-align: right;
      font-size: 12px;
      color: #bcbcbc;
    }
  }
  .img-upload-wrapper{
    .img-upload{
      margin-bottom: 20px;
      .box{
        display: inline-block;
        img{
          margin-top: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }
      }
      .img-box{
        position: relative;
        .icon-jian{
          position: absolute;
          right: 4px;
          top: 4px;
          font-size: 18px;
          color: red;
          background: #fff;
          border-radius: 50%;
        }
      }

    }
  }
  .btn-pay{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: @base-blue;
    color: #fff;
  }
  .popover{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 666;
    background-color: rgba(20, 20, 20, 0.3);
    transition: all 0.5s;
    visibility: hidden;
    .popover-layer{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0;
      background: #fff;
      transition: height 0.5s;
      .popover-list{
        box-sizing: border-box;
        &:last-child{
          .item{
            .border-none();
          }
         }
      }
      .item{
        box-sizing: border-box;
        margin: 0 15px;
        display: flex;
        height: 50px;
        line-height: 50px;
        color: #666;
        .border-1px();
         .list-text{
           flex: 1;
         }
         .icon{
           flex: 0 0 20px;
           width: 20px;
           visibility: hidden;
         }
      }
    }
  }
  .popover-active{
    visibility: visible;
    transition: height 0.5s;
    .popover-layer{
      height: 350px;
      transition: height 0.5s;
      .popover-list-active{
        background: #f4f4f4;
        .item{
          color: @base-blue;
          .icon{
            visibility: visible !important;
          }
        }
      }
    }
  }
}


</style>
