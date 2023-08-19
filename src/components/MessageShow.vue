<template>
  <div>
    内容预览
    <span>{{ dataArray[talkerId].name }}：</span>
    <div class="editInput" v-for="message in messageArray" :key="message" @click="setEditIndex">
      <span class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
      <span class="edit" v-else>{{ message.text }}</span>
    </div>
  </div>
</template>

<script setup>
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