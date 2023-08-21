<template>
  <div>
    <span>{{ dataArray[talkerId].name }}：</span>
    <div class="editInput" v-for="(message, index) in messageArray.slice(-4)" :key="index" @click="setEditIndex">
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

const setEditIndex = (index) => {
  const el = dataArray.value[index];
  if (el.type === 'tag') {
    return alert('暂时不可以编辑角色 tag');
    // TODO : 编辑角色 tag 功能
  }
  if (el.text) {
    messageArrayIndex.value = el;
  }
};

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