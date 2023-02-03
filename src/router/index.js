import { createRouter, createWebHashHistory } from 'vue-router';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'HomeFilled', affix: true }
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/index.vue'),
        name: 'Setting',
        meta: { title: '设置', icon: 'Tools', roles: ['admin'] }
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/menu/index.vue'),
        meta: { title: '菜单', icon: 'Menu', roles: ['admin', 'editor'] },
        redirect: '/menu2',
        children: [
          {
            path: '/menu1',
            name: 'Menu1',
            component: () => import('@/views/menu/menu10.vue'),
            meta: { title: '菜单1', roles: ['admin', 'editor'] },
            redirect: '/menu1-2',
            children: [
              {
                path: '/menu1-1',
                component: () => import('@/views/menu/menu11.vue'),
                name: 'Menu1-1',
                meta: { title: '菜单1-1', roles: ['admin'] }
              },
              {
                path: '/menu1-2',
                component: () => import('@/views/menu/menu12.vue'),
                name: 'Menu1-2',
                meta: { title: '菜单1-2', roles: ['admin', 'editor'] }
              }
            ]
          },
          {
            path: '/menu2',
            component: () => import('@/views/menu/menu2.vue'),
            name: 'Menu2',
            meta: { title: '菜单2', roles: ['admin', 'editor'] }
          }
        ]
      },
      {
        path: '/star',
        component: () => import('@/views/star/index.vue'),
        name: 'Star',
        meta: { title: '图表', icon: 'Histogram', roles: ['admin', 'editor'] }
      },
      {
        path: '/xueyue',
        component: () => import('@/views/xueyue/index.vue'),
        name: 'Xueyue',
        meta: { title: '雪月', icon: 'Flag', roles: ['admin'] },
      },
      {
        path: '/add',
        component: () => import('@/views/add/index.vue'),
        name: 'add',
        meta: { title: '添加商品', icon: 'Plus', roles: ['admin'] },
      },
      {
        path: '/good',
        component: () => import('@/views/good/index.vue'),
        name: 'good',
        meta: { title: '商品管理', icon: 'Sell', roles: ['admin'] },
      },
      {
        path: '/order',
        component: () => import('@/views/order.vue'),
        name: 'order',
        meta: { title: '订单管理', icon: 'Document', roles: ['admin'] },
      },
      {
        path: '/good_list',
        component: () => import('@/views/GoodList.vue'),
        name: 'good_list',
        meta: { title: '商品列表', icon: 'Goods', roles: ['admin', 'editor'] },
      },
      {
        path: '/shopping_cart',
        component: () => import('@/views/ShoppingCart.vue'),
        name: 'shopping_cart',
        meta: { title: '购物车', icon: 'ShoppingCart', roles: ['admin', 'editor'] },
      },
    ],
  },
];

export const asyncRoutes = [];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
