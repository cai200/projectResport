<template>
    <div class="resume">
      <div class="resume_w">
      <div class="resume_n">
           <p>{{title}}</p>
           <div class="personalInformation">
             <div class="personalImg">
                <img src="../../assets/img/cai.jpg" />
             </div>
             <div class="information">
               <ul v-for="(item,i) in informations" :key="i">
                 <li style="width:65px;font-weight: bold; text-align:justify;  text-align-last:justify" >
                   {{item.title}}
                 </li>
                  <li style="width:160px;"><input type="text" v-model="item.value" /></li>
                  <li  style="width:65px;font-weight: bold; text-align:justify;  text-align-last:justify">
                     {{item.title1}}
                  </li>
                  <li><input type="text" v-model="item.value1" style="width:100px"/></li>
               </ul>
             </div>
        </div>

        <div v-for="(item,i) in moduls" class="modul" :key="i">
          <div class="modul_title">{{item.title}}</div>
          <div class="modul_line"></div>
           <div class="modul_content" v-if="item.title=='技术栈'">
             <el-form ref="form" :model="item1" label-width="80px" v-for="(item1,j) in item.children" :key="j">
               <el-form-item :label="item1.title" >
                 {{item1.string}}
               </el-form-item>
             </el-form>
           </div>
          <div class="modul_content" v-if="item.title=='工作经历'">
            <div v-for="(item1,j) in item.children " :key="j">
              <el-row>
                <el-col :span="7"><div style="text-align: left;margin-left:20px;font-size:14px">{{item1.time}}</div></el-col>
                <el-col :span="9"><div style="text-align: center;font-size: 14px">{{item1.company}}</div></el-col>
                <el-col :span="8"><div style="text-align:right;margin-right:20px;font-size:14px">{{item1.position}}</div></el-col>
              </el-row>
              <el-form ref="form" :model="item2"
                       label-width="40px" v-for="(item2,x) in item1.children " :key="x">
                <el-form-item  >
                  <label>{{'('+Number(x+1)+')'+item2.string}}</label>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="modul_content" v-if="item.title=='项目经验'">
            <!--公司经历-->
            <div v-for="(item1,j) in item.children " :key="j">
              <el-row>
                <el-col :span="7"><div style="text-align: left;margin-left:20px;font-size:14px;font-weight: bold">{{item1.time}}</div></el-col>
                <el-col :span="9"><div style="text-align: center;font-size: 14px;font-weight: bold">{{item1.company}}</div></el-col>
                <el-col :span="8"><div style="text-align:right;margin-right:20px;font-size:14px;font-weight: bold">{{item1.position}}</div></el-col>
              </el-row>
          <!-- 公司项目经历-->
              <el-form ref="form" :model="item2"
                       label-width="40px" v-for="(item2,x) in item1.children " :key="x">
                <el-form-item  >
                 <!-- 项目标题-->
                  <el-row>
                    <el-col :span="24">
                      <div>
                        <label style="position: relative;font-size:14px;font-weight: bold" >{{''+Number(x+1)+'、'+item2.project}}</label>
                        <label style="float: right;position: relative;right:150px;font-size:12px">难度系数<label style="color:red;" v-for="g in item2.star" :key="g"><i class="el-icon-star-on"/></label></label>
                      </div></el-col>
                  </el-row>
                <!--  项目内容-->
                  <el-row>
                    <el-col :span="24" v-for="(item3,v) in item2.projectTask " :key="v">
                      <div>
                        <label style="position: relative;font-size:14px;left:5px;" >{{'('+Number(v+1)+')'+item3.string}}</label>
                      </div></el-col>
                  </el-row>
                 总结:<br>
                  <el-row>
                    <el-col :span="24" v-for="(item4,b) in item2.Summary" :key="b" >
                      <div>
                        <label style="position: relative;font-size:14px;left:5px;"
                               >{{''+Number(b+1)+')'+item4.string}}</label>
                      </div></el-col>
                  </el-row>
                </el-form-item>
                <div style="width:100%;height:200px" v-if="item2.analyse">
                  <div id="myEcharts"  style="width:280px;height:200px;position: relative;left:50px">

                  </div>
                </div>

              </el-form>
            </div>
          </div>
         </div>
      </div>

    </div>
    </div>
</template>

<script>
    export default {
        name: "resume",
        data() {
            return {
              title:"蔡永生",
              informations:[
                {title:'民    族',value:'汉',title1:'出生年月',value1:'1993.06.12',},
                {title:'籍    贯',value:'广西玉林',title1:'身    高',value1:'169',},
                {title:'电    话',value:'15602830392',title1:'政治面貌',value1:'共青团员',},
                {title:'邮    箱',value:'1310675056@qq.com',title1:'毕业院校',value1:'桂林理工大学',},
                {title:'住    址',value:'广东省东莞市松山湖',title1:'学    历',value1:'本科',},
                {title:'求职意向',value:'前端开发工程师',title1:'',value1:'',},

              ],
              moduls:[
                {title:"技术栈",children:[
                  {title:"前端",string:'js,html/html5,css/css3,jquery,vue全家桶,小程序，移动端'},
                  {title:"后端",string:'springBoot,mysql,servlet,'},
                  {title:"其他",string:'gitHub.postman'}
        ],},
                {title:"工作经历",children:[
                    {time:"2017.3-7月",company:'美的制冷有限公司',position:"实习生",
                      children:[
                         {string:"协助按UI设计编写界面以及样式和交互逻辑代码编写；"},
                         {string:"学习编码规范。"},
                      ]
        },
                     {time:"2017.10-2019.1",company:'美的制冷有限公司',position:"前端工程师",
                       children:[
                         {string:"负责项目中由UI设计的界面编写，实现页面交互逻辑编写;"},
                         {string:"负责与后台做好数据接口的核对，共同完成项目功能的落地;"},
                         {string:"后续应用版本的迭代维护。"},
                      ]},
                    {time:"2019.3-至今",company:'中软国际科技服务有限公司(华为)',position:"前端工程师",children:[
                        {string:"负责华为项目工具的研发，完成客户定制的功能需求;"},
                        {string:"负责前后台对接，完成数据接口、结构的统一，并完成项目的功能落地;"},
                        {string:"负责指导新人独立完成项目开发，对相关技术问题进行引领解决;"},
                        {string:"后续工具版本的迭代维护。"},
                      ]}
                  ]},
                {title:"项目经验",
                  children:[
                    {time:"2017.3-7月",company:'美的制冷有限公司',position:"实习生",
                      children:[
                        {project:'美的门户网站(2018年7月-10月)',star:2,projectTask:[
                           {string:"维护商城界面，和需求变更做出的界面改变编码;"},
                            {string:"维护后台更新的数据与前台界面展示的匹配，打磨界面，提升用户体验。"},
                          ],
                          Summary:[{string:"123"},{string:"456"},],
                        },
                        {project:'美信软件(2018年10月-2019年1月)',star:2,analyse:false,projectTask:[
                            {string:"负责完成组长分发的前端页面任务，使用vue完成前端页面编写;"},
                            {string:"负责的部分前端交互数据，与后台对齐接口，数据结构，完成交互逻辑编写;"},

                          ],
                          Summary:[{string:""}],
                        },
                      ]
                    },
                    {time:"2019年3月-至今",company:'中软国际科技服务有限公司(华为)',position:"前端工程师",
                      children:[
                        {project:'智能温控选型工具(2019年4月-10月)',star:3,analyse:true,projectTask:[
                            {string:"技术构成:js，jQuery，vue,java，html，css,element-ui以及其他插件完成原生PC端开发;"},
                            {string:"本项目独自完成前后端开发，项目采用java web搭建，后台采用简单的servlet进行数据读取;"},
                            {string:"本项目主要完成型号的计算筛选，单型号的数据计算，批量的数据计算;实现中英文版本切换"},
                            {string:"本项目最终目标实现，数据的精确计算，实现报表的导出;"},
                            {string:"负责本项目的后期新型号公式算法维护，和应用bug修复，确保一线平稳运行项目。"},
                          ],
                          Summary:[
                            {string:"该项目实现难点在于大量初始化数据处理和各型号参数公式的处理，华为评为中等难度;"},
                            {string:"本项目初期没有对型号公式进行模块化处理，圈杂度很高，导致维护比较难，已经对算法进行了多次调整优化;"},
                            {string:"温控项目的自主开发，极大促进了对原生技术的掌握，为后期运用vue迭代需求提供了坚实的技术支持;"},
                          ],
                        },
                        {project:'3D环物展示平台(2019年8月-9月)',star:3,analyse:false,projectTask:[
                            {string:"协助按UI设计编写界面以及样式和交互逻辑代码编写"},
                            {string:"学习编码规范。"},
                          ],
                          Summary:[{string:""}],
                        },
                        {project:'案例查询工具(2019年10月-11月)',star:3,analyse:false,projectTask:[
                            {string:"协助按UI设计编写界面以及样式和交互逻辑代码编写"},
                            {string:"学习编码规范。"},
                          ],
                          Summary:[{string:""}],
                        },
                        {project:'配电可视化项目(2019年11月-2020-3月)',star:3,analyse:false,projectTask:[
                            {string:"协助按UI设计编写界面以及样式和交互逻辑代码编写"},
                            {string:"学习编码规范。"},
                          ],
                          Summary:[{string:""}],
                        },
                      ]
                    },
                  ],
                },
                {title:"个人荣誉"},
                {title:"个人评价"},

                ]
            }
        },
        methods: {
          myecharts(){

            let charts=this.echarts.init(document.querySelector("#myEcharts"))
            let option = {
              title: {
                text: '访问数据',
                textStyle:{					//---主标题内容样式
                  color:'#333',
                  fontSize:8,

                },
                padding:[10,0,0,80]
              },
              tooltip: {},
              legend: {
                data:[{name:'访问量',icon:'../../assets/img/back.jpg'}],
                left:'80%',
                itemWidth: 10,  // 设置宽度
                itemHeight: 10, // 设置高
                textStyle:{					//----图例内容样式
                  color:'#333',				//---所有图例的字体颜色
                  fontSize:8

                },
              },
              xAxis: {
                data: ["日访问量","月访问量","年访问量",],
              // axisLine: { //坐标轴标签字体样式设计
              // show: true,
              //   lineStyle: {
              //   color: '#58f3e1',
              // }



              },
              yAxis: {
                axisLabel: {
                  show: true,
                  interval: 0,
                  textStyle: {
                    color: '#333',
                    fontSize: 6

                  }
                }
              },
              series: [{
                name: '访问量',
                type: 'bar',
                barWidth: 20,
                data: [110, 1000, 8000,],
                label : {
                  show:true,              //是否显示数据
                  position:"top",         //显示位置，例如：柱状图顶部
                //  formatter:'{c}%',       //数据可显示为%，例如：30%
                  textStyle:{
                    color:'#333',
                    fontSize:8
                  } },
              }]
            };
            charts.setOption(option)
          }

        },
        mounted() {
        this.myecharts()
        }
    }
</script>

<style scoped lang="less">
  @resume_w:#ccc;
  @title_line:#ccc;
.resume{
  height:100%;
  .resume_w{
    width:795px;
    border:1px solid @resume_w;
    height: 98%;
    overflow-y:auto;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
  .resume_n{
    width:595px;
    //width:620px;
    height: auto;
    position:relative;
    left:100px;
    p{
      text-align: center;
      font-size: 20px;
      padding:5px;
      margin:5px;
      font-weight: bold;
    }
    .personalInformation{
      border-top: 1px solid  @title_line;
    //  border-bottom: 1px solid  @title_line;
      padding:5px;
      height:150px;
      ul{
        margin:0px;
        display:inline-block;
        list-style-type:none;
        font-size: 14px;
        padding: 0px;
        li{
          display:inline-block;
          list-style-type:none;
          padding:3px;
          input{
            width:100%;
            border:0px;
            outline: none;
            margin:0px;
            padding:0px;
          }
        }

      }
      .information{
      width:73%;
      position:relative;
      left:14px;
      font-size: 10px;
        float: left;
        .row{
          padding:2px;
        }
      }
      .personalImg{
        float: right;
        height:140px;
        width:100px;
        margin-right:20px;
        margin-top:5px;
       // border:1px solid red;
        img{
          height:140px;
          width:100px
        }
      }
    }
  }
  }
  .modul{
    height:auto;
    min-height: 100px;
    .modul_title{
      line-height:30px;
      border-bottom-right-radius: 15px;
      text-align: center;
      float:left;
      width:20%;
      background:#6495ED;
      color:#fff;
    }
    .modul_line{
      border-bottom:1px solid  @title_line;
      float:right;
      width:80%;
      height:30px;

      position: relative;
      top:-1px

    }
    .modul_content{

      p{
        label{
          font-size:8px;
        }
      }
      ul{
        display: inline-block;
        list-style-type: none;
        margin-left: 10px;

        li{
          display: inline-block;

        }
      }
    }

    /*&:first-child{*/
    /*margin-top:20px*/
  /*}*/
  }
}
  .el-form-item{
    margin: 0px !important;
  }
  .el-form-item__content{
    line-height: 30px !important;
  }
  .el-form-item__label{
    line-height: 30px !important;
  }

  .resume_w::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    scrollbar-arrow-color:red;

  }
  .resume_w::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
    scrollbar-arrow-color:red;
  }
  .resume_w::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
</style>
