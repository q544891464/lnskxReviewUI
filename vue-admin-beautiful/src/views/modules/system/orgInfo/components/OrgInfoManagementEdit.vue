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
          <el-form-item label="单位名称" prop="unitName">
            <el-input v-model="form.unitName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位负责人" prop="unitHead">
            <el-input v-model="form.unitHead" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位负责人职位" prop="headPosition">
            <el-input v-model="form.headPosition" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位负责人电话" prop="headPhone">
            <el-input v-model="form.headPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位负责人手机" prop="headMobile">
            <el-input v-model="form.headMobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位联系人" prop="unitContact">
            <el-input v-model="form.unitContact" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位联系人职位" prop="contPosition">
            <el-input v-model="form.contPosition" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位联系人电话" prop="contPhone">
            <el-input v-model="form.contPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位联系人手机" prop="contMobile">
            <el-input v-model="form.contMobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位联系人邮箱" prop="contEmail">
            <el-input v-model="form.contEmail" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位编码" prop="unitCode">
            <el-input v-model="form.unitCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位地址" prop="unitAddress">
            <el-input v-model="form.unitAddress" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="单位邮编" prop="unitZipcode">
            <el-input v-model="form.unitZipcode" autocomplete="off"></el-input>
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
  import { doInsert, doUpdate } from "@/api/system/orgInfo/OrgInfoManagementApi";
  import { isNull } from "@/utils/validate";
  import { formateDate } from "@/utils/format";
  import { validatorRule } from "@/utils/validateRlue";

  export default {
    name: "OrgInfoManagementEdit",
    data() {

      return {
        form: {
          // 设置默认值
          version: 0
        },
        dict: {},
        rules: {
              unitName: [
                { required: true, trigger: "blur", message: "单位名称非空" },
              ],
              headPosition: [
                { required: true, trigger: "blur", message: "单位负责人职位非空" },
              ],
              contPosition: [
                { required: true, trigger: "blur", message: "单位联系人职位非空" },
              ],
              contPhone: [
                { required: true, trigger: "blur", message: "单位联系人电话非空" },
              ],
              contMobile: [
                { required: true, trigger: "blur", message: "单位联系人手机非空" },
              ],
              contEmail: [
                { required: true, trigger: "blur", message: "单位联系人邮箱非空" },
              ],
              unitCode: [
                { required: true, trigger: "blur", message: "单位编码非空" },
              ],
              unitAddress: [
                { required: true, trigger: "blur", message: "单位地址非空" },
              ],
              unitZipcode: [
                { required: true, trigger: "blur", message: "单位邮编非空" },
              ],
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
