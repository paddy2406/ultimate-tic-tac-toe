<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from '../user-store';
import { useQueueStore } from '../queue/queue-store';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const userStore = useUserStore();
const queueStore = useQueueStore();
const router = useRouter();

onMounted(() => {
  const userId = userStore.id;
  if (!userId) {
    router.push({ name: 'Home' });
    return;
  }
  queueStore.joinQueue(userId, userStore.name);
});

onUnmounted(() => {
  queueStore.leaveQueue();
});

watch(
  () => queueStore.matchId,
  (newValue) => {
    setTimeout(() => {
      router.push({ name: 'Game', params: { gameId: newValue } });
    }, 1000);
  }
);
</script>

<template>
  <div class="page">
    <div v-if="!queueStore.matchId" class="searching">
      <h1>SEARCHING FOR A <br />MATCH</h1>
      <FontAwesomeIcon :icon="faSpinner" spin />
      <div>
        {{ queueStore.playersInQueue.length }} Player{{
          queueStore.playersInQueue.length !== 1 ? 's' : ''
        }}
        in Queue:
      </div>
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
      <h1>MATCH FOUND!</h1>
      <p>JOINING MATCH AGAINST {{ queueStore.oppenent }}</p>
    </div>
  </div>
</template>

<style scoped>
.searching {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
}

.page {
  text-align: center;
  max-width: 100%;
}

.player-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 60vh;
  max-width: 100%;
  overflow: auto;
  width: 80%;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.player-item {
  padding: 10px;
  margin: 5px 0;
  background-color: #eff6fb;
  border: 2px solid rgba(0, 0, 0, 0.196);
  border-radius: 1dvh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h1 {
  font-size: 7vmin;
}
</style>
