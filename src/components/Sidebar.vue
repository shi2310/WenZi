<template>
  <el-menu
    :default-active="onRoutes"
    unique-opened
    router
    class="el-menu-vertical-demo"
  >
    <template v-for="(item,key) in items">
      <template v-if="item.subs">
        <el-submenu
          :index="item.index"
          :key="key"
        >
          <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem,i) in item.subs"
            :key="i"
            :index="subItem.index"
          >{{ subItem.title }}</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item
          :index="item.index"
          :key="key"
        >
          <i :class="item.icon"></i>{{ item.title }}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'el-icon-setting',
          index: '/index',
          title: '首页'
        },
        {
          icon: 'el-icon-menu',
          index: '2',
          title: '用户管理',
          subs: [
            {
              index: '/users',
              title: '用户列表'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  background-color: #e9eef3;
}
</style>