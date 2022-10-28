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
    let patentTypeMap = new Map()
      .set("A", "发明专利")
      .set("B", "实用新型专利")
      .set("C", "外观设计专利");
    let publicationTypeMap = new Map()
      .set("A", "专著")
      .set("B", "编著")
      .set("C", "译著");
    let publicationInstitutionalUseMap = new Map()
      .set("A", "5家或5家机构以上")
      .set("B", "4家机构")
      .set("C", "2家机构")
      .set("无", "无");
    if (this.$route.query.form) {
      let i = 0;
      this.form = this.$route.query.form;
      this.tableData[i].info = this.form.applyName; i++;
      this.tableData[i].info = this.form.publicationDate; i++;
      this.tableData[i].info = this.form.firstAuthor;i++;
      this.tableData[i].info = this.form.firstAuthorWorkplace;i++;
      this.tableData[i].info = this.form.introduction;i++;
      this.tableData[i].info = this.form.innovation;i++;
      this.tableData[i].info = this.form.application;i++;
      this.tableData[i].info = this.form.publicationName;i++;
      this.tableData[i].info = this.form.publicationDate;i++;
      this.tableData[i].info = this.form.impactFactor;i++;
      this.tableData[i].info = retrievalMap.get(this.form.retrieval);i++;
      this.tableData[i].info = this.form.citations;i++;
      // this.tableData[12].info = relatedAchievementsMap.get(this.form.relatedAchievements);
      this.tableData[i].info = paperTypeMap.get(this.form.paperType);i++;
      // 出版社名称
      this.tableData[i].info = this.form.publicationPublisherName;i++;
      this.tableData[i].info = this.form.publicationPublishDate;i++;
      this.tableData[i].info = this.form.publicationNumber;i++;
      this.tableData[i].info = publicationTypeMap.get(this.form.publicationType);i++;
      this.tableData[i].info = this.form.publicationCitations;i++;
      this.tableData[i].info = publicationInstitutionalUseMap.get(this.form.publicationInstitutionalUse);i++;

      this.tableData[i].info = relatedAchievementsMap.get(this.form.relatedAchievements);i++;
      this.tableData[i].info = this.form.projectName;i++;
      this.tableData[i].info = projectLevelMap.get(this.form.projectLevel);i++;
      this.tableData[i].info = projectInnovationMap.get(this.form.projectInnovation);i++;

      this.tableData[i].info = this.form.patentName;i++;
      this.tableData[i].info = patentTypeMap.get(this.form.patentType);i++;
      this.tableData[i].info = this.form.patentDate;i++;
      this.tableData[i].info = this.form.patentApplication;i++;
      this.tableData[i].info = this.form.patentValue;i++;

      this.tableData[i].url = this.form.filePath;
      this.tableData[i].view = true;i++;

      this.tableData[i].url = this.form.otherFilePath;
      this.tableData[i].view = true;i++;

      this.tableData[i].url = this.form.completedFilePath;
      this.tableData[i].view = true;i++;




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
