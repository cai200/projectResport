<template>
    <div class="historyResport">
      <div class="h_title">
        <el-date-picker
          v-model="date"
          type="daterange"
            size="mini"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input size="mini" style="width:200px" v-model="search"></el-input>
        <el-button size="mini" @click="removeData">清空数据库</el-button>
      </div>
      <el-table :data="showData" height="500"  v-loading="loading" style="padding: 0px;margin: 0px">
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
      <div class="block">

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "historyResport",
      props:["groupName"],
          data() {
            return {
              date:"",
              search:"",
              allData:[],
              showData:[],
               loading:false,
              total:0,
              pageSize:10,
              currentPage:1
            }
        },

        methods: {
          getXlsData(){
            this.loading=true
            this.axios.post('/projectResport/xlsData',JSON.stringify({id:this.nextWeeks})).then((res)=>{
           //  this.allData=res.data;
              this.setTableData(res.data)


            })
          },
          setTableData(arry){
            this.allData=[]
            arry.forEach((item,i)=>{
              if (item.groupName==this.groupName){
                this.allData.push(item)
              }
            })
            this.total=this.allData.length
            this.pageM(10,1)
            this.loading=false
          },
          handleSizeChange(e){
            this.pageM(e,this.currentPage)
          },
          handleCurrentChange(e){
            this.pageM(this.pageSize,e)
          },
          pageM(pageSize,currentPage){
            this.showData=[]
           this.allData.forEach((item,i)=>{
             if (i+1<=currentPage*pageSize&&i+1>(currentPage-1)*pageSize){
                this.showData.push(item)
             }
           })
          },
          removeData(){
            this.axios.post('/projectResport/emptyRowData',JSON.stringify({id:"本周周报"})).then((res)=>{
              this.$message({
                type: "success",
                message:res.data
              })
               this.getXlsData()
            })
          }

        },
        mounted() {
         this.getXlsData();
          this.update.$on("update",(mmg)=>{

            this.getXlsData();
          })
        }
    }
</script>


<style scoped>
  .h_title{
    padding:20px
  }
</style>
