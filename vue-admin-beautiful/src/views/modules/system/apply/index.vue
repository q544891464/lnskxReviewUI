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

    <h3>
      填写完申报表后，请在本页点击《导出申报表》并打印，在学术诚信承诺书上签字后，将申报表报送所在单位审核，合格后加盖单位公章或科技部门公章，将签字、盖章后的申报表扫描成PDF电子版，并点击《上传申报表》进行上传，上传成功后，如点击详细信息《查看》可查看已上传文件，说明申报表上传成功。如对申报内容进行修改，请重新点击下载申报表，获取此成果最新的申报表。
      </h3>
    <h4 style="color:red">
      申报表盖章上传完成后不能再进行申报内容的修改操作，请确保申报内容无误再进行上传。
    </h4>

    <!-- 主要操作  -->
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <el-button
          v-if="$perms('system_apply_insert')"
          icon="el-icon-plus"
          type="primary"
          @click="handleInsert"
        >
          添加
        </el-button>

        <!--       <el-button
            v-if="$perms('system_apply_import')"
            icon="el-icon-upload2"
            type="warning"
            @click="handleImportExcel"
        > 导入 </el-button> -->

        <!--        <el-button v-if="$perms('system_apply_export')" icon="el-icon-download" type="warning"
          @click="handleExportExcel"> 导出 </el-button> -->

        <!-- <el-button
          v-if="$perms('system_apply_delete')"
          :disabled="!selectRows.length > 0"
          icon="el-icon-delete"
          type="danger"
          @click="handleDelete"
          
        >
          批量删除
        </el-button> -->
        
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="14">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <!--            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button> -->
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

      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ (queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="applyName"
        label="成果名称"
        width="400"
      ></el-table-column>

      <!--      <el-table-column
              show-overflow-tooltip
              prop="org"
              label="推荐单位"
      ></el-table-column> -->

      <el-table-column show-overflow-tooltip prop="info" label="详细信息">
        <template v-slot="scope">
          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handleViewInfo(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>

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

      <el-table-column
        show-overflow-tooltip
        label="编辑"
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
      >
        <template v-slot="scope">
          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handleUpdate(scope.row)"
            v-bind:disabled = "scope.row.completedFilePath != '' && scope.row.completedFilePath != null || disabled"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="导出"
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
      >
        <template v-slot="scope">
          <el-button type="text" @click.native="handleViewFile(scope.row)">
            导出申报表
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="上传申报表"
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
        
      >
      <!--             v-bind:disabled = "scope.row.completedFilePath != '' && scope.row.completedFilePath != null" -->
        <template v-slot="scope">
          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handleUpload(scope.row)"
            v-bind:disabled ="disabled"
          >
            上传申报表
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="撤回"
        
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
      >
        <template v-slot="scope">
          <el-button type="text" @click.native="handelCancel(scope.row)"
          v-bind:disabled ="disabled"
          >
            撤回申报表
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="删除"
        width="200"
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
      >
        <template v-slot="scope">
          <el-dropdown trigger="click" >
            <span class="el-dropdown-link"
            
            >
              删除
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!--            <el-dropdown-item
              v-if="$perms('system_apply_delete')"
              type="text"
              @click.native="handleViewFile(scope.row)"
            > 导出申报表 </el-dropdown-item> -->

              <!--            <el-dropdown-item
              type="text"
              @click.native="handleViewFile(scope.row)"
            > 上传附件 </el-dropdown-item> -->

              <el-dropdown-item
                v-if="$perms('system_apply_delete')"
                type="text"
                @click.native="handleDelete(scope.row)"
                v-bind:disabled = "disabled"
              >
                确认删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <upload ref="upload" @fetchData="fetchData"></upload>
  </div>
</template>

<script>
import {
  getList,
  doDelete,
  doDeleteAll,
  doExportExcelById,
  getIsDeadLine,
  doSetCompletedFile,
} from "@/api/system/apply/SysApplyManagementApi";
import Edit from "./components/SysApplyManagementEdit";
import Import from "./components/SysApplyManagementImport";
import Upload from "./components/upload";

import { vueButtonClickBan } from "@/utils";
import { isNotNull } from "@/utils/valiargs";
import { formateDate } from "@/utils/format";

export default {
  name: "SysApplyManagement",
  components: {
    Edit,
    Import,
    Upload,
  },
  data() {
    return {
      disabled: true,
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
        this.$refs["edit"].showEdit(row);
        this.$router.push({
          path: "/applyInfo/applyInfo",
          query: {
            form: row,
          },
        });
      }
    },

    async handleUpload(row) {
      if(this.disabled){
        this.$baseMessage("截止时间已到", "warning");
        console.log("截止时间已到");
      }else{
        await this.$refs["upload"].show(row);
        console.log("截止时间未到");

      }
    },

    handleUpdate(row) {
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
      if (row.wordPath) {
        window.open(row.wordPath, "_blank");
      } else {
        this.$baseMessage("请先上传文件", "error");
      }
    },

    // 导出excel
    handleExportExcel(el) {
      // 导出按钮防抖处理 默认限制为10秒
      vueButtonClickBan(el, 10);

      // 执行导出
      doExportExcelById(this.queryForm);
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

    async getIsDeadLine() {
      const { success, msg, data } = await getIsDeadLine();
      if (!success) {
        this.disabled = true;
        this.$baseMessage(msg, "error");
      } else {
        this.disabled = false;
      }
      return success;
    },

    async handelCancel(row) {

      this.$baseConfirm("你确定要撤回申报表吗?", null, async () => {
            const { msg } = await doSetCompletedFile({
              applyId: row.id,
              completedFilePath: "",
            });
            this.$baseMessage(msg, "success");
            await this.fetchData();
          });


      // console.log("prize:"+this.formData.setPrize);
    },

    async fetchData() {
      this.getIsDeadLine();
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
