<template>
  <div class="home-container">
    <div v-if="!userStore.isLoggedIn">
      <h1>Welcome to Ultimate Tic-Tac-Toe</h1>
      <div class="input-container">
        <label for="playerName">Enter your name:</label>
        <input
          id="playerName"
          v-model="playerNameInput"
          type="text"
          placeholder="Your name"
        />
      </div>
      <button
        :disabled="playerNameInput.trim() === ''"
        @click="userStore.register(playerNameInput)"
      >
        Register
      </button>
    </div>

    <div v-else>
      <h1>Hello {{ userStore.name }}</h1>
      <label> Press button to join matchmaking queue</label>
      <button @click="$router.push('/queue')">Go!</button>
    </div>
  </div>
</template>

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

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

h1 {
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

input {
  padding: 5px;
  font-size: 16px;
}
</style>
