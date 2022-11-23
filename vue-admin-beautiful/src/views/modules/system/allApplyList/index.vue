<!-- 已提交申请表 -->
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

    <!-- <h3>
        填写完申报表后，请在本页点击《导出为word》并打印，在学术诚信承诺书上签字后，将申报表报送所在单位审核，合格后加盖单位公章或科技部门公章，将签字、盖章后的申报表扫描成PDF电子版，并点击《上传申报表》进行上传，上传成功后，如点击详细信息《查看》可查看已上传文件，说明申报表上传成功。
        </h3> -->

    <!-- 主要操作  -->
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <!-- <el-button
            v-if="$perms('system_apply_insert')"
            icon="el-icon-plus"
            type="primary"
            @click="handleInsert"
          >
            添加
          </el-button> -->

        <!--       <el-button
              v-if="$perms('system_apply_import')"
              icon="el-icon-upload2"
              type="warning"
              @click="handleImportExcel"
          > 导入 </el-button> -->

        <el-button
          icon="el-icon-download"
          type="warning"
          @click="handleExportExcel"
        >
          导出
        </el-button>
        <!--   
          <el-button
            v-if="$perms('system_apply_delete')"
            :disabled="!selectRows.length > 0"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete"
          >
            批量删除
          </el-button> -->
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="20">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select
              v-model="queryForm.isPass_EQ"
              placeholder="是否推荐"
              clearable
              :style="{ width: '80%' }"
              v-bind:disabled="disabled"
              @change="fetchData"
            >
              <el-option
                v-for="(item, index) in isPassOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.applyName_LIKE"
              placeholder="请输入成果名称"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model.trim="queryForm.orgName_LIKE"
              placeholder="请输入推荐单位名称"
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
              v-model.trim="queryForm.disciplineName_LIKE"
              placeholder="请输入专业"
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

      <el-table-column show-overflow-tooltip label="序号" width="60">
        <template slot-scope="scope">
          {{ (queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

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
        prop="orgName"
        label="推荐单位"
        width="120"
      ></el-table-column>

      <el-table-column show-overflow-tooltip label="专业">
        <template v-slot="scope">
          <span v-if="scope.row.disciplineName != null">
            {{ scope.row.disciplineName }}
          </span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="info" label="详细信息">
        <template v-slot="scope">
          <el-button type="text" @click="handleViewInfo(scope.row)">
            查看
          </el-button>
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

      <!--      <el-table-column
                show-overflow-tooltip
                prop="mainAuthors"
                label="主要完成人"
        ></el-table-column> -->

      <!--      <el-table-column
                show-overflow-tooltip
                prop="keywords"
                label="关键词"
        ></el-table-column> -->

      <!-- <el-table-column
          show-overflow-tooltip
          label="编辑"
          v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
        >
          <template v-slot="scope">
            <el-button
              v-if="$perms('system_apply_update')"
              type="text"
              @click="handleUpdate(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column> -->

      <el-table-column show-overflow-tooltip label="申报表">
        <template v-slot="scope">
          <el-button
            type="text"
            @click.native="handleViewFile(scope.row)"
            v-bind:disabled="
              scope.row.completedFilePath == '' &&
              scope.row.completedFilePath != null
            "
          >
            申报表查看
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

      <el-table-column show-overflow-tooltip label="是否推荐">
        <template v-slot="scope">
          {{ scope.row.isPass == "0" ? "不推荐" : "推荐" }}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="year"
        label="年份"
      ></el-table-column>
      <!--   
        <el-table-column
          show-overflow-tooltip
          label="上传申报表"
          v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
        >
          <template v-slot="scope">
            <el-button
              v-if="$perms('system_apply_update')"
              type="text"
              @click="handleUpload(scope.row)"
            >
              上传申报表
            </el-button>
          </template>
        </el-table-column> -->

      <!-- <el-table-column
          show-overflow-tooltip
          label="删除"
          width="200"
          v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
        >
          <template v-slot="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                删除
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item
                  v-if="$perms('system_apply_delete')"
                  type="text"
                  @click.native="handleDelete(scope.row)"
                >
                  确认删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    <!-- <edit ref="edit" @fetchData="fetchData"></edit>
      <import ref="import" @fetchData="fetchData"></import>
      <upload ref="upload" @fetchData="fetchData"></upload> -->
  </div>
</template>
  
<script>
import {
  getList,
  getListAll,
  doDelete,
  doDeleteAll,
  doExportExcelById,
  doExportExcelApplyStatistics,
} from "@/api/system/apply/SysApplyManagementApi";
//   import Edit from "./components/SysApplyManagementEdit";
//   import Import from "./components/SysApplyManagementImport";
//   import Upload from "./components/upload";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";

export default {
  name: "SysApplyManagement",
  // components: {
  //   Edit,
  //   Import,
  //   Upload,
  // },
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
      },
      isPassOptions: [
        {
          value: "0",
          label: "不推荐",
        },
        {
          value: "1",
          label: "推荐",
        },
      ],
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
      // this.$refs["edit"].showEdit();
      this.$router.push({
        path: "/createApply",
      });
    },
    //查看 将元素设置为不可修改
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
        //   let newpage = this.$router.resolve({
        //   name: '/applyInfo',
        //   form:{
        //     row
        //   }
        // })

        // window.open(newpage.href, '_blank');
        //   this.$refs["edit"].showEdit(row);
        this.$router.push({
          path: "/applyInfo/applyInfo",
          query: {
            form: row,
          },
        });
      }
    },

    async handleUpload(row) {
      await this.$refs["upload"].show(row);
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

    // handleUpload(row) {
    //   if (row.id) {
    //     // this.$refs["edit"].showEdit(row);
    //     this.$router.push({
    //       path: '/createApply',
    //       query: {
    //         form: row,
    //       }
    //     })
    //   }
    // },

    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({
            id: row.id,
          });
          this.$baseMessage(msg, "success");
          await this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDeleteAll({
              ids,
            });
            this.$baseMessage(msg, "success");
            await this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },

    handleViewFile(row) {
      if (row.completedFilePath) {
        window.open(row.completedFilePath, "_blank");
      } else {
        this.$baseMessage("请先上传文件", "error");
      }
    },

    // 导出excel
    handleExportExcel(el) {
      // 导出按钮防抖处理 默认限制为10秒
      vueButtonClickBan(el, 10);

      // 执行导出
      doExportExcelApplyStatistics(this.queryForm);
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
  