<!-- nameListItem -->

<template>
  <v-form>
    <!-- v-for dataArray v-model=dataArray.item.name-->
    <v-text-field label="角色名称" v-model="item.name" v-for="(item, i) in dataArray.slice(1)" :key="i"></v-text-field>
    <v-text-field label="角色名称(新建)" v-model="item.name" @keypress.enter="pushPeople"></v-text-field>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
// import store
import { useTalkConfig } from '../store/people'
import { storeToRefs } from 'pinia'
import { useDialogStore, showDialog } from '../store/dialog';

const talkConfig = useTalkConfig()
const { dataArray } = storeToRefs(talkConfig)

const obj = storeToRefs(useDialogStore())

const item = ref({ name: '' })

const pushPeople = () => {
  if (!item.value.name.trim()) {
    showDialog(obj, '错误', '请给阁下的角色一个名字，好吗')
  } else {
    // object clone
    dataArray.value.push(JSON.parse(JSON.stringify(item.value)))
    // item 初始化
    item.value.name = ''
  }
}

</script>
