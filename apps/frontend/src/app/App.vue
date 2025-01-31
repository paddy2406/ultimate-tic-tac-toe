<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
    <div class="content">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #afd2e9;
}

.content {
  width: 100%;
  max-width: 80vh;
  padding: 1vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
