<template>
  <div class="page">
    <div v-if="!userStore.isLoggedIn">
      <div class="input-container box">
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
      </div>
      <button
        :disabled="playerNameInput.trim() === ''"
        @click="userStore.register(playerNameInput)"
      >
        REGISTER
      </button>
    </div>

    <div v-else class="box">
      <h1>HELLO {{ userStore.name }}</h1>
      <label> join matchmaking queue</label>
      <button>
        <RouterLink to="/queue">GO!</RouterLink>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../user-store';
const userStore = useUserStore();

const playerNameInput = ref('');

const isModalOpen = ref(false);

onMounted(() => {
  const storedPlayerId = localStorage.getItem('playerId');
  if (storedPlayerId) {
    userStore.login(storedPlayerId);
  }
  setTimeout(() => {
    isModalOpen.value = true;
  }, 3000);
});

function modalClosed() {
  console.log('closed');
  isModalOpen.value = false;
}
</script>

<style scoped>
.page {
  text-align: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vmin;
}

h1 {
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
  font-size: smaller;
}

input[type='text'],
textarea {
  padding: 1vmin;
  background-color: #eff6fb;
  border-radius: 2vmin;
  color: #454545;
}

h1 {
  margin-bottom: 10vmin;
  font-size: 8vmin;
}
</style>
