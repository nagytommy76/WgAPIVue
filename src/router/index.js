import { createRouter, createWebHistory } from 'vue-router'
import Player from '../views/Player.vue'

const routes = [
  {
    path: '/',
    name: 'Player',
    component: Player
  },
  {
    path: '/clans',
    name: 'Clan',
    component: () => import('../views/Clan.vue')
  },
  {
    path: '/vehicles',
    name: 'Vehicle',
    component: () => import('../views/Vehicle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
