<template>
  <SelectTalker />
  <!-- <div class="editInput" v-for="(message, iId) in messageArray" :key="message">
    <span :data-id="iId" class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
    <input :data-id="iId" class="edit" type="text" v-model="message.text" @keyup.enter="inputEnter" @input="inputText"
      @keydown="changeSelect" v-else>
  </div>
  <v-btn @click="sendMessage">发送</v-btn> -->
  <div class="editPeopleList" v-show="select > -1">
    <div class="item" v-for="(people, iId) in dataArray" :class="{ 'select': select == iId }" @click="pushPeopleTag(iId)">
      {{ people.name }}
    </div>
  </div>
  <v-text-field class="input" :label="getLabel()" @input="input" @keyup.enter="enter" @keydown="key" v-model="messageArray[messageArrayIndex].text">
  </v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import SelectTalker from './SelectTalker.vue';
import { useTalkConfig } from '../store/people.js'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select, messageArrayIndex } = storeToRefs(talkConfig)

const messageEditorIndex = ref(0)

const getLabel = () => {
  if (messageEditorIndex.value) {
    return '然后...TA 会说什么呢...'
  } else {
    return `你希望 ${dataArray.value[talkerId.value].name} 说...`
  }
}

// 检测用户输入 @ 后启动角色选择列表
const input = (event) => {
  if (event.data == '@') select.value = 1
}
// 启动角色选择列表后，用来移动光标
const key = (event) => {
  const isUp = event.key == 'ArrowUp'
  const isDown = event.key == 'ArrowDown'
  const indexBigerThanZero = select.value > 0
  const indexSmallerThanLength = select.value < dataArray.value.length - 1
  const showSwlectView = select.value > -1

  if (isUp && indexBigerThanZero && showSwlectView) {
    select.value--
  } else if (isDown && indexSmallerThanLength && showSwlectView) {
    select.value++
  }
}

const enter = () => {
  if (selectedValue === 0) {
    selectedValue = -1;
  } else if (selectedValue > -1) {
    pushPeopleTag(selectedValue);
  }
};

// 当前只做了顺序编写的逻辑，只是操作后面的符号，已经固定的暂时不做处理
// 如果当前编辑框中只有一个 @ 符号，那么直接删掉这个成员
// TODO 通过 keydown 函数判断用户所在的光标位置
// event.target.selectionStart
const pushPeopleTag = (id) => {
  if (''.matchAll(/\@/).length > 1) {
    console.log('@ 数量大于1,暂时选用末尾的 @ 符号进行替换');
  }
  const lastMessage = messageArray.value[messageArray.value.length - 1];
  if (lastMessage.text === "@") {
    messageArray.value.pop();
  } else if (lastMessage.text.endsWith('@')) {
    lastMessage.text = lastMessage.text.slice(0, -1);
  }
  // 该方法未来可以用到从某个元素中间插入两个元素的情况
  messageArray.value = messageArray.value.concat([{ type: 'tag', tag: id }, { text: '' }])
  // 优化可读性导致的代码，实际上本来应该在函数运行后面执行的
  select.value = -1
};

</script>

<style scoped lang="scss">
.editPeopleList {
  background: darkblue;

  .item {
    font-size: 1.2rem;
    padding: 0.5rem;

    &.select {
      background: darkcyan;
    }

    &:hover {
      background: aqua;
    }
  }
}
</style>
