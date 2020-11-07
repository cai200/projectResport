<template>
    <div class="setting">
      <div class="s_header">
        <el-button size="mini"  type="success"  @click="addGroup">新增团队</el-button>
      </div>
      <div style="padding:20px">
        <el-table :data="allData" height="400"  v-loading="loading1">
          <el-table-column prop="index" label="序号" >
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column prop="index" label="江湖发布令" >
            <template slot-scope="scope">
              <span style="color: #3399ff" @click="publicBtn(scope.row)">发布任务令</span>
            </template>
          </el-table-column>
          <el-table-column prop="groupName" label="团队名">
            <template slot-scope="scope">
              <span style="color:#3399ff;cursor:pointer;padding:10px;border-bottom:1px solid #3399ff" @click="goResport(scope.row.groupName)">{{scope.row.groupName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="groupCreat" label="创建人">
          </el-table-column>
          <el-table-column prop="creatDate" label="创建日期" width="200px" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="operation" label="操作" >
            <template slot-scope="scope">
              <i class="el-icon-delete dele"
                 style="color:red;cursor:pointer"
                 @click=" checkAccess(scope.row,'group')"></i>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-dialog
        title="新增团队"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="团队名称">
            <el-input size="mini" placeholder="输入团队名" v-model="form.grpupName"></el-input>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveAdd">确 定</el-button>
  </span>
      </el-dialog>
     <!-- 添加成员-->
      <el-dialog
        title="新增成员"
        :visible.sync="mebberDialogVisible"
        width="30%"
      >
        <div v-loading="saveUserLoad">
        <el-form ref="form" :model="form" label-width="80px" >
          <el-form-item label="添加角色">
            <el-select size="mini"
                       placeholder="选择成员角色"
                       style="width: 100%"
                       multiple
                       v-model="form.groupRole"
                       value-key="userName"
            >
              <el-option v-for="(item,i) in groupRoles"
                         :label="item"
                         :value="item"
                         :key="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加成员">
            <el-select size="mini"
                       placeholder="选择团队成员"
                       style="width: 100%"
                       multiple
                       v-model="form.groupMember"
                       value-key="userName"
            >
              <el-option v-for="(item,i) in members"
                         :label="item.userName"
                         :value="item"
                         :key="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="mebberDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveMember">确 定</el-button>
  </span>
      </el-dialog>
      <!--任务令弹窗-->
      <el-dialog
        title="任务令"
        :visible.sync="taskCommand"
        width="55%"


      >
        <el-button size="mini" type="success" @click="addTask">增加</el-button>
       <el-table :data="taskData" height="270px" v-loading="taskLoad">
         <el-table-column  label="序号" width="50px">
           <template slot-scope="scope">
             {{scope.$index+1}}
           </template>
         </el-table-column>

         <el-table-column prop="taskDate" label="周报日期/周">
           <template slot-scope="scope">
             <el-date-picker
               v-model="taskdate[scope.$index]"
               type="daterange"
               size="mini"
               @change="taskDateselect(taskdate[scope.$index],scope.row)"
               format="yyyy 年 MM 月 dd 日"
               value-format="yyyy-MM-dd"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>
           </template>
         </el-table-column>
         <el-table-column prop="taskMessage" label="备注留言" width="160px">
           <template slot-scope="scope">
             <el-input v-model="scope.row.taskMessage"
                       type="textarea"
                       placeholder="请输入留言"
                       :rows="2"></el-input>
           </template>
         </el-table-column>
         <el-table-column label="操作" width="50px">
           <template slot-scope="scope">
           <i class="el-icon-delete dele"
              style="color:red;cursor:pointer"
              @click=" deleTask(scope.$index)"></i>
           </template>
         </el-table-column>
       </el-table>

        <span slot="footer" class="dialog-footer">
    <el-button @click="taskCommand = false">取 消</el-button>
    <el-button type="primary" @click="publicTask">发 布</el-button>
  </span>
      </el-dialog>
      <el-drawer
        :title="drawerTile"
        :visible.sync="drawer"
        :direction="direction"
        size="50%"
        @open="getUser"
       >
       <div style="padding:10px">
         <el-input size="mini" style="width:200px" placeholder="输入名字/角色搜索" v-model="searchMember"></el-input>
           <el-button size="mini"  type="success" style="position: relative;left:20px;" @click="mebberDialogVisible=true">新增</el-button>
           <div>
             <el-table :data="userData.filter(data => !searchMember || data.userName.includes(searchMember)||data.groupRole.includes(searchMember))" height="550"
                       v-loading="loading"
                       element-loading-text="数据加载中"
             >
               <el-table-column prop="index" label="序号" >
                 <template slot-scope="scope">
                   {{scope.$index+1}}
                 </template>
               </el-table-column>

               <el-table-column prop="userName" label="姓名">
               </el-table-column>
               <el-table-column prop="groupName" label="所属团队" >
               </el-table-column>
               <el-table-column prop="groupRole" label="角色">
               </el-table-column>

               <el-table-column  label="操作">
                 <template slot-scope="scope">
                   <i class="el-icon-delete dele"
                      style="color:red;cursor:pointer"
                      @click=" checkAccess(scope.row,'member')"></i>
                 </template>
               </el-table-column>
             </el-table>
           </div>
       </div>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data() {
            return {
              dialogVisible:false,
              loading:false,
              loading1:false,
              drawer:false,
              mebberDialogVisible:false,
              taskCommand:false,//任务令
              taskLoad:false,
              saveUserLoad:false,
              taskdate:[],
              taskData:[],
              direction:"rtl",
              drawerTile:"",
              user:this.$store.getters.startlogin.user,
              employeeID:this.$store.getters.startlogin.employeeID,
              userData:[],
              searchMember:"",
              AccessUserData:[],
          allData:[
               // {groupName:"xx",groupCreat:"xxx",creatDate:"xxxx"}
              ],
              form:{
                grpupName:'',
                groupMember:[],
                groupRole:""
              },
              groupRoles:["PM","Tourists","SE","member"],
              members:[
                {userName:"蔡永生",employeeID:"1234"},
                {userName:"朱才贤",employeeID:"1234",},
                {userName:"张翔",employeeID:"1234"},
                {userName:"陆露",employeeID:"1234"},
                {userName:"梁美芬",employeeID:"1234"},
                {userName:"谢星星",employeeID:"1234"},
                {userName:"杨建华",employeeID:"1234"},
                {userName:"陶嘉伟",employeeID:"1234"},
                {userName:"李莲",employeeID:"1234"},
                {userName:"周小林",employeeID:"1234"},

              ]
            }
        },
        methods: {
          addGroup(){
                this.dialogVisible=true
          },
          saveAdd(){
            this.dialogVisible = false
            let saveData=[];
            saveData.push(
              {groupName:this.form.grpupName,groupCreat:this.user,employeeID:this.$store.getters.startlogin.employeeID,creatDate:this.common.setTime()}
            )
            this.loading1=true
            this.axios.post('/projectResport/saveGroup',JSON.stringify({id:saveData})).then((res)=> {
              this.loading1=false
              this.$message({
                type: "success",
                message: res.data
              })
              this.getGroup();
            }).catch((res)=>{
              this.$message({
                type: "error",
                message: res.message
              })
            })
          },
          saveMember(){
            let reNameCheck=""
            let val=this.form;
            val.groupMember.forEach((item1,i)=>{
            this.userData.forEach((item)=>{
                  if (item.userName==item1.userName) {
                    reNameCheck+=item.userName+" "
                  }
                })
            })
            console.log(reNameCheck)
            if (reNameCheck!="") {
              this.$message({
                type: "warning",
                message:reNameCheck+"已经存在权限"
              })
            }else{

            val.groupMember.forEach((item,i)=>{
              item.grpupName=this.drawerTile;
              item.groupRole=val.groupRole;
              item.innerTime=this.common.setTime();

            })
              this.saveUserLoad=true;
            this.axios.post('/projectResport/saveUser',JSON.stringify({id:val.groupMember})).then((res)=> {
             this.saveUserLoad=false;
             this.mebberDialogVisible=false

              this.$message({
                type: "success",
                message: res.data
              })
                 this.getUser();
            }).catch(()=> {
              this.$message({
                type: "error",
                message: res.message
              })
            })
            }
          },
          getGroup(){
            this.loading1=true
            this.axios.post('/projectResport/readGroup',JSON.stringify({id:[]})).then((res)=> {
              this.allData=res.data
              this.loading1=false
            }).catch((res)=> {
              this.$message({
                type: "error",
                message: res.message
              })
            })
          },
          //获取团队用户数据
          getUser(){

            this.loading=true
            this.axios.post('/projectResport/readUser',JSON.stringify({id:[]})).then((res)=> {
             this.AccessUserData=res.data
             // this.userData=res.data
              this.setUserTableData(res.data)
              this.loading=false
            }).catch((res)=> {
              this.$message({
                type: "error",
                message: res.message
              })
            }).catch(()=> {
              this.$message({
                type: "error",
                message: res.message
              })
            })
          },
          //团队空间已经加入的用户展示
          setUserTableData(arry){
            this.userData=[]
            arry.forEach((item,i)=>{
              if (item.groupName==this.drawerTile){
                this.userData.push(item);

              }
            })
          },
          //返回单个用户
          getUserAccess(){
            let json={}
            this.AccessUserData.forEach((item)=>{
              if (item.userName==this.user) {
                json = item
              }
            })
            return json
          },
          //目前因为用户列表需要点开抽屉才能获取，所以删除团队这个不能进行，需要另外鉴权。
          checkAccess(e,type){
           // this.getUser();
             let j=0;
            this.AccessUserData.forEach((item)=> {
              if (item.groupName == e.groupName && item.userName == this.user && item.groupRole == "root" ||
                item.groupName == "all" && item.userName == this.user && item.groupRole == "root") {
                j++
              }
            })
              if (j>0) {
                this.dele(e,type)
              }else{
                this.$message({
                  type: "warning",
                  message:"只有项目管理员才有权限删除"
                })
              }


          },
         goResport(e){
                 this.drawer=true
                this.drawerTile=e
         },
     dele(e,type){
       return new Promise((result, reject) => {
         this.$confirm('一旦删除数据将永久消失，是否需要继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           result("success")
         }).catch(() => {
           reject()
         })
       }).then((res) => {
         console.log(res)
         const load = this.$loading({
           lock: true,
           text: '正在删除中请耐心等待',
           spinner: 'el-icon-loading',
           background: 'rgba(0, 0, 0, 0.7)'
         });
         if (type=="group") {
           //删除团队连同所有成员删除
           this.axios.post('/projectResport/deleGroup',JSON.stringify({id:e.id,groupName:e.groupName})).then((res)=> {
             load.close();
             this.$message({
               type: "success",
               message: res.data
             })
             this.getGroup();
           }).catch((res)=> {
             this.$message({
               type: "error",
               message: res.message
             })
           })
         }else{
           this.axios.post('/projectResport/deleUser',JSON.stringify({id:e.id})).then((res)=> {
             load.close();
             this.$message({
               type: "success",
               message: res.data
             })
             this.getUser();
           }).catch((res)=> {
             this.$message({
               type: "error",
               message: res.message
             })
           })
         }

       }).catch(() => {
         //执行取消操作的代码--对应reject（）
       })
    },
          taskDateselect(arry,e){
            e.dateS=arry[0];
            e.dateE=arry[1];
          },
          addTask(e){
            this.taskData=[]
            this.taskData.push({
              taskCreat:this.user,
              groupName:e.groupName,
              dateS:"",
              dateE:"",
              creatTime:""
            })
          },
          deleTask(id){
            this.taskData.splice(id, 1)
          },
          publicBtn(e){

            if (this.getUserAccess().groupRole[0]=="root"){
              this.taskCommand=true
              this.addTask(e)
            }else{
              this.$message({
                type: "warning",
                message: "您无权限发布任务令！"
              })
            }

          },
          publicTask(){

          let task={
              taskCreat:this.user,
              employeeID:this.employeeID,
              groupName:this.taskData[0].groupName,
              taskCommand :this.taskData ,
              creatTime:this.common.setTime()

            }
            this.taskLoad=true
            this.axios.post('/projectResport/saveTaskCammand',JSON.stringify({id:task})).then((res)=> {
               this.taskLoad=false
              this.taskCommand=true
              this.$message({
                type: "success",
                message: "发布任务令"+res.data
              })

            }).catch((res)=> {
              this.$message({
                type: "error",
                message: res.message
              })
            })

          },
    },
        mounted() {
        this.getGroup();
        this.getUser()
        }
    }
</script>

<style scoped>
  /deep/ :focus{outline:0;}
  .s_header{
   border-bottom:1px solid #ccc;padding:20px
  }
</style>
