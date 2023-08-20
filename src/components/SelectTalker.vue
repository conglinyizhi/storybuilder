<template>
  <div v-if="!changeTalker">
    <v-chip prepend-icon="mdi-account-circle" append-icon="mdi-reload" @click="changeTalker = true">
      {{ data[talkerId].name }}
    </v-chip>
  </div>
  <div v-else>
    请选择发言对象：
    <v-chip-group active-class="primary-text" color="success" column v-model="chipSelectID" :readonly="true">
      <v-chip prepend-icon="mdi-account-circle" v-for="(people, i) in data.slice(1)" @click="changeTalkerId(i + 1)"
        :value="i">
        {{ people.name }} - {{ i }}
      </v-chip>
      <v-chip prepend-icon="mdi-account-plus">
        {{ showCreateView ? '关闭窗口 X' : '添加角色 >' }}
      </v-chip>
    </v-chip-group>
    <div v-show="chipSelectID == data.length - 1">
      <v-text-field variant="filled" label="角色名称" v-model="nameInput"></v-text-field>
      <v-btn color="primary" @click="addPeople">确认添加角色</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'
import { VChip } from 'vuetify/lib/components/index.mjs'
import { VChipGroup } from 'vuetify/lib/components/index.mjs'

const talkConfig = useTalkConfig()

const { messageArray, dataArray: data, talkerId, select } = storeToRefs(talkConfig)

const showCreateView = ref(false)
const changeTalker = ref(false)
const chipSelectID = ref(0)

const changeTalkerId = (i) => {
  talkerId.value = i
  changeTalker.value = false
}

const nameInput = ref('')

const addPeople = () => {
  if (!nameInput.value.trim()) {
    alert('请给阁下的角色一个名字，好吗')
  } else {
    dataArray.value.push({
      name: nameInput.value,
      group: 'default',
      profile: ''
    })
    nameInput.value = ''
  }
}
</script>