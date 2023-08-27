import { defineStore } from 'pinia'
import { ref } from 'vue'

// 消息数组成员数据类型
type MessageArrayItem = { type: 'text' | 'tag' | 'remove', tag: number | undefined, text: string | undefined }

// 消息列表数组成员数据类型
type MessageArrayListItem = { say: number, msg: MessageArrayItem[] }

// 人物数组列表数据类型
type PeopleItem = { name: string, group: string, profile: string }

// 名称列表数据类型
type nameListItem = { name: string, context: string }

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
    // 其他需要快捷输入字符串的列表
    const otherNameList = ref([] as nameListItem[])

    return { messageArray, dataArray, talkerId, select, messageArrayList, messageArrayIndex, otherNameList }
})