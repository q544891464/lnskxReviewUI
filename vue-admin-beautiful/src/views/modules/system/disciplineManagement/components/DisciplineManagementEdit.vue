<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="105px" class="disciplineManagement-edit-container">
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="编号" prop="disciplineCode">
            <el-input v-model="form.disciplineCode" autocomplete="off" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="名称" prop="disciplineName">
            <el-input v-model="form.disciplineName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {doInsert, doUpdate} from "@/api/system/discipline/disciplineManagement";
  import { deepClone } from "@/utils/clone";
  import { isNull } from "@/utils/validate";
  import { validatorRule } from "@/utils/validateRlue";

  export default {
    name: "DisciplineManagementEdit",
    components: { },
    data() {

      return {
        form: {
          version: 0
        },
        dict: {},
        rules: {
          disciplineCode: [
            { required: true, trigger: "blur", message: "请输入编号" },
            { required: false, trigger: "blur", validator: validatorRule.IS_INTEGER },
          ],
          disciplineName: [
            { required: true, trigger: "blur", message: "请输入名称" },
            { required: false, trigger: "blur", validator: validatorRule.IS_NOT_NULL },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      showEdit(row) {
        if (isNull(row) || isNull(row.id)) {
          this.title = "添加";
          // 如果上级菜单名称不为空 则显示到标题上
          if(!isNull(row) && !isNull(row.parentName) &&
            !isNull(row.parentId) && !isNull(row.parentCode)){
            // 设置上级Id
            this.form.parentId = row.parentId;
            this.title += "  - 上级名称 [ " + row.parentName +" ] - 上级编号 [" + row.parentCode + "]";
          }
        } else {
          this.title = "编辑";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        // 字段数据
        let tmpForm = deepClone(this.form);
        this.dialogFormVisible = false;
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.$emit("refreshNodeBy",tmpForm.parentId);
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            // 字段数据
            let tmpForm = deepClone(this.form);

            // 修改
            if (!isNull(tmpForm.id)) {
              const { success, msg } = await doUpdate(tmpForm);
              if(success){
                this.$baseMessage(msg, "success");
              }
            } else {
              const { success, msg } = await doInsert(tmpForm);
              if(success){
                this.$baseMessage(msg, "success");
              }
            }

            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

