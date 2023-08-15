<template>
  <div>
    <v-chip prepend-icon="$vuetify" v-text="'ChangeName'" />
  </div>
  <div v-for="message in messageArray" :key="message">
    <span v-if="message.tag"></span>
    <input type="text" v-else>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messageArray = ref([{}])

</script>