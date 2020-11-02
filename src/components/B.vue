<template>
    <div class="B">
      <el-button @click="exportToExcel" ref="s">ggg</el-button>
      <el-button @click="exportToExcel1" ref="s">原生table</el-button>
      <table id="dd">
        <tr>
          <td rowspan="2">ss</td>
          <td colspan="5">dd</td>
          <!--<td rowspan="2">12</td>-->
          <!--<td >34</td>-->
          <!--<td>56</td>-->
          <!--<td>67</td>-->
        </tr>
        <tr>
          <td >12</td>
          <td >34</td>
          <td>56</td>
          <td>67</td>
          <td>1234</td>
        </tr>
      </table>
<User></User>
    </div>
</template>

<script>
 import {export_json_to_excel,export_table_to_excel} from './../assets/js/Export2Excel'
 import User from "./C"
    export default {
   components:{
     User
   },
      name: "B",
      data(){
        return{
          g:{},
          tableData1:[{index:"123",provinces:"123", orderMoney:"123", incomeMoney:"123",}],
          alldx:[
            {tHeader:['序号','省份', '投资总额', '收益总额'],
              filterVal:['index','provinces', 'orderMoney', 'incomeMoney'],
              tableData:[
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",},
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",}
                ],
          },
            {tHeader:['序号','省份', '投资总额', '收益总额'],
              filterVal:['index','provinces', 'orderMoney', 'incomeMoney'],
              tableData:[
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",},
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",}
              ],
            },
            {tHeader:['序号','省份', '投资总额', '收益总额'],
              filterVal:['index','provinces', 'orderMoney', 'incomeMoney'],
              tableData:[
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",},
                {index:"123fgdgsg",provinces:"123", orderMoney:"123", incomeMoney:"123",}
              ],
            },

           ]
        }
      },
      methods:{
        delet(e){
          return new Promise((result,reject)=> {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }) .then(() => {
              result()
            }).catch(()=>{
              reject()
            })
          }).then((res)=>{
            console.log(res)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
        }).catch((res)=>{
            console.log(res)
          })
      },

        exportToExcel() {
          let xlsName=["表1","表2"]
          export_json_to_excel(this.alldx,xlsName,'列表excel');
        },


          exportToExcel1() {
   let xlsName=["表1","表2"]
            export_table_to_excel("dd");
 },
        select1(e){
          console.log(e)
        }

      },
      mounted() {
        this.$nextTick(()=>{

        })

        console.log(this.$route.query.name)
      },
    }
    </script>
<style>
  table{
    border: 1px solid #333;
  }
  td{
    border: 1px solid #333;
  }
</style>
