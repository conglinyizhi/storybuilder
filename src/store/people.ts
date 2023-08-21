import { defineStore } from 'pinia'
import { ref } from 'vue'

type MessageArrayItem = { type: 'text' | 'tag' | 'remove', tag: number | undefined, text: string | undefined }

type MessageArrayListItem = { say: number, msg: MessageArrayItem[] }

type PeopleItem = { name: string, group: string, profile: string }

export const useTalkConfig = defineStore('talkConfig', function () {
    const messageArray = ref([{ type: 'text', text: '' }] as MessageArrayItem[]);
    const messageArrayList = ref([] as MessageArrayListItem[]);
    const talkerId = ref(1);
    const select = ref(-1);
    const messageArrayIndex = ref(0);
    const dataArray = ref(['[关闭]', '星光逐鹿', '花语之鹿', '筑梦之树', '森林意志'].map(name => {
        return {
            name,
            group: 'default',
            profile: ''
        }
    }) as PeopleItem[]);
    return { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex }
})