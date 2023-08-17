<template>
    <div>
        内容预览
        <span>{{ dataArray[talkerId].name }}：</span>
        <div class="editInput" v-for="message in messageArray" :key="message">
            <span class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
            <span class="edit" v-else>{{ message.text }}</span>
        </div>
    </div>
</template>

<script setup>
import { useTalkConfig } from '../store/people.js'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select, messageArrayList } = storeToRefs(talkConfig)
</script>