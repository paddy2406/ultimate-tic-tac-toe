<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

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
      <FontAwesomeIcon
        v-if="state === 1"
        :icon="faX"
        style="line-height: 1; font-size: 24px"
      />

      <FontAwesomeIcon
        v-else-if="state === 2"
        :icon="faCircle"
        style="line-height: 1; font-size: 24px"
      />
    </div>
  </div>
</template>

<style scoped>
svg {
  width: 80%;
  height: 80%;
}

.tic-tac-toe {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  aspect-ratio: 1 / 1;
}
.row {
  display: flex;
}
.cell {
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: lightblue;
  aspect-ratio: 1 / 1;
}
</style>
