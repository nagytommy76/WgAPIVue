import { createRouter, createWebHistory } from 'vue-router'
import Player from '../views/Player.vue'

const routes = [
  {
    path: '/',
    name: 'Player',
    component: Player
  },
  {
    path: '/about',
    name: 'Clan',
    component: () => import('../views/Clan.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
