import { defineStore } from 'pinia'
import { ref } from 'vue'

type dialogObject = { dialogTitle: { value: String }, dialogSubTitle: { value: String }, isShowDialog: { value: boolean } }

export const useDialogStore = defineStore('dialogStore', function () {
  const dialogTitle = ref('')
  const dialogSubTitle = ref('')
  const isShowDialog = ref(false)

  return { dialogTitle, dialogSubTitle, isShowDialog }
})

export const showDialog = (obj:dialogObject, title: String, subTitle: String) => {
  obj.dialogTitle.value = title
  obj.dialogSubTitle.value = subTitle
  obj.isShowDialog.value = true
}