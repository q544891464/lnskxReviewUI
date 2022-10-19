<template>
    <div class="personalCenter-container">
      <el-row>
        <h2>推荐单位资料设置</h2>
      </el-row>

  
      <el-row :gutter="10" >
        <el-col :md="12" :lg="12" :xl="12">
          <el-form
            ref="baseForm"
            :model="baseForm"
            :rules="baseRules"
            label-width="100px"
          >
            <el-col :span="24" class="line" v-if="baseFormOrgInput !== ''">
              <el-form-item
                label="组织机构："
                prop="username"
                style="font-weight: bold"
              >
                <el-input
                  v-model.trim="baseFormOrgInput"
                  autocomplete="off"
                  disabled
                  title="组织机构"
                ></el-input>
              </el-form-item>
            </el-col>
  

  
            <el-col :span="24" class="line">
              <el-form-item
                label="单位名称："
                prop="unitName"
                style="font-weight: bold"
              >
                <el-input
                  v-model.trim="baseForm.unitName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="24" class="line">
              <el-form-item
                label="单位负责人："
                prop="unitHead"
                style="font-weight: bold"
                
              >
                <el-input
                  v-model="baseForm.unitHead"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位负责人职位："
                prop="headPosition"
                style="font-weight: bold"
                
              >
                <el-input
                  v-model="baseForm.headPosition"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="24" class="line">
              <el-form-item
                label="负责人电话"
                prop="headPhone"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.headPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="负责人手机"
                prop="headMobile"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.headMobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位联系人"
                prop="unitContact"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.unitContact"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位联系人职位"
                prop="contactPosition"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.contPosition"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位联系人电话"
                prop="contPhone"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.contPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="24" class="line">
              <el-form-item
                label="单位联系人手机"
                prop="contMobile"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.contMobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位联系人邮箱"
                prop="contEmail"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.contEmail"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位地址"
                prop="unitAddress"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.unitAddress"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="line">
              <el-form-item
                label="单位邮编"
                prop="unitZipcode"
                style="font-weight: bold"
              >
                <el-input
                  v-model="baseForm.unitZipcode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

  
            <el-col :span="24" style="padding-left: 20px" class="line">
              <el-button type="primary" @click="save">保存</el-button>
            </el-col>
          </el-form>
        </el-col>
  

      </el-row>
  
      <avatar-edit ref="avatar-edit" @fetchData="fetchData"></avatar-edit>
    </div>
  </template>
  
  <script>
  import { getAccessToken } from "@/utils/accessToken";
  import { doInsert, doUpdate } from "@/api/system/orgInfo/OrgInfoManagementApi";
  import { getUserInfo, getUserOrg ,getOrgInfoByCode} from "@/api/user";
  import { isEmail, isName, isNull, isPhone } from "@/utils/validate";
  import { doUpdateSelf } from "@/api/system/user/userManagement";
  import { mapGetters } from "vuex";
  const { baseURL } = require("@/config/settings");
  
  export default {
    name: "PersonalCenterBase",

    data() {
      const validateRealName = (rule, value, callback) => {
        if (isNull(value)) {
          callback(new Error("请输入昵称"));
        } else if (!isName(value)) {
          callback(new Error("请输入正确的昵称格式"));
        } else {
          callback();
        }
      };
  
      const validateMobile = (rule, value, callback) => {
        if (!isNull(value) && !isPhone(value)) {
          callback(new Error("请输入正确的手机号格式"));
        } else {
          callback();
        }
      };
  
      const validateEmail = (rule, value, callback) => {
        if (!isNull(value) && !isEmail(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      };
  
      return {
        proFileLoading: true,
        baseFormOrg: {},
        baseFormOrgInput: "",
        userCode: "",
        baseForm: {
          locked: "0",
        },
        baseRules: {
          realName: [
            { required: true, trigger: "blur", validator: validateRealName },
          ],
          mobile: [
            { required: false, trigger: "blur", validator: validateMobile },
          ],
          email: [{ required: false, trigger: "blur", validator: validateEmail }],
        },
        // cropper
        preview: {},
        tabPosition: "left",
      };
    },
    created() {
      // 加载用户信息
      this.fetchData();
      // 加载用户组织机构
      this.fetchOrgData();
    },
    computed: {
      ...mapGetters({
        avatar: "user/avatar",
      }),
    },
    methods: {

      save() {
        this.$refs["baseForm"].validate(async (valid) => {
          if (valid) {
            if (!isNull(this.baseForm.id)) {
              const { success, msg } = await doUpdate(this.baseForm);
              if(success){
                this.$baseMessage(msg, "success");
              }
            }
          }
        });
      },
  
      // 获取数据
      async fetchData() {
        let accessToken = getAccessToken();
        const { data } = await getUserInfo(accessToken);
        if (!isNull(data)) {
            this.userCode = data.no;
            console.log(this.userCode);
        //   this.baseForm = Object.assign({}, data);
        //   this.baseForm.locked = "0";
        }
        this.fetchOrgInfo();

      },

      async fetchOrgInfo(){
        const { data } = await getOrgInfoByCode({
            code: this.userCode,
            });
            console.log(data);
        if (!isNull(data)) {
            this.baseForm = Object.assign({}, data);
            console.log(this.baseForm);
        }
      },
  
      // 获取数据
      async fetchOrgData() {
        let accessToken = getAccessToken();
        this.proFileLoading = true;
        const { data } = await getUserOrg(accessToken);
        if (!isNull(data)) {
          this.baseFormOrg = Object.assign({}, data);
          // 展示字段
          if (!isNull(this.baseFormOrg)) {
            if (!isNull(this.baseFormOrg.companyName)) {
              this.baseFormOrgInput += this.baseFormOrg.companyName + "(公司)";
            }
            if (!isNull(this.baseFormOrg.departmentName)) {
              this.baseFormOrgInput +=
                " - " + this.baseFormOrg.departmentName + "(部门)";
            }
            if (!isNull(this.baseFormOrg.postName)) {
              this.baseFormOrgInput +=
                " - " + this.baseFormOrg.postName + "(岗位)";
            }
          }
  
          setTimeout(() => {
            this.proFileLoading = false;
          }, 300);
        }
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .personalCenter-container {
    .line {
      clear: both;
    }
  
    .avatar-view {
      padding: 50px;
    }
  }
  
  .element-upload-preview {
    position: relative;
    width: 100%;
    max-width: 180px;
    min-height: 180px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
  
    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      padding: 0.5rem;
      font-size: 1.4rem;
      background: rgba(222, 221, 221, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  
    .upload-mask-icon {
      position: absolute;
      top: 68px;
      right: 66px;
      padding: 0.5rem;
      font-size: 2rem;
      color: #d6d6d6;
    }
  
    .mask {
      position: absolute;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.4s;
  
      &:hover {
        opacity: 1;
      }
    }
  
    img,
    .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;
    }
  }
  
  .avatar-upload-wrapper {
    width: 100%;
    height: 200px;
  }
  </style>
  