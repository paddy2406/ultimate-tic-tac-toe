<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useUserStore } from '../user-store';
import { useGameStore } from './game-store';
import { onMounted } from 'vue';
const route = useRoute();
const userStore = useUserStore();
const gameStore = useGameStore();

const gameId = route.params.gameId as string; // Accessing the route parameter

onMounted(() => {
  gameStore.joinGame(gameId, userStore.id);
});

// defineProps<{}>()
</script>

<template>
  <p>Welcome to Game! {{ gameId }}</p>
  <p>opponent: {{ gameStore.opponent }}</p>
  <p>YourTurn: {{ gameStore.isOwnTurn }}</p>
</template>

<style scoped></style>
