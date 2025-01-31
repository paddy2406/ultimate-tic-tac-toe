<script setup lang="ts">
import Field from './Field.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../user-store';
import { useGameStore } from './game-store';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Modal from '../modal/Modal.vue';
const route = useRoute();
const userStore = useUserStore();
const gameStore = useGameStore();
const router = useRouter();

const gameId = route.params.gameId as string; // Accessing the route parameter

onMounted(() => {
  gameStore.joinGame(gameId, userStore.id);
});

onUnmounted(() => {
  gameStore.reset();
});

const progress = ref(0);
let progressInterval: number | undefined;

watch(
  () => gameStore.isOwnTurn,
  () => {
    clearInterval(progressInterval);
    progress.value = 0;
    if (gameStore.turnDuration === 0) {
      return;
    }

    progressInterval = setInterval(() => {
      const progressTemp =
        progress.value + 100 / (gameStore.turnDuration / 200);
      progress.value = progressTemp > 100 ? 100 : progressTemp;
    }, 200);
  }
);

function move(field: number, square: number) {
  gameStore.makeMove(gameId, userStore.id, field, square);
}

function modalClosed() {
  router.push({ name: 'Home' });
}
</script>

<template>
  <div class="header">
    <h1>-- Playing "{{ gameStore.opponent }}" --</h1>
  </div>

  <div class="board">
    <div v-for="(field, index) in gameStore.board" :key="index" class="row">
      <Field :field-data="field" :field-index="index" @make-move="move" />
    </div>
  </div>
  <div class="progress-box">
    <div class="progress-bar">
      <div
        class="progress"
        :style="{
          width: progress + '%',
          backgroundColor: gameStore.isOwnTurn ? 'green' : 'red',
        }"
      />
    </div>

    {{ gameStore.isOwnTurn ? 'Your Turn' : gameStore.opponent + "'s turn" }}
  </div>

  <Modal :is-visible="gameStore.gameOverMessage !== ''" @close="modalClosed">
    <div class="gameOverMessage">{{ gameStore.gameOverMessage }}</div></Modal
  >
</template>

<style scoped>
.gameOverMessage {
  font-size: 8vmin;
}
.header {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
}

.progress {
  background-color: green;
  height: 2vh;
}

.progress-bar {
  margin-top: 20px;
  width: 100%;
  height: 2vh;
  background-color: lightgray;
}

.progress-box {
  width: 80%;
  padding: 1vmin;
  display: flex;
  align-items: center;
  font-weight: bold;
  flex-direction: column;
}

.board {
  display: grid;
  min-width: 100%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  aspect-ratio: 1 / 1;
}
.row {
  display: contents;
}

h1 {
  font-size: 5vmin;
}
</style>
