import Vue from 'vue'
import VueRouter from 'vue-router'

//view読み込み
import main from '@/views/main'
import teams from '@/views/teams'
import entryTeam from '@/views/entry-team'
import adminSignin from '@/views/signin'

Vue.use(VueRouter)
//routerの設定とインスタンス生成
const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [
      // menu内に各アプリのURLをネスト
      { path: '/teams', component: teams },
      { path: '/entry-team', component: entryTeam },
      { path: '/signin', component: adminSignin },
    ],
  },
]
const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes,
})
export default router
