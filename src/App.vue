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
        <message-input-box />
        <message-show-all />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import MessageEditor from './components/MessageEditor.vue';
import MessageShow from './components/MessageShow.vue';
import MessageShowAll from './components/MessageShowAll.vue';

import MessageInputBox from './components/MessageInputBox.vue';

const drawer = ref(false)

const hideDrawer = () => {
  drawer.value = false
}
</script>

<style lang="scss">
.editInput {
  display: inline-block;

  .edit {
    border: 1px solid white;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    min-width: 3rem;
  }
}
</style>