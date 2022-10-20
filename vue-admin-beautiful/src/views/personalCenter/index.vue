<template>
  <div class="personalCenter-container">
    <el-row :gutter="10">
      <el-tabs :tab-position="tabPosition" v-model="activeTab">
        <el-tab-pane label="基本设置" name="base">
          <profile-base ref="profile-base" />
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="security">
          <profile-security ref="profile-security" />
        </el-tab-pane>
        <el-tab-pane label="推荐单位资料修改" v-if="$perms('system_orginfo_view')" name="org">
          <profile-org-info ref="profile-org-info" />
        </el-tab-pane>

      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import ProfileBase from "./components/profiles/base";
import ProfileOrgInfo from "./components/profiles/orgInfo";
import ProfileSecurity from "./components/profiles/security";
import $store from "@/store";

export default {
  name: "PersonalCenter",
  components: { ProfileBase, ProfileSecurity, ProfileOrgInfo },
  data() {
    return {
      activeTab: "base",
      tabPosition: "top",
    };
  },
  created() {
    if(this.$route.params.activeTab){
      this.activeTab = this.$route.params.activeTab;
      }
    // 如果大于 992 就显示 宽屏模式
    this.screenWidth($store.state.realTime.screenWidth);
  },
  watch: {
    //监听屏幕宽度变化
    "$store.state.realTime.screenWidth": function (val, oldVal) {
      this.screenWidth(val);
    },
  },
  methods: {
    screenWidth(val) {
      // 如果大于 992 就显示 宽屏模式
      if (val >= 992) {
        this.tabPosition = "left";
      } else {
        this.tabPosition = "top";
      }
    },
  },
};
</script>

