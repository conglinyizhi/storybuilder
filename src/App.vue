<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>故事构建者</v-app-bar-title>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item to="/" title="主编辑器">
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
          </template>
        </v-list-item>
        <v-list-item to="/about" title="关于">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
        </v-list-item>
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