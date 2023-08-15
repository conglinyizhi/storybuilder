<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="hideDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>故事构建者</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      尚未用到这块区域，暂时隐藏
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <message-editor @send-message="sendMessageTest"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import MessageEditor from './components/MessageEditor.vue';

const drawer = ref(false)

const hideDrawer = () => {
  drawer.value = false
}

const sendMessageTest = (data) => {
  console.log('pushMessageTest',data);
}
</script>