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
        <el-button
          v-if="$perms('system_orginfo_insert')"
          icon="el-icon-plus"
          type="primary"
          @click="handleInsert"
        >
          添加
        </el-button>

        <el-button
          v-if="$perms('system_orginfo_import')"
          icon="el-icon-upload2"
          type="warning"
          @click="handleImportExcel"
        >
          导入
        </el-button>

        <el-button icon="el-icon-upload2" type="warning" @click="handleImport">
          导入到组织里
        </el-button>

        <el-button
          icon="el-icon-upload2"
          type="warning"
          @click="handleImportUser"
        >
          导入到用户里
        </el-button>

        <el-button
          v-if="$perms('system_orginfo_export')"
          icon="el-icon-download"
          type="warning"
          @click="handleExportExcel"
        >
          导出
        </el-button>

        <el-button
          v-if="$perms('system_orginfo_delete')"
          :disabled="!selectRows.length > 0"
          icon="el-icon-delete"
          type="danger"
          @click="handleDelete"
        >
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="14">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.unitName_LIKE"
              placeholder="请输入单位名称"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model.trim="queryForm.unitCode_LIKE"
              placeholder="请输入单位编码"
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
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>

      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ (queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="操作"
        v-if="
          $perms('system_orginfo_update') || $perms('system_orginfo_delete')
        "
        width="100"
      >
        <template v-slot="scope">
          <el-button
            v-if="$perms('system_orginfo_update')"
            type="text"
            @click="handleUpdate(scope.row)"
          >
            编辑
          </el-button>

          <el-divider direction="vertical"></el-divider>

          <el-button
            v-if="$perms('system_orginfo_delete')"
            type="text"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitName"
        label="单位名称"
        width="135"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitCode"
        label="单位编码"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitHead"
        label="单位负责人"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="headPosition"
        label="单位负责人职位"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="headPhone"
        label="单位负责人电话"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="headMobile"
        label="单位负责人手机"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitContact"
        label="单位联系人"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="contPosition"
        label="单位联系人职位"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="contPhone"
        label="单位联系人电话"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="contMobile"
        label="单位联系人手机"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="contEmail"
        label="单位联系人邮箱"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitAddress"
        label="单位地址"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="unitZipcode"
        label="单位邮编"
      ></el-table-column>
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
  </div>
</template>

<script>
import {
  getList,
  doDelete,
  doDeleteAll,
  doExportExcel,
  doImportOrg,
  doImportUser,
} from "@/api/system/orgInfo/OrgInfoManagementApi";
import Edit from "./components/OrgInfoManagementEdit";
import Import from "./components/OrgInfoManagementImport";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";

export default {
  name: "OrgInfoManagement",
  components: { Edit, Import },
  data() {
    return {
      list: null,
      listLoading: true,
      layout: "total, prev, pager, next, sizes, jumper",
      total: 0,
      selectRows: "",
      elementLoadingText: "正在加载...",
      moreQueryFlag: false,
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        unitName_LIKE: "",
        unitCode_LIKE: "",
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
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleInsert(row) {
      this.$refs["edit"].showEdit();
    },
    handleUpdate(row) {
      if (row.id) {
        this.$refs["edit"].showEdit(row);
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

    // 测试方法 将推荐单位导入到组织里
    handleImport() {
      if (this.selectRows.length > 0) {
        const ids = this.selectRows.map((item) => item.id).join();
        this.$baseConfirm("你确定要导入选中项吗", null, async () => {
          const { msg } = await doImportOrg({ ids });
          this.$baseMessage(msg, "success");
          await this.fetchData();
        });
      } else {
        this.$baseMessage("未选中任何行", "error");
        return false;
      }
    },

    handleImportUser() {
      if (this.selectRows.length > 0) {
        const ids = this.selectRows.map((item) => item.id).join();
        this.$baseConfirm("你确定要导入选中项吗", null, async () => {
          const { msg } = await doImportUser({ ids });
          this.$baseMessage(msg, "success");
          await this.fetchData();
        });
      } else {
        this.$baseMessage("未选中任何行", "error");
        return false;
      }
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
      const { data } = await getList(this.queryForm);
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
