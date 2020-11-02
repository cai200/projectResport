<template>
    <div class="A">
      <div style="width: 100%;height: 600px;">
   <split-pane v-on:resize="resize" :min-percent='20':max-percent='50' :default-percent='30' split="vertical">
     <template slot="paneL">

     </template>
     <template slot="paneR">
       Bdsadsmadsla
     </template>

   </split-pane>
      </div>
  </div>
</template>

<script>
  import  b from '../components/B'
    export default {
        name: "A",
        data(){
          return{
            v1:"123"
          }

      },
      mounted() {
        this.myecharts()
      },
      methods:{
        rou(){
          this.$router.push({
            path:"/b",

            components:b,
          })
        },
        resize(res){
          console.log(res)
        },
        myecharts(){
          let charts=document.querySelector("#myecharts");
          var option = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data:['销量']
            },
            xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          };
          charts.setOption(option)
        }
       },


    }

</script>

<style scoped>

</style>
