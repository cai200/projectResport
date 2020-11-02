<template>
    <div class="group">
      <div style="padding:20px">
        <el-input v-model="search" clearable size="mini" style="width: 200px;" placeholder="输入团队名/名字"></el-input>
      </div>
      <div style="padding:10px">
        <el-table :data="allData.filter(data => !search || data.groupName.includes(search)|| data.groupCreat.includes(search))" height="400"  v-loading="loading">
          <el-table-column prop="index" label="序号" >
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <!--<el-table-column  label="操作空间" >-->
            <!--<template slot-scope="scope">-->
           <!--<span style="color:#3399ff;cursor:pointer;padding:10px;border-bottom:1px solid #3399ff"-->
                <!--&gt;进入周报空间</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="groupName" label="团队名">
            <template slot-scope="scope">
              <u style="color:#3399ff;cursor:pointer;" @click="checkAccess(scope.row)">
                {{scope.row.groupName}}
              </u>
            </template>
          </el-table-column>
          <el-table-column prop="groupCreat" label="创建人">
          </el-table-column>
          <el-table-column prop="creatDate" label="创建日期" width="200px" :show-overflow-tooltip="true">
          </el-table-column>

        </el-table>

      </div>


    </div>
</template>

<script>
    export default {
        name: "group",
        data() {
            return {
              loading:false,
              allData:[

                ],
              user:this.$store.getters.startlogin.user,
              search:""
            }
        },
        methods: {
          dele(e){
            console.log(e)
          },
          goResport(e){

            let g=this.$router.resolve({
              path:"/resport",
              query:{
                groupName:e.groupName
              }
            })
           window.open(g.href,"_blank")
          },
          //获取团队用户数据
          checkAccess(e){
           this.axios.post('/projectResport/readUser',JSON.stringify({id:[]})).then((res)=>{
            let val=res.data;
            let j=0
            val.forEach((item)=>{
              if (item.groupName==e.groupName&&item.userName==this.user&& item.groupRole !== ""||
                item.groupName=="all"&&item.userName==this.user&& item.groupRole == "root") {
                j++
              }
            })
             if (j>0) {
               this.goResport(e)
             }else{
               this.$message({
                 type: "warning",
                 message:"您无权限进入，请联系本项目PM开放权限"
               })
             }
           });

          },
          getGroup(){
            this.axios.post('/projectResport/readGroup',JSON.stringify({id:[]})).then((res)=> {
              this.allData=res.data
            })
          },
        },
        mounted() {
           this.getGroup()
        }
    }
</script>

<style scoped>

</style>
