<template>
  <div class="form-container">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"

          :model="form"
          :rules="rules"
          size="medium"
          label-width="100px"
          class="applyForm"
        >
          <el-form-item label="成果名称" prop="applyName">
            <el-input v-model="form.applyName"></el-input>
          </el-form-item>


          <el-form-item label="主要完成人" prop="mainAuthors">
            <el-input v-model="form.mainAuthors"></el-input>
          </el-form-item>

          <el-form-item label="关键词" prop="keywords">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>

          <el-form-item label="具体计划、基金名称和编号" prop="fundName">
            <el-input v-model="form.fundName"></el-input>
          </el-form-item>

          <el-form-item label="成果简介" prop="introduction">
            <el-input v-model="form.introduction" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="成果原创性、前沿性、突破性创新内容和学术贡献" prop="innovation">
            <el-input v-model="form.innovation" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="成果应用情况" prop="application">
            <el-input v-model="form.application" type="textarea"></el-input>
          </el-form-item>
<!--          <el-form-item label="活动区域" prop="region">
            <el-select v-model="applyForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
<!--          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="applyForm.delivery"></el-switch>
          </el-form-item> -->
<!--          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="applyForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
<!--          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="applyForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input v-model="applyForm.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item> -->
            <el-button type="primary" @click="submitForm('form')">
              立即创建
            </el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { doInsert, doUpdate } from "@/api/system/apply/SysApplyManagementApi";
  import { isNull } from "@/utils/validate";
  import { formateDate } from "@/utils/format";
  import { validatorRule } from "@/utils/validateRlue";

  export default {
    name: "Form",
    data() {
      return {
        form: {
          applyName: "",
          mainAuthors: "",
          keywords:"",
          fundName:"",
          introduction:"",
          innovation:"",
          application:"",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
        },
        rules: {
          applyName: [
            { required: true, message: "请输入成果名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
          // region: [
          //   { required: true, message: "请选择活动区域", trigger: "change" },
          // ],
          // type: [
          //   {
          //     type: "array",
          //     required: true,
          //     message: "请至少选择一个活动性质",
          //     trigger: "change",
          //   },
          // ],
          // resource: [
          //   { required: true, message: "请选择活动资源", trigger: "change" },
          // ],
          // desc: [
          //   { required: true, message: "请填写活动形式", trigger: "blur" },
          // ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // alert("submit!");
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

            this.$router.push({ path:'/apply'  })


          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

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
