<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="head_box">
        <img src="../assets/xixi.jpg" alt="#" />
      </div>
      <!-- 登录表单区 -->
      <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="iconfont iconuser"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="iconfont iconpassword"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info"  @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '格式错误，请重新输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '格式错误，请重新输入', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   重置表单数据
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    //   登录预校验
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        //       解构赋值data赋值给res
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功!')
        console.log(res)
        // 1.将登录之后的 token,保存到客户端的 sessionStorage中
        //  1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2 token 只应当在当前网站 打开期间生效，所以将token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2.通过编程导航跳转到后台主页，路由地址是 /Home
        this.$router.push('/Home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .head_box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    background-color: #2b4b6b;
    padding: 6px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      widows: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
