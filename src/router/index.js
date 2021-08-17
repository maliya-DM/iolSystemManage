import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/DataManage',
    component: Layout,
    meta: { title: '数据管理', icon: 'dashboard' },
    children: [
      {
        path: '/Database',
        name: 'Database',
        component :() => import('@/views/DataManage/Database'),
        meta: { title: '数据库', icon: 'form' }
      },
      {
        path: '/DataPreprocessing',
        name: 'DataPreprocessing',
        component :() => import('@/views/DataManage/DataPreprocessing'),
        meta: { title: '数据预处理', icon: 'link' }
      },
    ]
  },
  {
    path: '/ModelTraining',
    component: Layout,
    meta: { title: '模型训练', icon: 'dashboard' },
    children: [
      {
        path: '/DiagnosticModel',
        name: 'DiagnosticModel',
        component :() => import('@/views/ModelTraining/DiagnosticModel'),
        meta: { title: '诊断模型训练', icon: 'form' }
      },
      {
        path: '/PredictiveModel',
        name: 'PredictiveModel',
        component :() => import('@/views/ModelTraining/PredictiveModel'),
        meta: { title: '预测模型训练', icon: 'link' }
      },
    ]
  },
  {
    path: '/Troubleshooting',
    component: Layout,
    children: [{
      path: 'Troubleshooting',
      name: 'Troubleshooting',
      component: () => import('@/views/Troubleshooting/Troubleshooting'),
      meta: { title: '故障诊断', icon: 'dashboard' }
    }]
  },
  {
    path: '/LifePrediction',
    component: Layout,
    children: [{
        path: 'LifePrediction',
        name: 'LifePrediction',
        component: () => import('@/views/LifePrediction/LifePrediction'),
        meta: { title: '寿命预测', icon: 'dashboard' },
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
