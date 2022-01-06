<template>
  <div class="tenantManagement-container">

    <el-collapse-transition>
    <div class="more-query" v-show="this.moreQueryFlag">
      <!-- 更多查找 -->
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>


          </el-form>
        </vab-query-form-left-panel>

      </vab-query-form>
      <el-divider></el-divider>
    </div>
    </el-collapse-transition>

    <!-- 主要操作  -->
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <el-button
            v-if="$perms('system_apply_insert')"
            icon="el-icon-plus"
            type="primary"
            @click="handleInsert"
        > 添加 </el-button>

<!--        <el-button
            v-if="$perms('system_apply_import')"
            icon="el-icon-upload2"
            type="warning"
            @click="handleImportExcel"
        > 导入 </el-button> -->

        <el-button
            v-if="$perms('system_apply_export')"
            icon="el-icon-download"
            type="warning"
            @click="handleExportExcel"
        > 导出 </el-button>

        <el-button
            v-if="$perms('system_apply_delete')"
            :disabled="!selectRows.length > 0"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete"
        > 批量删除 </el-button>

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
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>

      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{(queryForm.pageNo - 1) * queryForm.pageSize + scope.$index + 1}}
        </template>
      </el-table-column>

      <el-table-column
              show-overflow-tooltip
              prop="applyName"
              label="成果名称"
      ></el-table-column>

<!--      <el-table-column
              show-overflow-tooltip
              prop="discipline"
              label="学科专业"
      ></el-table-column> -->

      <el-table-column
              show-overflow-tooltip
              prop="keywords"
              label="关键词"
      ></el-table-column>




      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="200"
        v-if="$perms('system_apply_update') || $perms('system_apply_delete')"
      >
        <template v-slot="scope">
          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handleView(scope.row)"
          > 查看 </el-button>

          <el-divider direction="vertical"></el-divider>

<!--          <el-button
            v-if="$perms('system_apply_delete')"
            type="text"
            @click="handleDelete(scope.row)"
          > 删除 </el-button> -->

          <el-button
            v-if="$perms('system_apply_update')"
            type="text"
            @click="handlePrize(scope.row)"
          > 设置奖项 </el-button>
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
    <import ref="import" @fetchData="fetchData" ></import>
    <prize ref="prize" @fetchData="fetchData" ></prize>

  </div>
</template>

<script>
  import { getList,getListByIsPassed, doDelete, doDeleteAll, doExportExcelByIsPass } from "@/api/system/apply/SysApplyManagementApi";
  import Edit from "./components/SysApplyManagementEdit";
  import Import from "./components/SysApplyManagementImport";
  import Prize from "./components/selectPrize";

  import { vueButtonClickBan } from "@/utils";
  import { isNotNull } from "@/utils/valiargs";
  import { formateDate } from "@/utils/format";

  export default {
    name: "SysApplyManagement",
    components: { Edit, Import ,Prize},
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
        dict:{},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      };
    },
    created() {
      this.fetchData();
    },
    mounted() {
    },
    methods: {
      async handleEnable(row) {
        const isPass = row.isPass;
        // 回退原有状态
        if(row.isPass === "0") row.isPass = "1"
        else if(row.isPass === "1") row.isPass = "0"

        if (row.id) {
          const { msg } = await doIsPassApply({
            applyId: row.id,
            isPass: isPass
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
        this.$router.push({ path:'/createApply'  })
      },
      handleView(row) {
        if (row.id) {
          // this.$refs["edit"].showEdit(row);
          this.$router.push({
            path:'/createApply',
            query:{
              form:row,
              // disabled:true,
            }
            })
        }
      },
      handlePrize(row) {
        this.$refs["prize"].show(row);
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
      handleExportExcel(el){
        // 导出按钮防抖处理 默认限制为10秒
        vueButtonClickBan(el, 10);

        // 执行导出
        doExportExcelByIsPass(this.queryForm);
      },
      // 导入excel
      handleImportExcel(){
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
      moreQuery(){
        this.moreQueryFlag = !this.moreQueryFlag;
      },
      queryData() {

        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getListByIsPassed(this.queryForm);
        if(isNotNull(data)){
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
