<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="prop" label="表项" width="300"></el-table-column>
    <el-table-column prop="info" label="相关信息">
      <template v-slot="scope">
        <!-- <el-input v-model="scope.row.info" :disabled = true></el-input> -->
        {{scope.row.info}}
        <el-button
          v-if="scope.row.view == true"
          type="text"
          :disabled="scope.row.url == ''"
          @click="handleViewFile(scope.row.url)"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="view" label="查看">
      <template v-slot="scope">
        <el-button
          v-if="scope.row.view == true"
          type="text"
          :disabled="scope.row.url == ''"
          @click="handleViewFile(scope.row.url)"
        >
          查看
        </el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
export default {
  created() {
    let paperTypeMap = new Map()
      .set("A", "指南、标准、研究性原始论文")
      .set("B", "综述性文献、讲座")
      .set("C", "短篇报道")
      .set("其他", "其他");
    let retrievalMap = new Map()
      .set("A", "SCI/HSCI/SSCI/EI/ISTP")
      .set("B", "Medline/Scifinder/Biosis preview等国际检索工具")
      .set("C", "CSCD/CSSCI/CSTPCD")
      .set("无", "无");
    let relatedAchievementsMap = new Map()
      .set(
        "A",
        "有相关专利，或有3篇以上中文相关论文或1篇外文相关论文，或市级政府采用证明"
      )
      .set("B", "有2篇中文相关论文")
      .set("C", "有1篇中文相关论文")
      .set("无", "无");
    let projectLevelMap = new Map()
      .set("A", "国家级重大项目")
      .set("B", "国家级重点项目")
      .set("C", "国家级一般项目")
      .set("D", "省部级重点项目")
      .set("E", "省部级一般项目")
      .set("F", "其他");
    let projectInnovationMap = new Map()
      .set("A", "原始创新")
      .set("B", "集成创新")
      .set("C", "引进消化吸收再创新");
    if (this.$route.query.form) {
      this.form = this.$route.query.form;
      this.tableData[0].info = this.form.applyName;
      this.tableData[1].info = this.form.publicationDate;
      this.tableData[2].info = this.form.firstAuthor;
      this.tableData[3].info = this.form.firstAuthorWorkplace;
      this.tableData[4].info = this.form.introduction;
      this.tableData[5].info = this.form.innovation;
      this.tableData[6].info = this.form.application;
      this.tableData[7].info = this.form.publicationName;
      this.tableData[8].info = this.form.publicationDate;
      this.tableData[9].info = this.form.impactFactor;
      this.tableData[10].info = retrievalMap.get(this.form.retrieval);
      this.tableData[11].info = this.form.citations;
      // this.tableData[12].info = relatedAchievementsMap.get(this.form.relatedAchievements);
      this.tableData[12].info = paperTypeMap.get(this.form.paperType);
      // 出版社名称
      this.tableData[13].info = this.form.publicationPublisherName;
      this.tableData[14].info = this.form.publicationPublishDate;
      this.tableData[15].info = this.form.publicationNumber;
      this.tableData[16].info = this.form.publicationType;
      this.tableData[17].info = this.form.publicationCitations;
      this.tableData[18].info = this.form.publicationInstitutionalUse;

      this.tableData[19].info = relatedAchievementsMap.get(this.form.relatedAchievements);
      this.tableData[20].info = this.form.projectName;
      this.tableData[21].info = projectLevelMap.get(this.form.projectLevel);
      this.tableData[22].info = projectInnovationMap.get(this.form.projectInnovation);

      this.tableData[23].info = this.form.patentName;
      this.tableData[24].info = this.form.patentType;
      this.tableData[25].info = this.form.patentDate;
      this.tableData[26].info = this.form.patentApplication;
      this.tableData[27].info = this.form.patentValue;

      this.tableData[28].url = this.form.filePath;
      this.tableData[28].view = true;

      this.tableData[29].url = this.form.otherFilePath;
      this.tableData[29].view = true;




      // this.tableData[0].info = this.form.impactFactor;
      // this.tableData[1].info = retrievalMap.get(this.form.retrieval);
      // this.tableData[2].info = this.form.citations;
      // this.tableData[3].info = paperTypeMap.get(this.form.paperType);
      // this.tableData[4].info = relatedAchievementsMap.get(this.form.relatedAchievements);
      // this.tableData[5].info = this.form.introduction;
      // this.tableData[6].info = projectLevelMap.get(this.form.projectLevel);
      // this.tableData[7].url = this.form.filePath;
      // this.tableData[8].url = this.form.completedFilePath;
    }
  },

  data() {
    return {
      form: "",
      tableData: [
        {
          prop: "成果名称：",
          info: "",
        },
        {
          prop: "成果发表时间：",
          info: "",
        },
        {
          prop: "成果完成人：",
          info: "",
        },
        {
          prop: "申报人单位：",
          info: "",
        },
        {
          prop: "代表性作品简介：",
          info: "",
        },
        {
          prop: "其他支撑材料与代表性作品的支撑关系：",
          info: "",
        },
        {
          prop: "与该代表性作品相关的其他学术价值、成果转化及经济效益、社会效益简介：",
          info: "",
        },
        {
          prop: "发表刊物名称：",
          info: "",
        },
        {
          prop: "发表时间：",
          info: "",
        },
        {
          prop: "刊物影响因子：",
          info: "",
        },
        {
          prop: "检索收录情况：",
          info: "",
        },
        {
          prop: "被引用次数：",
          info: "",
        },
        {
          prop: "论文类型：",
          info: "",
        },
        {
          prop: "出版社名称：",
          info: "",
        },
        {
          prop: "出版时间：",
          info: "",
        },
        {
          prop: "出版数量：",
          info: "",
        },
        {
          prop: "著作类型：",
          info: "",
        },
        {
          prop: "被引用次数：",
          info: "",
        },
        {
          prop: "出版图书馆收藏或学术机构使用证明：",
          info: "",
        },
        {
          prop: "相关系列成果：",
          info: "",
        },
        {
          prop: "产生该成果的项目名称：",
          info: "",
        },
        {
          prop: "项目级别：",
          info: "",
        },
        {
          prop: "自主创新情况：",
          info: "",
        },
        {
          prop: "专利名称：",
          info: "",
        },
        {
          prop: "专利类型：",
          info: "",
        },
        {
          prop: "专利获得时间：",
          info: "",
        },
        {
          prop: "专利应用证明：",
          info: "",
        },
        {
          prop: "产值或经济效益：",
          info: "",
        },
        {
          prop: "主要作品及证明材料：",
          info: "",
          view: true,
          url: "",
        },
        {
          prop: '其它支撑材料及证明材料：',
          info: '',
          view: true,
          url:"",
        },
        {
          prop: "已上传申报表：",
          info: "",
          view: true,
          url: "",
        },
      ],
    };
  },

  methods: {
    handleViewFile(url) {
      if (url) {
        window.open(url, "_blank");
      } else {
        this.$baseMessage("请先上传文件", "error");
      }
    },
  },
};
</script>
