<template>
  <div>
    全部对话内容
    <div v-for="$message in messageArrayList" :key="$message">
      <span>{{ dataArray[$message.say].name }}：</span>
      <div class="editInput" v-for="message in $message.msg" :key="message">
        <span class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
        <span class="edit" v-else>{{ message.text }}</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex } = storeToRefs(talkConfig)

</script>