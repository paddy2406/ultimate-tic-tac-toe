<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useGameStore } from './game-store';

const gameStore = useGameStore();

const props = defineProps<{
  fieldData: number[];
  fieldIndex: number;
}>();

const winner = computed(() => {
  return checkSingleField(props.fieldData);
});

defineEmits<{
  makeMove: [number, number];
}>();

function checkSingleField(field: number[]): 'empty' | 'X' | 'O' | 'tie' {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winCombinations) {
    if (field[a] === field[b] && field[b] === field[c] && field[a] !== 0) {
      return field[a] === 1 ? 'X' : 'O';
    }
  }
  if (field.some((x) => x === 0)) {
    return 'empty';
  }
  return 'tie';
}

const backgroundcolor = computed(() => {
  if (
    gameStore.currentField === -1 ||
    props.fieldIndex === gameStore.currentField
  ) {
    return gameStore.isOwnTurn ? 'lightgreen' : 'lightcoral';
  }
  return '#EFF6FB';
});
</script>

<template>
  <div>
    <div v-if="winner === 'empty'" class="tic-tac-toe">
      <div
        v-for="(state, squareIndex) in fieldData"
        :key="squareIndex"
        :style="{
          pointerEvents: state === 0 ? 'auto' : 'none',
          backgroundColor: backgroundcolor,
        }"
        class="cell"
        @click="$emit('makeMove', fieldIndex, squareIndex)"
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
    <div v-else-if="winner === 'X'" class="cell completed">
      <FontAwesomeIcon :icon="faX" style="line-height: 1; font-size: 24px" />
    </div>
    <div v-else-if="winner === 'O'" class="cell completed">
      <FontAwesomeIcon
        :icon="faCircle"
        style="line-height: 1; font-size: 24px"
      />
    </div>
    <div v-else class="cell completed"></div>
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

.cell {
  border: 2px solid rgba(0, 0, 0, 0.395);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  background-color: #eff6fb;
}
.completed {
  pointer-events: none;
}

.cell:hover,
.completed {
  filter: brightness(80%);
}
</style>
