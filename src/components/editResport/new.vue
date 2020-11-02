<template>
    <div class="new" >
     <div class="n_title">
      <el-button size="mini" type="success" @click="addNew('new')">新增本周任务</el-button>
       <el-button size="mini" type="success" @click="saveNew">保存</el-button>

     </div>
      <el-table :data="newWeeks" height="260px" class="t_btn2">
        <el-table-column prop="index" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="projectTask" label="项目任务" width="200px">
          <template slot-scope="scope">
           <el-input v-model="scope.row.projectTask"
                     type="textarea"
                     placeholder="请输入项目"
                     :rows="2"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="任务明细">
          <template slot-scope="scope">
            <el-input v-model="scope.row.details"
                      type="textarea"
                       placeholder="请输入任务明细"
                       :required="true"
                      :rows="2"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" >
          <template slot-scope="scope">
            <el-date-picker
              v-model="newdatev[scope.$index]"
              @change="newselectDate(newdatev[scope.$index],scope.row)"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="完成天数" width="80px">
          <template slot-scope="scope">
            <span v-if="scope.row.dateE==''&&scope.row.dateS==''">0</span>
            <span v-else-if="dateDiffer (scope.row.dateE, scope.row.dateS)>0">{{scope.row.finshDay=dateDiffer (scope.row.dateE, scope.row.dateS)}}</span>
          <span v-else style="color:red">时间填写错误</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作" width="50px">
          <template slot-scope="scope">
           <i class="el-icon-delete dele" @click="deleteNew('new',scope.$index,scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="n_title">
        <el-button size="mini" type="success" @click="addNew('next')">新增下周计划</el-button>
        <el-button size="mini" type="success" @click="saveNext">保存</el-button>
      </div>
      <el-table :data="nextWeeks" height="260px">
        <el-table-column prop="index" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="projectTask" label="项目任务" width="200px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.projectTask"
                      type="textarea"
                      placeholder="请输入项目"
                      :rows="2"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="任务明细">
          <template slot-scope="scope">
            <el-input v-model="scope.row.details"
                      type="textarea"
                      placeholder="请输入任务明细"
                      :rows="2"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" >
          <template slot-scope="scope">
            <el-date-picker
              v-model="nextdatev[scope.$index]"
              type="daterange"
              @change="nextselectDate(nextdatev[scope.$index],scope.row)"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="完成天数" width="80px">
          <template slot-scope="scope">
            <span v-if="scope.row.dateE==''&&scope.row.dateS==''">0</span>
            <span v-else-if="dateDiffer (scope.row.dateE, scope.row.dateS)>0">{{scope.row.finshDay=dateDiffer (scope.row.dateE, scope.row.dateS)}}</span>
            <span v-else style="color:red">时间填写错误</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作" width="50px">
          <template slot-scope="scope">
            <i class="el-icon-delete dele"

               @click="deleteNew('',scope.$index,scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "new",
      props:["groupName"],
        data() {
            return {
              newWeeks:[
                {userName:this.$store.getters.startlogin.user,employeeID:this.$store.getters.startlogin.employeeID,projectTask:"",details:"",dateS:'',dateE:"",finshDay:"",status:"close",groupName:this.groupName},
             //   {creatUser:"",projectTask:"",details:"",dateS:'',dateE:"",finshDay:"",status:"close"},

              ],
              nextWeeks:[
                {userName:this.$store.getters.startlogin.user,employeeID:this.$store.getters.startlogin.employeeID,projectTask:"",details:"",dateS:'',dateE:"",finshDay:"",status:"open",groupName:this.groupName},
               // {creatUser:"",projectTask:"",details:"",dateS:'',dateE:"",finshDay:"",status:"open"},

              ],
              newdatev:[],
              nextdatev:[],
              dateS:'',
              dataE:'',
              user:this.$store.getters.startlogin.user,
              employeeID:this.$store.getters.startlogin.employeeID,
            }
        },
        methods: {
          addNew(type) {
            if (type == "new") {
              this.newWeeks.push(
                {userName: this.user,employeeID:this.employeeID ,projectTask: "", details: "", dateS: '', dateE: "", finshDay: "", status: "close",groupName:this.groupName},
              )
            } else {
              this.nextWeeks.push(
                {userName: this.user,employeeID:this.employeeID , projectTask: "", details: "", dateS: '', dateE: "", finshDay: "", status: "close",groupName:this.groupName},
              )
            }

          },

          deleteNew(type, id,row) {
            if (row.finshDay==0){
              if (type == "new") {
                this.newWeeks.splice(id, 1)
              } else {
                this.nextWeeks.splice(id, 1)
              }
            } else{


            return new Promise((result, reject) => {
              this.$confirm('此操作将永久删除行数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                result()
              }).catch(() => {
                reject()
              })
            }).then((res) => {
              if (type == "new") {
                this.newWeeks.splice(id, 1)
              } else {
                this.nextWeeks.splice(id, 1)
              }
              //执行确认操作的代码--对应result（）
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              //执行取消操作的代码--对应reject（）
            })

            }


          },
          saveNew(){

            return new Promise((result, reject) => {
              this.$confirm('一旦保存将不可更改，是否需要继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                result()
              }).catch(() => {
                reject()
              })
            }).then((res) => {
              const loading = this.$loading({
                lock: true,
                text: '正在保存中请耐心等待',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              this.axios.post('/projectResport/newWeeks',JSON.stringify({id:this.newWeeks})).then((res)=>{
               loading.close();
                this.$message({
                  type:"success",
                  message:"保存成功"
                })
                this.update.$emit("update","update")
              })
            }).catch(() => {
              //执行取消操作的代码--对应reject（）
            })



          },
          saveNext(){
            this.axios.post('/projectResport/nextWeeks',JSON.stringify({id:this.nextWeeks})).then((res)=>{

            })
          },
          newselectDate(arry,e){
          e.dateS=arry[0];
            e.dateE=arry[1];
          //  console.log( this.dateDiffer (e.dateS, e.dateE))
          },
          nextselectDate(arry,e){
            e.dateS=arry[0];
            e.dateE=arry[1];

          },
          //两个日期间差值
          dateDiffer (sDate1,  sDate2) {
         // let  iDays  = (( Date.parse(sDate1) -  Date.parse(sDate2))/  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
            return  this.common.dateDiffer1(sDate1,sDate2)
          },
          getXlsData(){
            this.axios.post('/projectResport/xlsData',JSON.stringify({id:this.nextWeeks})).then((res)=>{
                 console.log(res)
            })
          }
        },
        mounted() {
        this.getXlsData()
        }
    }
</script>

<style scoped>
.n_title{
  padding:10px;
}
  .dele{
    color:red;
    cursor:pointer
  }

/*.t_btn2 /deep/ .el-table th, .el-table tr {*/
   /*background: transparent !important;*/
  /*}*/



</style>
