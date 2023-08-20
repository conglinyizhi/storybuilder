<template>
  <div v-if="!changeTalker">
    当前发言角色：<v-chip prepend-icon="mdi-account-circle" @click="changeTalker = true">{{ dataArray[talkerId].name }}</v-chip>
  </div>
  <div v-else>
    请选择发言对象：
    <v-chip-group active-class="primary--text" column>
      <v-chip v-for="(talker, iId) in dataArray.slice(1)" @click="changeTalkerId(iId + 1)">
        {{ talker.name }}
      </v-chip>
    </v-chip-group>
    <div>或者，尝试
      <v-chip @click="showCreateView = !showCreateView">
        {{ showCreateView ? '关闭窗口 X' : '添加角色 >' }}
      </v-chip>
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

const changeTalkerId = (i) => {
  talkerId.value = i
  changeTalker.value = false
}
</script>