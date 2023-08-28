// isTalkModeSwitch
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTalkModeStroe = defineStore('talkModeStroe', function () {
  const isTalkModeSwitch = ref(false)
  const isTalkModePauseSwitch = ref(false)
  const talkModeOldSelect = ref(0)

  return { isTalkModeSwitch, isTalkModePauseSwitch, talkModeOldSelect }
})