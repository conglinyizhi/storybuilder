<template>
  <div>
    全部对话内容
    <div class="messageItem" v-for="$message in messageArrayList" v-show="$message.msg.type !== 'remove'" :key="$message">
      <v-chip prepend-icon="mdi-account-circle" closable @click:close="removeMessageById($message)">{{ dataArray[$message.say].name }}</v-chip>
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
import { VChip } from 'vuetify/lib/components/index.mjs'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex } = storeToRefs(talkConfig)

const removeMessageById = (msg) => {
  msg.msg.type = 'remove'
}
</script>

<style lang="scss">
.messageItem:hover{
  background: darkslategrey;
  border-radius: 1rem;
  transition: all 0.1s;
}
</style>