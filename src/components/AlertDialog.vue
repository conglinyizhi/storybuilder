<template>
  <div class="text-center">
    <v-dialog v-model="isShowDialog" width="auto">
      <v-card>
        <v-card-title>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
          {{ dialogSubTitle }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="isShowDialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// import dialog store
import { useDialogStore } from '../store/dialog'
import { storeToRefs } from 'pinia';

const { dialogTitle, dialogSubTitle, isShowDialog } = storeToRefs(useDialogStore())
</script>