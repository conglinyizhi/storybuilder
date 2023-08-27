<template>
  <v-btn @click="startWriter">开始生成</v-btn>
  <div v-for="t in text" v-text="t">
  </div>
</template>

<script setup>
// import store
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'

import { ref } from 'vue'

const talkConfig = useTalkConfig()
const { dataArray, messageArrayList } = storeToRefs(talkConfig)

const text = ref([])

const startWriter = () => {
  text.value = messageArrayList.value.map(message => {
    const name = dataArray.value[message.say].name
    const sayText = message.msg.map(msg => {
      switch (msg.type) {
        case 'text': return msg.text
        case 'tag': return dataArray[msg.tag].name
      }
    })
    return `${name}：${sayText.join('')}`
  })
}
</script>