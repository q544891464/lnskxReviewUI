<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="105px">
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="成果名称" prop="applyName">
            <el-input v-model="form.applyName" autocomplete="off"></el-input>
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
  import { doInsert, doUpdate } from "@/api/system/apply/SysApplyManagementApi";
  import { isNull } from "@/utils/validate";
  import { formateDate } from "@/utils/format";
  import { validatorRule } from "@/utils/validateRlue";

  export default {
    name: "SysApplyManagementEdit",
    data() {

      return {
        form: {
          // 设置默认值
          version: 0
        },
        dict: {},
        rules: {
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {

    },
    mounted() {
      // 加载字典值
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.dialogFormVisible = false;
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            // 处理数据
            this.handlerFormData(this.form);

            // 修改
            if (!isNull(this.form.id)) {
              const { success, msg } = await doUpdate(this.form);
              if(success){
                this.$baseMessage(msg, "success");
              }
            } else {
              const { success, msg } = await doInsert(this.form);
              if(success){
                this.$baseMessage(msg, "success");
              }
            }

            await this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
      // 处理 form数据
      handlerFormData(formData){
        if(!isNull(formData)){
          for(let key in formData){
            // 对于时间类进行处理
            if("[object Date]" === Object.prototype.toString.call(formData[key])){
              formData[key] = formateDate(formData[key], 'yyyy-MM-dd hh:mm:ss');
            }
          }
        }
      },
    },
  };
</script>
