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

    <!-- 主要操作  -->
    <vab-query-form>
      <vab-query-form-left-panel :span="10">

        <!--        <el-button
            v-if="$perms('system_apply_insert')"
            icon="el-icon-plus"
            type="primary"
            @click="handleInsert"
        > 添加 </el-button> -->

        <!--        <el-button
            v-if="$perms('system_apply_import')"
            icon="el-icon-upload2"
            type="warning"
            @click="handleImportExcel"
        > 导入 </el-button> -->

        <!-- <el-button
            type="warning"
            @click="fetchData"
        > 刷新 </el-button> -->

        <el-button
          :disabled="!selectRows.length > 0"
          type="primary"
          @click="handlePrize"
        >
          批量设置评审组
        </el-button>

        

        <!-- <el-button
            v-if="$perms('system_apply_delete')"
            :disabled="!selectRows.length > 0"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete"
        > 批量删除 </el-button> -->
      </vab-query-form-left-panel>

            
      <vab-query-form-right-panel :span="14">
        <el-select
          v-model="queryForm.subjectGroup_EQ"
          placeholder="请选择组别"
          clearable
          :style="{ width: '50%' }"
          v-bind:disabled="disabled"
          @change="fetchData"
          
        >
          <el-option
            v-for="(item, index) in subjectGroupOptions"
            :key="index"
              :label="item.subjectGroupName"
              :value="item.subjectGroupNo"
              :disabled="item.disabled"
          ></el-option>
        </el-select>

        
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
                v-model.trim="queryForm.disciplineName_LIKE"
                placeholder="请输入专业名称"
                clearable
              />
            </el-form-item>

            <!-- <el-form-item>
              <el-input
                v-model.trim="queryForm.subjectGroupName_LIKE"
                placeholder="请输入学科组名称"
                clearable
              />
            </el-form-item> -->

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
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>

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
              prop="disciplineGroup"
              label="学科组"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="专业">
        <template v-slot="scope">
          <span v-if="scope.row.disciplineName != null">
            {{
              scope.row.disciplineName
            }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column
              show-overflow-tooltip
              prop="discipline"
              label="学科专业"
      ></el-table-column> -->

      <el-table-column
        show-overflow-tooltip
        prop="firstAuthor"
        label="申报人"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="firstAuthorWorkplace"
        label="工作单位"
        width="200"
      ></el-table-column>

      <!--      <el-table-column
              show-overflow-tooltip
              prop="keywords"
              label="关键词"
      ></el-table-column> -->

      <el-table-column show-overflow-tooltip label="详细信息">
        <template v-slot="scope">
          <el-button type="text" @click="handleViewInfo(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="当前学科组"
        prop="subjectGroupName"
      >
        <!--        <template v-slot="scope">

          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handlePrize(scope.row)"
          > $scope.row.prize </el-button>
        </template>
 -->
      </el-table-column>

      <el-table-column show-overflow-tooltip label="修改评审组">
        <template v-slot="scope">
          <!--          <el-button
            v-if="$perms('system_apply_delete')"
            type="text"
            @click="handleDelete(scope.row)"
          > 删除 </el-button> -->

          <el-button type="text" @click="handlePrize(scope.row)">
            设置评审组
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
    <prize ref="prize" @fetchData="fetchData"></prize>
  </div>
</template>

<script>
import {
  getListAll,
  getListByIsPassed,
  doDelete,
  doDeleteAll,
  doExportExcel,
} from "@/api/system/apply/SysApplyManagementApi";
import { getList } from "@/api/system/subjectGroup/SkxSubjectGroupManagementApi";
import Edit from "./components/SysApplyManagementEdit";
import Import from "./components/SysApplyManagementImport";
import Prize from "./components/selectSubjectGroup";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";

export default {
  name: "SysApplyManagement",
  components: { Edit, Import, Prize },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: "total, prev, pager, next, sizes, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      moreQueryFlag: false,
      subjectGroupOptions: [],
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        subjectGroup_EQ: "0",
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
    subjectGroupFormat(row, column) {
      if (row.subjectGroup == 1) {
        return "学科一组";
      } else if (row.subjectGroup == 2) {
        return "学科二组";
      } else if (row.subjectGroup == 3) {
        return "学科三组";
      } else if (row.subjectGroup == 4) {
        return "学科四组";
      } else if (row.subjectGroup == 5) {
        return "学科五组";
      } else if (row.subjectGroup == 6) {
        return "学科六组";
      } else if (row.subjectGroup == 7) {
        return "学科七组";
      } else if (row.subjectGroup == 8) {
        return "学科八组";
      }
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
        this.$router.push({
          path: "/applyInfo/applyInfo",
          query: {
            form: row,
          },
        });
      }
    },
    handlePrize(row) {
      if (row.id) {
        console.log("单条");
        this.$refs["prize"].show(row);
      } else {
        if (this.selectRows.length > 0) {
          console.log("多条");
          const ids = this.selectRows.map((item) => item.id).join();
          console.log(ids);
          this.$refs["prize"].show(ids);
        }
      }
      // this.fetchData();
    },

    async getOptions() {
      let res = await getList({
        pageSize: 1000,
      });
      if (res.code == 200) {
        console.log(res.data);
        this.subjectGroupOptions = res.data.rows;
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
    // 导出excel
    handleExportExcel(el) {
      // 导出按钮防抖处理 默认限制为10秒
      vueButtonClickBan(el, 10);

      // 执行导出
      doExportExcel(this.queryForm);
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
    async fetchData() {
      this.listLoading = true;
      this.getOptions();
      const { data } = await getListAll(this.queryForm);
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
