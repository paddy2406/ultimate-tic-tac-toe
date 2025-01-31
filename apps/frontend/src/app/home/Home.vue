<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../user-store';

const userStore = useUserStore();
const playerNameInput = ref('');

onMounted(() => {
  const storedPlayerId = localStorage.getItem('playerId');
  if (storedPlayerId) {
    userStore.login(storedPlayerId);
  }
});
</script>

<template>
  <div v-if="!userStore.isLoggedIn" class="content">
    <h1>
      ULTIMATE <br />
      TIC-TAC-TOE
    </h1>
    <label for="playerName">Enter Username:</label>
    <input
      id="playerName"
      v-model="playerNameInput"
      type="text"
      placeholder="Your name"
    />
    <button
      :disabled="playerNameInput.trim() === ''"
      @click="userStore.register(playerNameInput)"
    >
      REGISTER
    </button>
  </div>

  <div v-else class="content">
    <h1>HELLO {{ userStore.name }}</h1>
    <label> join matchmaking queue</label>
    <button>
      <RouterLink to="/queue">GO!</RouterLink>
    </button>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  text-align: center;
}

label {
  font-size: smaller;
}

input[type='text'],
textarea {
  padding: 1vmin;
  background-color: #eff6fb;
  border-radius: 2vmin;
}

h1 {
  margin-bottom: 10vmin;
  font-size: 8vmin;
}
</style>
