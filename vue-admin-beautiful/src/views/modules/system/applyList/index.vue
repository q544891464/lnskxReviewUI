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

    <!-- 避免超级管理员查看时出现bug -->
    <el-row v-if="this.orgInfo != null">
      <h3>本单位推荐名额为：{{ this.orgInfo.quota }}。</h3>
    </el-row>

    <!-- <h3>
      完成初评后，导出初评报告模板，按要求完善初评报告内容，签字盖章后扫描成pdf并上传系统。
    </h3> -->
    <h3>
      完成初评后，导出初评报告模板，按要求完善初评报告内容，签字盖章后扫描成pdf并上传系统。
    </h3>

    <h3 style="color: red;">初评报告上传提交后不能再进行初评操作，请确保内容无误后再进行上传提交。</h3>

    <!-- 主要操作  -->
    <!-- v-if="$perms('system_apply_insert')" -->
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <!-- <el-button
            
            icon="el-icon-plus"
            type="primary"
            @click="handleInsert"
        > 添加 </el-button> -->

        <!-- <el-button
          type="primary"
          @click="handleSubmit"
          v-bind:disabled="disabled"
        >
          提交
        </el-button> -->

        <!--        <el-button
            v-if="$perms('system_apply_import')"
            icon="el-icon-upload2"
            type="warning"
            @click="handleImportExcel"
        > 导入 </el-button> -->
        <!-- v-if="$perms('system_apply_export')" -->
        <el-button
          icon="el-icon-download"
          type="primary"
          @click="handleExportWord"
        >
          导出初评报告
        </el-button>

        <el-button
          type="primary"
          v-if="submitInfo.completeFilePath == null"
          @click="uploadChuping"
        >
          上传初评报告并提交
        </el-button>

        <!-- <el-button
          type="warning"
          v-if="submitInfo.completeFilePath != null"
          @click="uploadChuping"
        >
          重新上传
        </el-button> -->

        <el-button
          type="warning"
          v-if="submitInfo.completeFilePath != null"
          @click="handleViewCompleteFile"
        >
          查看已上传初评报告
        </el-button>
        <!-- 
        <el-button
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
            <el-form-item>
              <el-input
                v-model.trim="queryForm.applyName_LIKE"
                placeholder="请输入成果名称"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.firstAuthor_LIKE"
                placeholder="请输入申报人姓名"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.firstAuthorWorkplace_LIKE"
                placeholder="请输入工作单位"
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

      <!-- <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ (queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column> -->

      <el-table-column
        show-overflow-tooltip
        prop="applyCode"
        label="成果编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="applyName"
        label="成果名称"
        width="400"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="applyType"
        label="成果类型"
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

      <el-table-column show-overflow-tooltip label="申报表">
        <template v-slot="scope">
          <el-button type="text" @click="handleViewDetailInfo(scope.row)"
          v-bind:disabled = "scope.row.completedFilePath == '' && scope.row.completedFilePath != null">
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="申报表上传状态">
        <template v-slot="scope">
          {{
            scope.row.completedFilePath == null ||
            scope.row.completedFilePath == ""
              ? "未上传"
              : "已上传"
          }}
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="详细信息">
        <template v-slot="scope">
          <el-button type="text" @click="handleViewInfo(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="专业">
        <template v-slot="scope">
          <span v-if="scope.row.disciplineName != null">
            {{
              scope.row.disciplineName
            }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="firstAuthor"
        label="申报人"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="firstAuthorWorkplace"
        label="工作单位"
      ></el-table-column>

      <el-table-column show-overflow-tooltip prop="enable" label="初评排序">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.preRank"
            type="number"
            style="width: 80px"
        
            @change="handleRankChange(scope.row)"
            v-bind:disabled="disabled"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="enable" label="是否推荐">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isPass"
            active-value="1"
            inactive-value="0"
            @change="handleEnable(scope.row)"
            v-bind:disabled="disabled"
          ></el-switch>
        </template>
      </el-table-column>

      <!-- v-if="$perms('system_apply_update') || $perms('system_apply_delete') ||  $perms('system_apply_setpass')" -->
      <!-- <el-table-column
        show-overflow-tooltip
        label="操作"
        width="200"
        
      >
        <template v-slot="scope">
          <el-button
            
            type="text"
            @click="handleView(scope.row)"
          > 查看 </el-button>

          <el-divider direction="vertical"></el-divider>



        </template>

      </el-table-column> -->
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
    <upload ref="upload" @fetchData="fetchData" @refresh="fetchData"></upload>
  </div>
</template>

<script>
import {
  getList,
  getListByOrg,
  doIsPassApply,
  doSetPreRank,
  doDelete,
  doDeleteAll,
  doExportExcelByOrg,
  doExportChupingWord,
} from "@/api/system/apply/SysApplyManagementApi";
import {
  getByCurrentUser,
  doUpdate,
} from "@/api/system/orgInfo/OrgInfoManagementApi";
import { getSubmitInfoByCurrentUser } from "@/api/system/orgSubmit/SkxOrgSubmitManagementApi";
import Edit from "./components/SysApplyManagementEdit";
import Import from "./components/SysApplyManagementImport";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";
import Upload from "./components/upload";

export default {
  name: "SysApplyManagement",
  components: { Edit, Import, Upload },
  data() {
    return {
      disabled: false,
      list: null,
      listLoading: true,
      layout: "total, prev, pager, next, sizes, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      moreQueryFlag: false,
      orgInfo: {
        quota: 0,
      },
      submitInfo: {},
      queryForm: {
        pageNo: 1,
        pageSize: 10,
      },
      dict: {},
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
  mounted() {},
  methods: {
    async handleEnable(row) {
      if (row.preRank == null || row.preRank == "") {
        this.$message.error("请先设置初评排序");
        row.isPass = 0;
        return;
      }
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

    async handleRankChange(row) {

      

      if(parseInt(row.preRank)>this.orgInfo.quota){
        this.$baseMessage("排序不能大于推荐名额", "error");
        row.preRank = this.orgInfo.quota;
      }

      if(parseInt(row.preRank)<=0){
        this.$baseMessage("排序不能小于1", "error");
        row.preRank = 1;
      }

      const preRank = row.preRank;
      console.log(preRank);
      if (preRank == null || preRank == "") {
        this.$message.error("请先设置初评排序");
        return;
      } else {
        if (row.id) {
          const { success,msg } = await doSetPreRank({
            applyId: row.id,
            preRank: preRank,
          });
          row.preRank = preRank;
          if(!success){
            row.isPass = "0";
          }

          // this.$baseMessage(msg, "success");
        } else {
          this.$baseMessage("未选中任何行", "error");
        }
        this.fetchData();
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
    handleUpdate(row) {
      if (row.id) {
        // this.$refs["edit"].showEdit(row);
        this.$router.push({
          path: "/createApply",
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
    //查看申请详情
    handleViewInfo(row) {
      if (row.id) {
        // this.$refs["edit"].showEdit(row);
        this.$router.push({
          path: "/applyInfo/applyInfo",
          query: {
            form: row,
          },
        });
      }
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

    handleSubmit() {
      this.$baseConfirm("你确定要提交吗", null, async () => {
        // const { msg } = await doDeleteAll({ ids });
        this.orgInfo.hasReport = "1";
        const { success, msg } = await doUpdate(this.orgInfo);
        if (success) {
          this.$baseMessage("已提交", "success");
          this.disabled = true;
          await this.fetchData();
        }
      });
    },

    handleViewFile(row) {
      if (row.filePath) {
        window.open(row.filePath, "_blank");
      } else {
        this.$baseMessage("请先上传文件", "error");
      }
    },

    handleViewCompleteFile() {
      if (this.submitInfo.completeFilePath) {
        window.open(this.submitInfo.completeFilePath, "_blank");
      } else {
        this.$baseMessage("请先上传文件", "error");
      }
    },

    async handleExportWord() {
      const { code, msg, data } = await doExportChupingWord();
      if (code === 200) {
        window.open(data, "_blank");
      } else {
        this.$baseMessage(msg, "error");
      }
    },

    async uploadChuping() {
      this.$refs["upload"].show();
    },
    // 导出excel
    handleExportExcel(el) {
      // 导出按钮防抖处理 默认限制为10秒
      vueButtonClickBan(el, 10);

      // 执行导出
      doExportExcelByOrg(this.queryForm);
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

    async getOrgInfo() {
      const { data } = await getByCurrentUser();
      this.orgInfo = data;
      // if (data.hasReport === "1") {
      //   this.disabled = true;
      // }
    },

    async getSubmitInfo() {
      const { data } = await getSubmitInfoByCurrentUser();
      this.submitInfo = data;
      if(data.completeFilePath){
        this.disabled = true;
      }
    },

    async fetchData() {
      this.listLoading = true;
      this.getOrgInfo();
      this.getSubmitInfo();
      const { data } = await getListByOrg(this.queryForm);
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
