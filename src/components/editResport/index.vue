<template>
    <div class="edit" style="height: 100%;">
     <div style="width: 95%;position: relative;left:2.5%;height:95%;top:2.5%;border: 1px solid #ccc;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
        <el-tab-pane label="新建周报" name="first" >

          <newR :groupName="groupName"></newR>

        </el-tab-pane>
        <el-tab-pane label="历史周报" name="second">
         <history :groupName="groupName"></history>
        </el-tab-pane>
        <el-tab-pane label="查完成度" name="three">
         <completion :groupName="groupName"></completion>
        </el-tab-pane>
      </el-tabs>
     </div>
    </div>
</template>

<script>
  import newR from '../../components/editResport/new'
  import history from '../../components/editResport/history'
  import completion from '../../components/editResport/completion'
    export default {
        name: "edit",
      components:{
         newR,
        history,
        completion
      },
        data() {
            return {
              activeName:"first",
              groupName:this.$route.query.groupName
            }
        },
        methods: {
          handleClick(){

          }
        },
        mounted() {
          this.common.setXueh();
        }
    }
</script>

<style scoped lang="less">
.e_new{
  width:100%;
  height:100%;

}
  .edit{
    background-image: url("../../assets/img/back.jpg");
  }

</style>
