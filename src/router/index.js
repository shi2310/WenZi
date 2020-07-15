import Vue from "vue"
import Router from "vue-router"
import Login from "@/pages/Login"
import Index from "@/pages/Index"
import Home from "@/pages/Home"
import Users from "@/pages/Users"

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录",
      },
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      // 自定义属性，设置是否必须Authorization
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "/",
          component: Home,
          meta: {
            title: "首页",
          },
        },
        {
          path: "/users",
          component: Users,
          meta: {
            title: "用户管理",
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 根据设置的requireAuth客户端简单验证token是否存在
  if (to.matched.some((r) => r.meta.requireAuth)) {
    let token = localStorage.getItem("Authorization")
    if (token) {
      next()
    } else {
      next({
        path: "/login",
      })
    }
  } else {
    next()
  }
})

export default router
