import Vue from 'vue'
import VueRouter from 'vue-router'

//view読み込み
import teams from '@/views/teams'
import players from '@/views/players'
import entryTeam from '@/views/entry-team'
import entryPlayer from '@/views/entry-player'

Vue.use(VueRouter)

//routerの設定とインスタンス生成

const routes = [
  {
    path: '/',
    name: 'top',
    component: teams,
  },
  {
    path: '/teams',
    name: 'teams',
    component: teams,
  },
  {
    path: '/players',
    name: 'players',
    component: players,
  },
  {
    path: '/entry-team',
    name: 'entry-team',
    component: entryTeam,
  },
  {
    path: '/entry-player',
    name: 'entry-player',
    component: entryPlayer,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
