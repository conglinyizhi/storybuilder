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

const talkConfig = useTalkConfig()
const { dataArray } = storeToRefs(talkConfig)

const item = ref({ name: '' })

const pushPeople = ()=>{
  if(!item.value.name.trim()){
    alert('没有输入角色名字')
  }else{
    // object clone
    dataArray.value.push(JSON.parse(JSON.stringify(item.value)))
    // item 初始化
    item.value.name = ''
    
  }
}

</script>
