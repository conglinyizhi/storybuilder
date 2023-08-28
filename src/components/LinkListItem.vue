<template>
  <v-list-item :to="linkto" :title="title">
    <template v-slot:prepend>
      <v-icon>{{ icon }}</v-icon>
    </template>
  </v-list-item>
</template>

<script setup>
import { defineProps } from 'vue';

const { linkto, title, icon } = defineProps({
  linkto: String,
  title: String,
  icon: String
})
</script>