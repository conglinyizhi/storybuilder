import MainEditView from './view/MainEditView.vue';

const router = [{
  path: '/',
  component: MainEditView
},
// 定义一个懒加载路由，需要的时候再加载他们
{
  path: '/about',
  component: ()=>import('./view/AboutView.vue')
}
];

export default router