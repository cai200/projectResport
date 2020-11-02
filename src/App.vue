<template>
  <div class="app">
<router-view ></router-view>
  </div>
</template>

<script>

  //import router from 'router'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{

  },
  methods: {

  },
    mounted(){
this.$store.dispatch("setLogin",{user:"蔡永生",employeeID:"wx69923"})

  }
}
</script>

<style >
html,body,#app {
  margin:0px;
  height:100%;
  font-family: "Microsoft YaHei";
}
.app{

  height:100%;
}
</style>
