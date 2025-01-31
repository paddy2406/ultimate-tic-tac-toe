<template>
  <transition>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <div class="message"><slot /></div>

        <div class="modal-footer">
          <button @click="$emit('close')">CLOSE</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();

defineEmits<{
  close: void;
}>();
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  border-radius: 5vh;
  padding: 20px;
  border: 1px solid #888;
  max-width: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  padding: 3vh;
}

.message {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
