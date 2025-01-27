<script setup lang="ts">
import Field from './Field.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../user-store';
import { useGameStore } from './game-store';
import { onMounted, ref, watch } from 'vue';
const route = useRoute();
const userStore = useUserStore();
const gameStore = useGameStore();

const gameId = route.params.gameId as string; // Accessing the route parameter

onMounted(() => {
  gameStore.joinGame(gameId, userStore.id);
});

const progress = ref(0);
let progressInterval;

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
</script>

<template>
  <div class="page">
    <div class="gameBody">
      <div class="header">
        <h1>-- Playing "{{ gameStore.opponent }}" --</h1>
      </div>

      <div class="board">
        <div v-for="(field, index) in gameStore.board" :key="index" class="row">
          <Field :field-data="field" :field-index="index" @makeMove="move" />
        </div>
      </div>
      <div class="progress-box">
        <div v-if="gameStore.isOwnTurn">Your Turn</div>
        <div v-else>{{ gameStore.opponent }}'s turn</div>
        <div class="progress-bar">
          <div
            class="progress"
            :style="{
              width: progress + '%',
              backgroundColor: gameStore.isOwnTurn ? 'green' : 'red',
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
}

.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.progress {
  background-color: green;
  height: 2vh;
}

.progress-bar {
  margin-top: 20px;
  width: 80%;
  height: 2vh;
  background-color: lightgray;
}

.progress-box {
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  flex-direction: column;
}

.gameBody {
  width: 100%;
  max-width: 80vh;
  padding: 20px;
}

.board {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 100%;

  aspect-ratio: 1 / 1;
}
.row {
  display: contents;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  width: 100px;
  height: 100px;
}
</style>
