import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import RoleView from './components/sys/sysrole.vue'
import MenuView from './components/sys/sysmenu.vue'
import ConfigView from './components/sys/sysconfig.vue'
import sysuserinfoView from './components/sys/sysuserinfo.vue'
import sqlControllerView from './components/sys/sqlController.vue'
import deviceView from './components/mainView/device.vue'
import appuserView from './components/mainView/appuser.vue'
import generatorView from './components/mainView/generator.vue'
import timedtaskView from './components/mainView/timedtask.vue'
import timedlogView from './components/mainView/timedlog.vue'
import movieView from './components/mainView/movie.vue'

// Routes
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/dashboard',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {auth: true}
      },
      {
        path: 'sysrole',
        component: RoleView,
        name: '角色管理',
        meta: {auth: true}
      }, {
        path: 'sysmenu',
        component: MenuView,
        name: '菜单管理',
        meta: {auth: true}
      }, {
        path: 'sysconfig',
        component: ConfigView,
        name: '参数管理',
        meta: {auth: true}
      }, {
        path: 'sqlController',
        component: sqlControllerView,
        name: '数据库管理',
        meta: {auth: true}
      }, {
        path: 'sysuserinfo',
        component: sysuserinfoView,
        name: '用户信息',
        meta: {auth: true}
      }, {
        path: 'device',
        component: deviceView,
        name: '设备管理',
        meta: {auth: true}
      }, {
        path: 'appuser',
        component: appuserView,
        name: '用户列表',
        meta: {auth: true}
      }, {
        path: 'generator',
        component: generatorView,
        name: '代码生成',
        meta: {auth: true}
      }, {
        path: 'timedtask',
        component: timedtaskView,
        name: '定时任务管理',
        meta: {auth: true}
      }, {
        path: 'timedlog',
        component: timedlogView,
        name: '定时任务日志',
        meta: {auth: true}
      }, {
        path: 'movie',
        component: movieView,
        name: '电影音乐',
        meta: {auth: true}
      }
    ]
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
