<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
export default {
  name: 'home',
  components: {
    Header,
    Sidebar
  },
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #52bab5;
  color: #333;
  text-align: center;
}

.el-aside {
  color: #333;
  background-color: #e9eef3;
  width: 200px !important;
}

.el-main {
  color: #333;
  text-align: center;
  height: 100%;
  overflow-y: auto;
}

body > .el-container {
  height: 100%;
}
</style>