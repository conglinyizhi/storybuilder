<template>
    <v-text-field variant="filled" label="角色名称" v-model="newPeopleInputText"></v-text-field>
    <v-btn color="primary" @click="addPeople">确认添加角色</v-btn>
</template>

<script setup>
import { ref } from 'vue';
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select } = storeToRefs(talkConfig)

const newPeopleInputText = ref('')

const addPeople = () => {
  if (!newPeopleInputText.value.trim()) {
    alert('请给阁下的角色一个名字，好吗')
  } else {
    dataArray.value.push({
      name: newPeopleInputText.value,
      group: 'default',
      profile: ''
    })
    newPeopleDialogShow.value = false
    newPeopleInputText.value = ''
  }
}
</script>