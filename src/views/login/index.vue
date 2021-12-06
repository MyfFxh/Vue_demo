<template>
  <div class="login-container">
    <!-- 
      model: 绑定的数据
      rules：针对数据绑定规则
      autocomplete 属性规定输入字段是否应该启用自动完成功能。
      自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
    -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          Login Form
        </h3>
      </div>
      <!-- 
      v-model: 为每一个组件绑定对应的数据
      prop: 表单域model的字段，在使用validate\resetFields方法的情况下，必填。
    -->
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <!--??? 为什么要加key，无用
            @keyup(键盘事件)是按键松开，当指定的按键松开会触发的事件
            @keyup.enter	回车按键松开
            @blur 是当元素失去焦点时所触发的事件
            tabindex：输入框的tabindex--- 指定 tab 键顺序
          -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          show-password
          @keyup.enter.native="handleLogin"
        />
        <!-- <span
          class="showpwd"
          @click="showPwd"
        >
          <i :class="passwordType === 'password' ? 'el-icon-turn-off' : 'el-icon-open'" />
        </span> -->
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate.js";
export default {
  name: "Login",
  data() {
    // 定义 用户名和密码的校验规则
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      loading: false, // 设置点击登录按钮时的loading是否显示
    };
  },
  watch: {},
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showPwd() {
      /**
       * 切换密码展示状态
       * bug：点击切换次数过多，会更改为浏览器填写的密码
       */
      this.passwordType = this.passwordType === "password" ? "" : "password";
      // nextTick()，是将回调函数延迟在下一次dom更新数据后调用
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        // 提交时再进行验证
        if (valid) {
          this.loading = true;
          //  Action 通过 store.dispatch 触发
          // login方法在store中定义，并将用户token存入store中
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: "/",
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
