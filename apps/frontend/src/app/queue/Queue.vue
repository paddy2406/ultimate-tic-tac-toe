<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from '../user-store';
import { useQueueStore } from '../queue/queue-store';
import { useRouter } from 'vue-router';

const timePassed = ref(0);
let interval: any;

const userStore = useUserStore();
const queueStore = useQueueStore();

onMounted(() => {
  const userId = userStore.id;
  if (!userId) {
    useRouter().push('/home');
    return;
  }
  queueStore.joinQueue(userId, userStore.name);
  interval = setInterval(() => {
    timePassed.value += 1;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

watch(
  () => queueStore.matchId,
  (newValue, oldValue) => {
    console.log(`Count changed from ${oldValue} to ${newValue}`);

    setTimeout(() => {
      useRouter().push(`/game/${newValue}`);
    }, 5000);
  }
);
</script>

<template>
  <div v-if="!queueStore.matchId">
    <div>waiting for match...</div>
    <div>Time passed: {{ timePassed }} seconds</div>
    <ul class="player-list">
      <li
        v-for="player in queueStore.playersInQueue"
        :key="player.id"
        class="player-item"
      >
        {{ player.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <h1>Match found!</h1>
    <i class="spinner"></i>
    <p>Joining...</p>
  </div>
</template>

<style scoped>
.player-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.player-item {
  padding: 10px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
