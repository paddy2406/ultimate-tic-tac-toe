import { createMemoryHistory, createRouter } from 'vue-router';
import Home from './app/home/Home.vue';
import Queue from './app/queue/Queue.vue';
import Game from './app/game/Game.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/queue', name: 'Queue', component: Queue },
  { path: '/game/:gameId', name: 'Game', component: Game },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
