<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id; // Accessing the route parameter
// defineProps<{}>()
</script>

<template>
  <p>Welcome to Game! {{ id }}</p>
</template>

<style scoped></style>
