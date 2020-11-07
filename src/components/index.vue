<template>
  <div class="index">
    <el-container style="height: 100%;" >
      <el-header style="background: #333">
        <div class="h_left">
        <ul  class="left">
          <li>项目周报管理平台</li>
        </ul>
          <ul class="right">
            <li><el-input size="mini"/></li>
            <li><i class="el-icon-user"/>&ensp;{{user}}</li>
          </ul>
        </div>

      </el-header>
      <el-main>
        <split-pane v-on:resize="resize" :min-percent='0' :default-percent='11' split="vertical">
          <template slot="paneL">
            <div class="aside">
              <p @click="item.event(item.path)" v-for="(item,i) in leftTags"
                 :key="i"
                 style="text-align: center;padding:0px;cursor:pointer"
                 :class="{dadas:claval==i}"
              >{{item.type}}</p>

            </div>
          </template>
          <template slot="paneR">
            <div style="width:99%;padding:1%;border:1px solid #ccc;height:99%;">
              <router-view></router-view>
           <!-- <edit></edit>-->
            </div>
          </template>
        </split-pane>
      </el-main>
    </el-container>
    <div >

    </div>
  </div>
</template>

<script>
  import  edit from './editResport'
export default {
  name: 'HelloWorld',
  components:{
    edit,
  },
  data () {
    return {
      leftTags:[
        {type:"团队空间", path:"/index/group",event:this.goRoute},
        {type:"团队设置", path:"/index/groupSet",event:this.goRoute},
        {type:"吐槽专区", path:"/index/groupSet",event:this.goRoute},
        {type:"娱乐专区", path:"/index/groupSet",event:this.goRoute},
        {type:"个人简历", path:"/resume",event:this.goSemuse},
        ],
      claval:-1,
      user:this.$store.getters.startlogin.user
    }
  },
  methods: {
    resize(){

    },
    goRoute(path){

      this.$router.push({
        path:path
      })
    },
    goSemuse(path){
      let location=this.$router.resolve({
        path:path,
      });
      window.open(location.href,'_blank')
    }
  },
  //监听路由变化
  watch:{
    $route(to,from){
      this.claval=to.meta.className
      //console.log(to ,from,this.$route.meta.className)
    }
  },
  //监听当前前往路由
  beforeRouteEnter(to,from,next){
    console.log(to.meta.className)
    next();

  },
  mounted() {
    this.common.setXueh();
    this.claval=this.$route.meta.className
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
  .index{
    height: 100%;
    background-image: url("../assets/img/back.jpg");
  }
  .dadas{
    color:#3399ff;
    cursor:pointer
  }
  .h_left{
    height:100%;
    width:100%;
   // line-height: 100%;
   .left{
      display:inline-block ;
      list-style-type: none;
      position:relative;
      top:5px;

    line-height: 100%;
      li{
        display:inline-block ;
        list-style-type: none;
        color: #fff;
      }
    }
    .right{
      display:inline-block ;
      list-style-type: none;
      position:relative;
      top:5px;
      float: right;
      line-height: 100%;
      li{
        display:inline-block ;
        list-style-type: none;
        color: #fff;
        padding-right:10px

      }
    }
  }
  .h_right{
    height:100%;
    float: right;
   position:relative;
    width:30%;
    top:-100px;
    // line-height: 100%;
    ul{
      display:inline-block ;
      list-style-type: none;
      position:relative;
      top:5px;

      // margin:0px;
      // height:100%;
      line-height: 100%;
      li{
        display:inline-block ;
        list-style-type: none;
        color: #fff;

      }
    }
  }
  .aside{
    color: #fff;
  }
</style>
