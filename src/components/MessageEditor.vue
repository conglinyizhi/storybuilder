<template>
  <SelectTalker/>
  <div class="editInput" v-for="(message, iId) in messageArray" :key="message">
    <span :data-id="iId" class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
    <input :data-id="iId" class="edit" type="text" v-model="message.text" @keyup.enter="inputEnter" @input="inputText"
      @keydown="changeSelect" v-else>
  </div>
  <v-btn @click="sendMessage">发送</v-btn>
  <div class="editPeopleList" v-show="select > -1">
    <div class="item" v-for="(people, iId) in dataArray" :class="{ 'select': select == iId }">{{ people.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectTalker from './SelectTalker.vue';
import { useTalkConfig } from '../store/people.js'
import { storeToRefs } from 'pinia'

const talkConfig = useTalkConfig()

const { messageArray, dataArray, talkerId, select } = storeToRefs(talkConfig)
const emit = defineEmits(['sendMessage']);

// 将数据传递给父组件
const sendMessage = () => emit('sendMessage', messageArray.value);

// 检测用户输入 @ 后启动角色选择列表
const inputText = (event) => {
  if (event.data == '@') {
    select.value = 0
  }
}
// 启动角色选择列表后，用来移动光标
const changeSelect = (event) => {
  console.log(event)
  const showSwlectView = select.value > -1
  if (event.key == 'ArrowUp' && select.value > 0 && showSwlectView) {
    select.value--
  }
  if (event.key == 'ArrowDown' && select.value < dataArray.value.length - 1 && showSwlectView) {
    select.value++
  }
}

// 按下回车后，如果光标有选择，那么插入一个角色的 Tag，否则忽略
const inputEnter = () => {
  if (select.value > -1) {
    pushPeopleTag(select.value)
    select.value = -1
  }
};

// 当前只做了顺序编写的逻辑，只是操作后面的符号，已经固定的暂时不做处理
// 如果当前编辑框中只有一个 @ 符号，那么直接删掉这个成员
// TODO 通过 keydown 函数判断用户所在的光标位置
// event.target.selectionStart
const pushPeopleTag = (id) => {
  const lastMessage = messageArray.value[messageArray.value.length - 1];
  if (lastMessage.text === "@") {
    messageArray.value.pop();
  } else if (lastMessage.text.endsWith('@')) {
    lastMessage.text = lastMessage.text.slice(0, -1);
  }
  // 该方法未来可以用到从某个元素中间插入两个元素的情况
  messageArray.value = messageArray.value.concat([{ type: 'tag', tag: id }, { text: '' }])
};

</script>

<style scoped lang="scss">
.editPeopleList {
  background: darkblue;

  .item {
    font-size: 1.4rem;
    padding: 1rem;

    &.select,
    &:hover {
      background: darkcyan;
    }
  }
}
</style>
