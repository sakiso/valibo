import Vue from 'vue'
import VueRouter from 'vue-router'

//view読み込み
import main from '@/views/main'
import teams from '@/views/teams'
import players from '@/views/players'
import entryTeam from '@/views/entry-team'
import entryPlayer from '@/views/entry-player'
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
      { path: '/players', component: players },
      { path: '/entry-team', component: entryTeam },
      { path: '/entry-player', component: entryPlayer },
    ],
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router
