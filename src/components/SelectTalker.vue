<template>
  <div v-if="!changeTalker">
    当前发言角色：{{ dataArray[talkerId].name }} <v-btn @click="changeTalker = true">更换发言角色</v-btn>
  </div>
  <div v-else>
    请选择发言对象：<v-btn v-for="(talker, iId) in dataArray" @click="changeTalkerOnClick(iId)">{{ talker.name }} - {{ iId
    }}</v-btn>
    <div>或者，尝试
      <v-btn @click="showCreateView =! showCreateView">
        {{ showCreateView ? '直接关闭窗口' : '添加一个角色' }}
      </v-btn>
    </div>
    <div v-show="showCreateView">
      <people-create-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PeopleCreateView from './PeopleCreate.vue'
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select } = storeToRefs(talkConfig)

const showCreateView = ref(false)
const changeTalker = ref(false)

const changeTalkerOnClick = (i) => {
  talkerId.value = i
  changeTalker.value = false
}
</script>