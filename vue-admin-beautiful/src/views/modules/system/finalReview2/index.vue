<template>
  <div class="tenantManagement-container">
    <el-collapse-transition>
      <div class="more-query" v-show="this.moreQueryFlag">
        <!-- 更多查找 -->
        <vab-query-form>
          <vab-query-form-left-panel :span="24">
            <el-form
              :inline="true"
              :model="queryForm"
              @submit.native.prevent
            ></el-form>
          </vab-query-form-left-panel>
        </vab-query-form>
        <el-divider></el-divider>
      </div>
    </el-collapse-transition>
    <el-row>
      <h3>
        评审项目数量：{{ this.countData.count }} 当前一等奖数量：{{
          this.countData.prize1Count
        }}
        当前二等奖数量：{{ this.countData.prize2Count }} 
        <!-- 当前三等奖数量：{{
          this.countData.prize3Count
        }} -->
      </h3>
    </el-row>

    <el-row>
      <h3 v-if="queryForm.pageName == '1'">
        农科组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group1 }}项，淘汰{{ this.countData.count-this.group1 }}项；
        <div v-if="this.countData.prize1Count-this.group1>0" style="color:red">
          一等奖已经超出{{ this.group1 }}项，建议重新调整。
        </div>
      </h3>
      <h3 v-if="queryForm.pageName == '2'">
        医科组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group2 }}项，淘汰{{ this.countData.count-this.group2 }}项；
        <div v-if="this.countData.prize1Count-this.group2>0" style="color:red">
          一等奖已经超出{{ this.group2 }}项，建议重新调整。
        </div>
      </h3>
      <h3 v-if="queryForm.pageName == '3'">
        理工一组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group3 }}项，淘汰{{ this.countData.count-this.group3 }}项；
        <div v-if="this.countData.prize1Count-this.group3>0" style="color:red">
          一等奖已经超出{{ this.group3 }}项，建议重新调整。
        </div>
      </h3>
      <h3 v-if="queryForm.pageName == '4'">
        理工二组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group4 }}项，淘汰{{ this.countData.count-this.group4 }}项；
      </h3>
      <h3 v-if="queryForm.pageName == '5'">
        理工三组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group5 }}项，淘汰{{ this.countData.count-this.group5 }}项；
        <div v-if="this.countData.prize1Count-this.group5>0" style="color:red">
          一等奖已经超出{{ this.group5 }}项，建议重新调整。
        </div>
      </h3>
      <h3 v-if="queryForm.pageName == '6'">
        理工四组目前推荐一等奖{{ this.countData.count }}项，需要评审出一等奖{{ this.group6 }}项，淘汰{{ this.countData.count-this.group6 }}项；
        <div v-if="this.countData.prize1Count-this.group6>0" style="color:red">
          一等奖已经超出{{ this.group6 }}项，建议重新调整。
        </div>
      </h3>

      <h3 v-if="this.countTotalData.prize1Count+this.countTotalData.prize2Count<this.countTotalData.count" style="color:red">
        尚未完成全部评审，已评{{ this.countTotalData.prize1Count+this.countTotalData.prize2Count }}项，还有{{ this.countTotalData.count-this.countTotalData.prize1Count-this.countTotalData.prize2Count }}项未评审。
      </h3>
    
    </el-row>



    <!-- 主要操作  -->
    <vab-query-form>
      <vab-query-form-left-panel :span="20">
        <!-- <el-button
          v-if="$perms('system_apply_export')"
          type="warning"
          @click="fetchData"
        >
          刷新
        </el-button> -->

        <!--        <el-button
            v-if="$perms('system_apply_import')"
            icon="el-icon-upload2"
            type="warning"
            @click="handleImportExcel"
        > 导入 </el-button> -->


        <!-- v-if="queryForm.pageName == '全部组别' || queryForm.pageName == ''" -->





        <el-button
          v-if="$perms('system_apply_export')"
          icon="el-icon-download"
          type="warning"
          @click="handleExportExcel"
        >
          导出
        </el-button>

        <el-col>
          <el-select
          v-model="queryForm.pageName"
          placeholder="请选择组别"
          clearable
          :style="{ width: '50%' ,marginBottom:'10px'}"
          v-bind:disabled="disabled"
          @change="handlePageNameChange"
        >
          <el-option
            v-for="(item, index) in pageNameOptions"
            :key="index"
            :label="item.subjectGroupName"
            :value="item.subjectGroupNo"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
          <h3 >
          为保障成果的学科平衡，请专家在上方下拉栏选择学科组组别后，根据提示进行评审。
        </h3>
          <h3>
          请在12月26日 10:00前完成评审
        </h3>
        </el-col>


        <!-- <el-button
            v-if="$perms('system_apply_delete')"
            :disabled="!selectRows.length > 0"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete"
        > 批量删除 </el-button> -->
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>

          <el-form-item>
              <el-input
                v-model.trim="queryForm.applyName_LIKE"
                placeholder="请输入成果名称"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.firstAuthorWorkplace_LIKE"
                placeholder="请输入工作单位名称"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.disciplineGroup_LIKE"
                placeholder="请输入学科组别"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.disciplineName_LIKE"
                placeholder="请输入学科"
                clearable
              />
            </el-form-item>

          <el-form-item>
                       <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <!-- <el-table-column show-overflow-tooltip type="selection"></el-table-column> -->

      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ (queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="applyName"
        label="成果名称"
        width="300"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="详细信息"
        
      >
        <template v-slot="scope">
          <el-button
          
            type="text"
            @click="handleViewInfo(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="申报表">
        <template v-slot="scope">
          <el-button type="text" @click="handleViewDetailInfo(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="firstAuthor"
        label="第一作者"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="firstAuthorWorkplace"
        label="工作单位"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="disciplineGroup"
        label="学科组别"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="disciplineName"
        label="学科"
      ></el-table-column>

      <el-table-column show-overflow-tooltip label="初评单位" prop="orgName">
        <template slot-scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="初评排序" prop="preRank">
        <template slot-scope="scope">
          <span>{{ scope.row.preRank }}</span>
        </template>
      </el-table-column>

      <!--      <el-table-column
              show-overflow-tooltip
              prop="discipline"
              label="学科专业"
      ></el-table-column> -->

      <!--      <el-table-column
              show-overflow-tooltip
              prop="keywords"
              label="关键词"
      ></el-table-column> -->



      <el-table-column
        show-overflow-tooltip
        label="网评结果"
        prop="avgScore"
       
      >
        <!-- :formatter="disciplineReviewPrizeFormat" -->
        <!--        <template v-slot="scope">

          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handlePrize(scope.row)"
          > $scope.row.prize </el-button>
        </template>
 -->
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="subjectGroupRank"
        label="组内排名"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="复评结果"
        prop="disciplineReviewPrize"
        :formatter="disciplineReviewPrizeFormat"
        
      >

      </el-table-column>
      
      <!-- <el-table-column
        show-overflow-tooltip
        label="复评意见"
        prop="disciplineReviewMark"
        
      >

      </el-table-column> -->

      <el-table-column
        show-overflow-tooltip
        label="预评审结果"
        prop="finalPrePrize"
        :formatter="finalPrizeFormat"
      >
      <!-- :formatter="prePrizeFormat" -->
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="预评审"
      >
      <template v-slot="scope">
          <!--          <el-button
            v-if="$perms('system_apply_delete')"
            type="text"
            @click="handleDelete(scope.row)"
          > 删除 </el-button> -->

          <el-button
           
            type="text"
            v-bind:disabled="preDisabled"
            @click="handlePrize(scope.row, 'pre')"
          >
            设置奖项
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <edit ref="edit" @fetchData="fetchData"></edit>
    <import ref="import" @fetchData="fetchData"></import>
    <prize ref="prize" @fetchData="fetchData" @refresh="fetchData"></prize>
  </div>
</template>

<script>
import {
  getCount,
  getListAll,
  getListByFinal,
  doDelete,
  doDeleteAll,
  doExportExcel,
  doExportExcelZhongping,
  getIsDeadLineByType
} from "@/api/system/apply/SysApplyManagementApi";
import { getList } from "@/api/system/subjectGroup/SkxSubjectGroupManagementApi";
import {getByCode} from "@/api/system/options/SysOptionsManagement";
import Edit from "./components/SysApplyManagementEdit";
import Import from "./components/SysApplyManagementImport";
import Prize from "./components/finalVote";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";

export default {
  name: "SysApplyManagement",
  components: { Edit, Import, Prize },
  data() {
    return {
      group1:4,
      group2:7,
      group3:7,
      group4:5,
      group5:4,
      group6:3,
      pageType: "prePrize",
      preDisabled: true,
      finalDisabled: true,
      countData: {},
      countTotalData: {},
      list: [],
      listLoading: true,
      layout: "total, prev, pager, next, sizes, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      moreQueryFlag: false,
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        pageName: "全部组别",
        pageType: "pre",
        avgScore_ORDER: "DESC",
        disciplineReviewPrize_EQ: "1",
      },
      dict: {},
      pageNameOptions: [
        // {
        //   label: "全部组别",
        //   value: "全部组别",
        // },
        // {
        //   label: "理科",
        //   value: "理科",
        // },
        // {
        //   label: "农科",
        //   value: "农科",
        // },
        // {
        //   label: "医药",
        //   value: "医药",
        // },
        // {
        //   label: "生命科学与基础医学",
        //   value: "生命科学与基础医学",
        // },
        // {
        //   label: "机械、材料、矿山、冶金",
        //   value: "机械、材料、矿山、冶金",
        // },
        // {
        //   label: "电气、电子与信息技术",
        //   value: "电气、电子与信息技术",
        // },
        // {
        //   label: "能源、化工与环境",
        //   value: "能源、化工与环境",
        // },
        // {
        //   label: "交通与基建",
        //   value: "交通与基建",
        // },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.getIsDeadLinePre();
    // this.getIsDeadLineFinal();
  },
  methods: {

    finalPrizeFormat(row) {
      if (row.finalPrePrize == 1) {
        return "一等奖";
      } else if (row.finalPrePrize == 0) {
        return "二等奖";
      }
    },

    async getIsDeadLinePre() {
      const { success, msg, data } = await getIsDeadLineByType({
        type: "pre",
      
      });
      if (!success) {
        this.preDisabled = true;
        this.$baseMessage("未在评审时间内", "error");
      } else {
        this.preDisabled = false;
      }
      return success;
    },

    async getIsDeadLineFinal() {
      const { success, msg, data } = await getIsDeadLineByType({
        type: "final",
      });
      if (!success) {
        this.finalDisabled = true;
        this.$baseMessage("未在评审时间内", "error");
      } else {
        this.finalDisabled = false;
      }
      return success;
    },

    async getOptions() {
      let res = await getList({
        pageSize: 1000,
      });
      if (res.code == 200) {
        console.log(res.data);
        this.pageNameOptions = res.data.rows;
      }
    },

    async getCount() {
      const { data } = await getCount({
        pageName: "zhongpingVote,"+this.queryForm.pageName+","+this.pageType,
      });
      this.countData = data;
    },
    async getTotalCount() {
      const { data } = await getCount({
        pageName: "zhongpingVote,"+"全部组别"+","+this.pageType,
      });
      console.log("获取全部计数",data);
      this.countTotalData = data;
    },

    prePrizeFormat(row, column) {
      if (row.prePrize == 1) {
        return "一等奖";
      } else if (row.prePrize == 2) {
        return "二等奖";
      } else if (row.prePrize == 3) {
        return "三等奖";
      }
    },

    prizeFormat(row, column) {
      if (row.prize == 1) {
        return "一等奖";
      } else if (row.prize == 2) {
        return "二等奖";
      } else if (row.prize == 3) {
        return "三等奖";
      }
    },

    handlePageNameChange(value) {
      this.queryForm.pageNo = 1;
      this.queryForm.pageName = value;
      this.fetchData();
    },

    disciplineReviewPrizeFormat(row, column) {
      if (row.disciplineReviewPrize == 1) {
        return "一等奖";
      } else if (row.disciplineReviewPrize == 2) {
        return "二等奖";
      } else if (row.disciplineReviewPrize == 3) {
        return "三等奖";
      }
    },

    async handleEnable(row) {
      const isPass = row.isPass;
      // 回退原有状态
      if (row.isPass === "0") row.isPass = "1";
      else if (row.isPass === "1") row.isPass = "0";

      if (row.id) {
        const { msg } = await doIsPassApply({
          applyId: row.id,
          isPass: isPass,
        });
        row.isPass = isPass;
        this.$baseMessage(msg, "success");
      } else {
        this.$baseMessage("未选中任何行", "error");
      }
    },
    setPass(row) {
      // this.selectRows = val;
      this.$baseMessage("还没做", "error");
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleInsert(row) {
      // this.$refs["edit"].showEdit();
      this.$router.push({ path: "/createApply" });
    },
    handleView(row) {
      if (row.id) {
        // this.$refs["edit"].showEdit(row);
        this.$router.push({
          path: "/createApply",
          query: {
            form: row,
            disabled: true,
          },
        });
      }
    },
    handleViewInfo(row) {
      if (row.id) {
        // this.$refs["edit"].showEdit(row);
        window.sessionStorage.setItem("queryForm",  JSON.stringify(this.queryForm));
        this.$router.push({
          path: "/applyInfo/applyInfo",
          query: {
            form: row,
          },
        });
      }
    },

    handleViewDetailInfo(row) {
      if (row.completedFilePath) {
        window.open(row.completedFilePath, "_blank");
      } else {
        this.$baseMessage("暂时无法查看", "error");
      }
    },

    async handlePrize(row, type) {
      await this.$refs["prize"].show(row, type);
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({ id: row.id });
          this.$baseMessage(msg, "success");
          await this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDeleteAll({ ids });
            this.$baseMessage(msg, "success");
            await this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },
    // 导出excel
    handleExportExcel(el) {
      // 导出按钮防抖处理 默认限制为10秒
      vueButtonClickBan(el, 10);

      // 执行导出
      doExportExcelZhongping(this.queryForm);
    },
    // 导入excel
    handleImportExcel() {
      this.$refs["import"].show();
    },

    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    moreQuery() {
      this.moreQueryFlag = !this.moreQueryFlag;
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },

    async getPrize1Stantard() {
      const { data } = await getByCode({
        optionCode: "prize1",
      });
      this.prize1 = data.optionValue;
    },

    async getPrize2Stantard() {
      const { data } = await getByCode({
        optionCode: "prize2",
      });
      this.prize2 = data.optionValue;
    },

    async getPrize3Stantard() {
      const { data } = await getByCode({
        optionCode: "prize3",
      });
      this.prize3 = data.optionValue;
    },

    async fetchData() {

      if(window.sessionStorage.getItem("queryForm"))
      {
        this.queryForm = JSON.parse(window.sessionStorage.getItem("queryForm"));
        window.sessionStorage.removeItem("queryForm");
      }
      this.listLoading = true;
      this.getOptions();
      this.getTotalCount();
      this.getCount();
      //TODO:这里把根据初审是否通过获取列表 改为了获取所有申请 论文评奖系统需求
      // 如果是成果奖的流程就改回 getlistbyispassed
      const { data } = await getListByFinal(this.queryForm);
      // const { data } = await getListAll(this.queryForm);
      if (isNotNull(data)) {
        this.list = data.rows;
        this.total = data.total;
      }
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
  },
};
</script>
