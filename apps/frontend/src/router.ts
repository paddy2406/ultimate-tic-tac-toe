import { createMemoryHistory, createRouter } from 'vue-router';
import Home from './app/home/Home.vue';
import Queue from './app/queue/Queue.vue';
import Game from './app/game/Game.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/queue', component: Queue },
  { path: '/game', component: Game },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
