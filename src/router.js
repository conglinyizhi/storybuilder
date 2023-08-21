import MainEditView from './view/MainEditView.vue';

const router = [{
  path: '/',
  component: MainEditView
}, {
  path: '/about',
  component: () => import('./view/AboutView.vue')
}, {
  path: '/write',
  component: () => import('./view/WriterView.vue')
}
];

export default router