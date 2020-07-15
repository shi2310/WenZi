<template>
  <div class="header">
    <div class="logo"><i class="el-icon-s-promotion"></i> 后台管理</div>
    <div class="user-info">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <div class="link">
          <img
            class="user"
            :src="user.img"
          >
          <p>{{user.username}}</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      const obj = JSON.parse(localStorage.getItem('UserInfo'));
      return obj;
    },
  },
  methods: {
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('username');
        localStorage.removeItem('Authorization')
        this.$router.push('/login');
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    font-size: 16px;
    color: #fff;

    .link {
      color: #fff;
      width: 100%;
      cursor: pointer;
      text-align: center;

      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>