<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column

      prop="prop"
      label="论文属性"
      width=400>
    </el-table-column>
    <el-table-column
      prop="info"
      label="相关信息">
    </el-table-column>
    <el-table-column
      prop="view"
      label="查看">
      <template v-slot="scope">

        <el-button
          v-if="scope.row.view == true"
          type="text"
          :disabled="scope.row.url == ''"
          @click="handleViewFile(scope.row.url)"
        > 查看 </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
  export default {

    created() {
      let paperTypeMap = new Map()
          .set("A","指南、标准、研究性原始论文")
          .set("B","综述性文献、讲座")
          .set("C","短篇报道")
          .set("其他","其他");
      let relatedAchievementsMap = new Map()
          .set("A","有相关专利，或有3篇以上中文相关论文或1篇外文相关论文，或市级政府采用证明")
          .set("B","有2篇中文相关论文")
          .set("C","有1篇中文相关论文")
          .set("无","无");
      let projectLevelMap = new Map()
          .set("A","国家级重大项目")
          .set("B","国家级重点项目")
          .set("C","国家级一般项目")
          .set("D","省部级重点项目")
          .set("E","省部级一般项目")
          .set("F","其他");
      if(this.$route.query.form){
          this.form = this.$route.query.form;
          this.tableData[0].info = this.form.impactFactor;
          this.tableData[1].info = this.form.retrieval;
          this.tableData[2].info = this.form.citations;
          this.tableData[3].info = paperTypeMap.get(this.form.paperType);
          this.tableData[4].info = relatedAchievementsMap.get(this.form.relatedAchievements);
          this.tableData[5].info = this.form.introduction;
          this.tableData[6].info = projectLevelMap.get(this.form.projectLevel);
          this.tableData[7].url = this.form.filePath;
          this.tableData[8].url = this.form.completedFilePath;
        }
    },

    data() {
      return {
        form:"",
        tableData: [{
          prop: '影响因子：',
          info: '',
        }, {
          prop: '检索收录情况：',
          info: '',
        }, {
          prop: '被引用次数：',
          info: '',
        }, {
          prop: '论文类型：',
          info: '',
        },{
          prop: '相关系列成果：',
          info: '',
        },{
          prop: '成果简介：',
          info: '',
        },{
          prop: '项目级别：',
          info: '',
        },{
          prop: '论文及证明材料：',
          info: '',
          view: true,
          url:"",
        },
        // {
        //   prop: '证明材料：',
        //   info: '',
        //   view: true,
        //   url:"",
        // },
        {
          prop: '已上传申报表：',
          info: '',
          view: true,
          url:"",
        }]
      }
    },

    methods: {
      handleViewFile(url){
        if(url){
          window.open(url,'_blank');

        }else{
          this.$baseMessage("请先上传文件", "error");
        }
      },
    }
  }
</script>
