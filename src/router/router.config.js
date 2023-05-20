// 路由配置
// 本地路由
export const routes = [
  {
    path: '/',
    redirect: { name: 'publicComp' }
  },
  {
    path: '/publicComp',
    name: 'publicComp',
    component: () => import(/* webpackChunkName: "publicComp" */ '@pCom'),
    redirect: { name: 'scroll' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@views/components/index.vue')
      },
      {
        path: 'index1',
        name: 'index1',
        component: () => import(/* webpackChunkName: "index1" */ '@views/components/index1.vue')
      },
      {
        path: 'index2',
        name: 'index2',
        component: () => import(/* webpackChunkName: "index2" */ '@views/components/index2.vue')
      },
      {
        path:'scroll',
        name:'scroll',
        component: () => import(/* webpackChunkName: "scroll" */ '@views/components/scroll.vue')
      }
    ]
  }
]