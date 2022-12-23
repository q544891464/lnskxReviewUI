<template>
  <div class="personalCenter-container">
    <el-row>
      <h2>专家资料设置</h2>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="12" :lg="12" :xl="12">
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="baseRules"
          label-width="150px"
        >
          <el-col :span="24" class="line" v-if="baseFormOrgInput !== ''">
            <el-form-item
              label="组织机构"
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
              label="专家名"
              prop="expertName"
              style="font-weight: bold"
            >
              <el-input
                v-model.trim="baseForm.expertName"
                autocomplete="off"
                disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
            <!-- <el-form-item label="专业" prop="process" style="font-weight: bold">
              <el-input
                v-model="baseForm.process"
                autocomplete="off"
              ></el-input>
            </el-form-item> -->
          <!-- <el-col :span="24" class="line">


            <el-form-item
              label-width="150px"
              label="学科专业分类(专业代码)"
              prop="discipline"
            >
              <el-cascader
                v-model="baseForm.discipline"
                :options="disciplineOptions"
                :props="disciplineProps"
                @change="disciplinOptionChange"
                :style="{ width: '100%' }"
                placeholder="请选择学科专业分类!"
                v-bind:disabled="disabled"
              ></el-cascader>
            </el-form-item>
          </el-col> -->

          <el-col :span="24" class="line">
            <el-form-item
              label="工作单位"
              prop="workplace"
              style="font-weight: bold"
            >
              <el-input
                v-model="baseForm.workplace"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item label="职称" prop="title" style="font-weight: bold">
              <el-input v-model="baseForm.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item
              label="职务"
              prop="position"
              style="font-weight: bold"
            >
              <el-input
                v-model="baseForm.position"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item
              label="身份证号"
              prop="idNumber"
              style="font-weight: bold"
            >
              <el-input
                v-model="baseForm.idNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item
              label="开户银行"
              prop="bank"
              style="font-weight: bold"
            >
              <el-input v-model="baseForm.bank" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item
              label="银行卡号"
              prop="bankNumber"
              style="font-weight: bold"
            >
              <el-input
                v-model="baseForm.bankNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24" class="line">
            <el-form-item label="手机" prop="phone" style="font-weight: bold">
              <el-input v-model="baseForm.phone" autocomplete="off"></el-input>
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
import {
  doInsert,
  doUpdate,
  getByUserId,
} from "@/api/system/expertManagement/SkxExpertManagementApi";
import { getUserInfo, getUserOrg, getOrgInfoByCode } from "@/api/user";
import { isEmail, isName, isNull, isPhone } from "@/utils/validate";
import { getTreeAll } from "@/api/system/discipline/disciplineManagement";
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
      disciplineOptions: [],
      disciplineName: "",
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
      disciplineProps: {
        multiple: false,
        label: "disciplineName",
        value: "disciplineName",
        children: "children",
        checkStrictly: false,
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
        

        // this.baseForm.disciplineName = this.baseForm.discipline[1].substring(
        //   0,
        //   this.baseForm.discipline[1].length - 2
        // );

        // this.baseForm.disciplineCode = this.baseForm.discipline[1].substring(
        //   this.baseForm.discipline[1].length - 2,
        //   this.baseForm.discipline[1].length
        // );

        // this.baseForm.disciplineGroup = this.baseForm.discipline[0];

        // this.baseForm.discipline = JSON.stringify(this.baseForm.discipline);

        if (valid) {
          if (!isNull(this.baseForm.id)) {
            const { success, msg } = await doUpdate(this.baseForm);
            if (success) {
              this.$baseMessage(msg, "success");
            }
          }
        }

        // this.baseForm.discipline = JSON.parse(this.baseForm.discipline);

      });
    },

    //获取专业学科列表
    async getDisciplineList() {
      const { success, msg, data } = await getTreeAll();
      if (success) {
        this.disciplineOptions = data;
        console.log(this.disciplineOptions, "this.disciplineOptions");
      }
      // console.log(this.disciplineOptions,"this.disciplineOptions");
      // console.log(success,"success");
    },

    // 获取数据
    async fetchData() {
      // 调用方法获取所有学科专业数据
      this.getDisciplineList();
      let accessToken = getAccessToken();
      const { data } = await getUserInfo(accessToken);
      if (!isNull(data)) {
        this.userCode = data.no;
        console.log(this.userCode);
        //   this.baseForm = Object.assign({}, data);
        //   this.baseForm.locked = "0";
      }
      this.fetchExpertInfo();

      // console.log(this.baseForm.discipline, "this.baseForm.discipline");
    },

    async fetchExpertInfo() {
      const { data } = await getByUserId();
      console.log(data);
      if (!isNull(data)) {
        this.baseForm = Object.assign({}, data);
        console.log(this.baseForm);
        if (this.baseForm.discipline) {
          console.log(this.baseForm.discipline, "this.baseForm.discipline");
          this.baseForm.discipline = JSON.parse(this.baseForm.discipline);
        }
      }
    },

    disciplinOptionChange(val) {
      // this.form.discipline = val[1];
      console.log(val, "discipline");
      this.baseForm.disciplineName = val[1];
      console.log(this.baseForm.disciplineName);
      // console.log(this.form.discipline instanceof Array,"type");
      // console.log(this.disciplineOptions[val[0]].children,"disciplineOptionName");
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
