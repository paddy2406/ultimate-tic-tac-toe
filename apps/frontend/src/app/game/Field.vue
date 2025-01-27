<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  fieldData: number[];
  fieldIndex: number;
}>();

defineEmits<{
  makeMove: [number, number];
}>();
</script>

<template>
  <div class="tic-tac-toe">
    <div
      v-for="(state, squareIndex) in fieldData"
      :key="squareIndex"
      @click="$emit('makeMove', fieldIndex, squareIndex)"
      :style="{ pointerEvents: state === 0 ? 'auto' : 'none' }"
      class="cell"
    >
      {{ state }}
    </div>
  </div>
</template>

<style scoped>
.tic-tac-toe {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.row {
  display: flex;
}
.cell {
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: lightblue;
}
</style>
