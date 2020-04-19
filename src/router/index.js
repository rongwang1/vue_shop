import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cate from '../components/goods/Cate'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/Home',
      component: Home,
      redirect: '/Welcome',
      children: [
        { path: '/Welcome', component: Welcome },
        { path: '/Users', component: Users },
        { path: '/Rights', component: Rights },
        { path: '/Roles', component: Roles },
        { path: '/categories', component: Cate }
      ]
    }
  ]
})
// 挂载路由导航守卫(目的是为了判断当seessionStorage中不存在token值时,也就是用户没有登录，但是直接通过URL访问特定的页面，需要重新导航到登录页面)
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从那个路径跳转而来
  // next 是一个函数，表示可以“放行”
  if (to.path === '/Login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/Login')
  next()
})

export default router
