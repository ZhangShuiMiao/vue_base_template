<template>
  <div class="login_container">
    <div class="login_mid">
      <el-row>
        <el-col :span="12">
          <div class="loginLeft">
            <div class="title_font">星光数据平台</div>
            <img src="@/assets/bgc.png" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="loginRight">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
              <div class="title-container">
                <h3 class="title">欢迎登录!</h3>
              </div>
              <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" password v-model="loginForm.password" placeholder="请输入密码" />
              </el-form-item>
            </el-form>
            <el-button  type="primary" v-loading="loading" class="btn_calss" @click="init">
              登录
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    const usernameValid = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
    }
    const passWordValid = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入密码'))
      }
    }
    return {
      loginForm: { username: '', password: '' },
      loginRules: {
        username: [{ required: true, validator: usernameValid, trigger: 'blur' }],
        password: [{ required: true, validator: passWordValid, trigger: 'blur' }]
      },
      loading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    init() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/loginIn', this.loginForm)
            .then(() => {
              this.loading = false
              this.$Message.success('登录成功')
              this.$router.push('/screen')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@bg: #f7f8f9;
.login_container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
}
.login_mid {
  margin: 100px;
  height: calc(100vh - 200px);
}
.loginLeft {
  width: 820px;
}
.title_font {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3f4f83;
  line-height: 50px;
  text-align: left;
  margin-bottom: 64px;
}
.loginRight {
  width: 352px;
  height: 352px;
  background: #ffffff;
  box-shadow: 4px 4px 20px 0px #e5e5e5;
  border-radius: 12px;
  margin: 100px 0 0 200px;
  padding: 0 20px;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  .ivu-form-item {
    text-align: center;
  }
}
.title-container {
  position: relative;

  .title {
    font-size: 18px;
    color: #333;
    margin: 45px auto 28px auto;
    text-align: center;
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.btn_calss {
  width: 354px;
  height: 40px;
  background: #2484f2;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
// .cus_text {
//   -webkit-user-select: none;

//   -moz-user-select: none;

//   -ms-user-select: none;

//   user-select: none;
// }
</style>

