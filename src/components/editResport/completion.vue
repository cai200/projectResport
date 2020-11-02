<template>
    <div class="completion">
     <div style="padding:20px;">
      <el-button size="mini" type="success" @click="downWeeks($event)">下载周报</el-button>
       <el-button size="mini" type="success" @click="downWeeks($event)">下载月报</el-button>
       <el-button size="mini" type="success" @click="downWeeks($event)">下载年报</el-button>
     </div>
      <el-table :data="tableData" height="500"  v-loading="loading" style="padding: 0px;margin: 0px">
        <el-table-column prop="index" label="序号" >
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="projectTask" label="项目任务">
        </el-table-column>
        <el-table-column prop="details" label="任务明细" width="200px" :show-overflow-tooltip="true">

        </el-table-column>
        <el-table-column prop="dateS" label="开始时间" >
        </el-table-column>
        <el-table-column prop="dateE" label="结束时间" >
        </el-table-column>
        <el-table-column prop="finshDay" label="完成天数" >
        </el-table-column>
        <el-table-column prop="status" label="完成状态" >
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
  import {export_json_to_excel} from '../../assets/js/Export2Excel.js'
    export default {
        name: "completion",
        data() {
            return {
              tableData:[],
              loading:false
            }
        },
      props:["groupName"],
        methods: {
          //获取团队用户数据
          getUser(){
            this.axios.post('/projectResport/readUser',JSON.stringify({id:[]})).then((res)=> {

             this.setTableData(res.data)
            })
          },
          setTableData(arry){
           this.tableData=[]
            arry.forEach((item,i)=>{
              if (item.groupName==this.groupName){
                this.tableData.push(item)
              }
            })
          },
    downWeeks(e){
            let type=""
      if (e.target.innerText=="下载周报") {
           type = "本周周报"
      }else if (e.target.innerText=="下载月报") {
        type = "月报"
      }else{
        type = "年报"
      }
      this.axios.post('/projectResport/downWeeks',JSON.stringify({sheetName:type})).then((res)=> {
      console.log(res)
     //  let json= ;
       let arry=[
         {filterVal:["id",	"userName",	"employeeID",	"projectTask",	"details",	"dateS",	"dateE",	"finshDay",	"status",	"groupName"],
           tableData:res.data,
           tHeader:['序号','姓名', '工号', '项目任务',"项目明细","开始时间","结束时间","完成天数","状态","项目组名称"]
         }];

       export_json_to_excel(arry,["周报"],type)
      })
    }
        },
        mounted() {
         this. getUser();
        }
    }
</script>

<style scoped>

</style>
