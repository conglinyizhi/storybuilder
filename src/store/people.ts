import { defineStore } from 'pinia'
import { ref } from 'vue'

type MessageArrayItem = { type: 'text' | 'tag', tag: number | undefined, text: string | undefined }
// 定义一个类型,say is number ,msg is array<MessageArrayItem>
type MessageArrayListItem = { say: number, msg: MessageArrayItem[] }


export const useTalkConfig = defineStore('talkConfig', function () {
    const messageArray = ref([{ type: 'text', text: '' }] as MessageArrayItem[]);
    const messageArrayList = ref([] as MessageArrayListItem[]);
    const talkerId = ref(1);
    const select = ref(-1);
    const messageArrayIndex = ref(0);
    const dataArray = ref(['[关闭]', '小丛林', '红色雨夜', '梦境引擎', '花语之鹿', '纳西妲', '提纳里', '派蒙'].map(name => {
        return {
            name,
            group: 'default',
            profile: ''
        }
    }))
    return { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex }
})