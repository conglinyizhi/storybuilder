<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>故事构建者</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <LinkListItem linkto="/" title="主编辑器" icon="mdi-home" />
        <LinkListItem linkto="/write" title="文本生成" icon="mdi-pen" />
        <LinkListItem linkto="/edit_name_list" title="编辑角色列表" icon="mdi-format-list-bulleted" />
        <LinkListItem linkto="/about" title="关于" icon="mdi-information" />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import LinkListItem from './components/LinkListItem.vue';
import { ref } from 'vue'
const drawer = ref(false)
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