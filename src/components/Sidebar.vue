<template>
  <div class="box">
    <el-menu
      :default-active="onRoutes"
      :collapse="isCollapse"
      unique-opened
      router
      class="el-menu-vertical-demo"
    >
      <template v-for="(item, key) in items">
        <template v-if="item.subs">
          <el-submenu
            :index="item.index"
            :key="key"
          >
            <template slot="title"><i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span></template>
            <el-menu-item
              v-for="(subItem, i) in item.subs"
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
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <a
      @click.prevent="toggle"
      :class="['toggle',isCollapse?'el-icon-arrow-right':'el-icon-arrow-left']"
    ></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "/index",
          title: "首页",
        },
        {
          icon: "el-icon-menu",
          index: "2",
          title: "用户管理",
          subs: [
            {
              index: "/users",
              title: "用户列表",
            },
          ],
        },
      ],
      isCollapse: false
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path
    },
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
  }
}
</script>

<style scoped lang="less">
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .el-menu {
    background-color: #e9eef3;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .toggle {
    text-align: center;
    width: 100%;
    display: block;
    padding: 10px 0;
    background: #dedeee;

    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
