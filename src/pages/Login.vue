<template>
  <div class="box">
    <img src="../assets/logo.png" />
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="80px"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          type="text"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <div class="btn">
        <el-button
          type="primary"
          @click="submitForm()"
        >提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('login', {
              ...this.loginForm
            })
            .then((data) => {
              if (data.Success) {
                this.$router.push({ path: '/index' })
              } else {
                this.$message.error(data.Msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            })
        } else {
          return false
        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 3.8rem;
    display: inline-block;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  form {
    width: 500px;
    display: inline-block;

    .btn {
      text-align: center;
    }
  }
}
</style>