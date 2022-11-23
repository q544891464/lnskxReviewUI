<template>
  <div class="login-container">
    <!-- <el-alert
      title="辽人社函2022 275号关于自然科学学术成果奖评选通知"
      type="success"
      :closable="true"
      style="position: fixed"
      @click.native="handleViewFile(url)"
    ></el-alert>  -->



    <el-row>
      <!-- <div class="vab-ad">
      <el-carousel
        v-if="adList"
        height="30px"
        direction="vertical"
        :autoplay="true"
        :interval="3000"
        indicator-position="none"
        style="background-color: #fff;"
      >
        <el-carousel-item v-for="(item, index) in adList" :key="index">
          <el-tag type="warning"> 通知 </el-tag>
          <a target="_blank" :href="item.url">{{ item.title }}</a>
        </el-carousel-item>
      </el-carousel>
    </div> -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        
        <h3 class="titlename">
          <img
            style="width: 80px; float: left; margin-top: -20px"
            src="~@/assets/login_images/logo.png"
          />
          2022年辽宁省自然科学学术成果奖申报系统
          <!-- 2022年学会优秀论文申报系统 -->
        </h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="14" :sm="14" :md="24" :lg="14" :xl="14">
        <div>
          <img
            style="width: 70%; margin: 10% 0 0 10%"
            src="~@/assets/login_images/pic.png"
          />
        </div>
      </el-col>
      <el-col :xs="10" :sm="10" :md="24" :lg="10" :xl="10">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <!-- <div class="title">
            <img src="~@/assets/login_images/title.png" alt="" />
          </div> -->
          <div class="title-tips">用户登录</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item v-if="captchaFlag" prop="captcha">
            <span class="svg-container">
              <i class="el-icon-warning" />
            </span>
            <el-input
              ref="captcha"
              v-model.trim="form.captcha"
              placeholder="请输入验证码"
              name="captcha"
              type="text"
              tabindex="1"
              autocomplete="on"
              maxlength="10"
              style="width: calc(100% - 200px)"
              @keyup.enter.native="handleLogin"
            />
            <img
              class="captcha"
              style="float: right"
              title="看不清，换一张"
              alt="验证码"
              :src="captchaImg"
              @click="getCaptcha"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="handleLogin"
              style="display: inline-block; margin-right: 20px"
            >
              登录
            </el-button>

            <router-link to="/register">
              <el-button
                :loading="loading"
                class="login-btn"
                type="primary"
                style="display: inline-block"
              >
                注册
              </el-button>
            </router-link>

            <!-- <router-link to="getBackPassword">
              <div style="margin-top: 20px;margin-left: 40px;">找回密码</div>
            </router-link> -->

            <router-link to="/getBackPassword" style="display: inline-block">
              <div style="margin-top: 20px">找回密码</div>
            </router-link>

            <el-button
              type="text"
              style="margin-top: 20px; margin-left: 30px; display: inline-block"
              @click="handleViewFile(url)"
            >
              帮助
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        opacity: 0.6;
        color: #fff;
        margin: -10px 10;
      "
    >
      成果奖业务咨询 联系人：省科协学会（国际）部 王婷 024-23852101 13252728181
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        opacity: 0.6;
        color: #fff;
        margin: 5px 0;
      "
    >
      信息平台技术咨询 联系人：陈维帆 13322424050
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        opacity: 0.6;
        color: #fff;
        margin: 5px 0;
      "
    >
      CopyRight @ 2022 辽宁省科学技术协会 版权所有 ALL Rights Reserved
    </div>

    <!-- <footer></footer> -->

    <!-- <login-tips ref="login-tips" @tipsClick="tipsClick"></login-tips> -->
  </div>
</template>

<script>
import { uuid } from "@/utils";
import { isNull } from "@/utils/valiargs";
import { validatorRule } from "@/utils/validateRlue";
import { captcha } from "@/api/user";
import { footer } from "./components/footer";
import Footer from "./components/footer.vue";

// TODO 演示专用 开发记得删除
// import LoginTips from "./components/LoginTips";

export default {
  name: "Login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  // components: { LoginTips },
  components: { Footer },
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
      adList: [
        {
          title: "辽人社函2022 275号关于自然科学学术成果奖评选通知",
          url: "http://42.101.40.191:7000/opsli-boot/static/files/辽人社函2022 275号关于自然科学学术成果奖评选通知.pdf",
        },
      ],
      title: this.$baseTitle,
      url: "http://42.101.40.191:7000/opsli-boot/static/files/辽人社函2022 275号关于自然科学学术成果奖评选通知.pdf",
      form: {
        username: "",
        password: "",
        captcha: "",
        uuid: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          // { required: true, trigger: "blur", validator: validatorRule.IS_GENERAL },
        ],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      captchaFlag: false,
      loading: false,
      passwordType: "password",
      redirect: undefined,
      captchaImg: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },

  created() {
    document.body.style.overflow = "hidden";
    this.form.uuid = uuid();
    this.captchaImg = captcha(this.form.uuid);
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
  },
  mounted() {
    // TODO 演示使用 开发手动删除
    // this.$refs["login-tips"].show();
  },
  methods: {
    // TODO 演示使用 开发手动删除
    tipsClick(ret) {
      // 点击登录
      this.form.username = ret.username;
      this.form.password = ret.password;
      this.handleLogin();
    },

    handleViewFile(url) {
      window.open(url);
    },

    // 获得新验证码
    getCaptcha() {
      this.captchaImg = captcha(this.form.uuid);
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(() => {
              const routerPath =
                this.redirect === "/404" || this.redirect === "/401"
                  ? "/"
                  : this.redirect;
              this.$router.push(routerPath).catch(() => {});
              // this.$router.push("/index").catch(() => {});
              this.loading = false;
            })
            .catch(() => {
              // 获取当前失败次数
              this.$store
                .dispatch("user/getSlipCount", this.form)
                .then((ret) => {
                  this.loading = false;
                  const { data } = ret;
                  if (!isNull(data) && data.curr >= data.base) {
                    // 失败次数大于系统规定阈值 开启验证码校验
                    this.captchaFlag = true;
                  }
                })
                .catch(() => {
                  this.loading = false;
                });
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login_images/background2.jpg") center center fixed
    no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgba(14, 18, 26, 1);
  }
  .titlename {
    margin-top: 70px;
    font-size: 40px;
    color: #fff;
    font-weight: 600;
    margin-left: 30px;
  }

  .title-tips {
    margin-top: 29px;
    font-size: 30px;
    font-weight: 400;
    text-align: center;

    // color: rgba(14, 18, 26, 1);
    color: #d7dee3;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 150px;
    height: 50px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .register-btn {
    display: inherit;
    width: 150px;
    height: 60px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    background-color: #00000060;
    position: relative;
    max-width: 100%;
    // margin: calc((100vh - 425px) / 2) 10% 10%;
    margin: 15% 20% 0 0;
    // margin: 50px 90px;
    overflow: hidden;
    padding: 2rem 3rem;
    width: 340px;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: $base-z-index;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .captcha {
    position: absolute;
    top: -2.5px;
    right: 0;
    width: 180px;
    height: 58px;
    margin-top: 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 30px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 58px;
        color: $base-font-color;
        background: #f6f4fc;
        border: 0;
        caret-color: $base-font-color;
      }
    }
  }
}
</style>
