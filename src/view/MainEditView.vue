<template>
  <message-input />
  <div class="messageBox">
    <message-show-all />
    <div class="text-center">——未知的故事，等你开创新的篇章——</div>
  </div>
</template>

<script setup>
import MessageInput from '../components/MessageInput.vue'
import MessageShowAll from '../components/MessageShowAll.vue'
</script>

<style scoped lang="scss">
.messageBox {
  max-height: 70vh;
  overflow-y: auto;
  padding-bottom: 3rem;
}
</style>