import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTalkConfig = defineStore('talkConfig', function () {
    const messageArray = ref([{ text: '' }])
    const messageArrayList = ref([])
    const dataArray = ref(['小丛林', '红色雨夜', '梦境引擎', '花语之鹿', '纳西妲', '提纳里', '派蒙'].map(name => {
        return {
            name,
            group: 'default',
            profile: ''
        }
    }))
    return { messageArray, dataArray, messageArrayList }
})