<template>
  <div>
    <span>{{ dataArray[talkerId].name }}：</span>
    <div class="editInput" v-for="(message, index) in messageArray.slice(-4)" :key="index">
      <v-chip class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</v-chip>
      <span class="edit" v-else>{{ message.text }}</span>
    </div>
    <span class="flash">_</span>
  </div>
</template>

<script setup>
import { VChip } from 'vuetify/lib/components/index.mjs';

import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex } = storeToRefs(talkConfig)
</script>

<style scoped lang="scss">
.flash {
  // 循环展示动画
  animation: flashAnimation 0.5s infinite;
}

// flashAnimation 动画
@keyframes flashAnimation {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}</style>