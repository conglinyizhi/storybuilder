<template>
  <div>
    <v-chip prepend-icon="" v-text="'ChangeName'" />
  </div>
  <div class="editInput" v-for="(message, index) in messageArray" :key="message">
    <span :data-id="index" class="tag" v-if="message.type == 'tag'" v-text="dataArray[message.tag]"></span>
    <input :data-id="index" class="edit" type="text" v-model="message.text" @keyup.enter="inputEnter" @input="inputText"
      @keydown="changeSelect" v-else>
  </div>
  <button @click="sendMessage">发送</button>
  <div class="editPeopleList" v-show="select > -1">
    <div class="item" v-for="(people, index) in dataArray" :class="{ 'select': select == index }" v-text="people"></div>
  </div>
  <div style="margin-top: 10rem;">
    内容预览
    <div class="editInput" v-for="message in messageArray" :key="message">
      <span class="tag" v-if="message.type == 'tag'" v-text="dataArray[message.tag]"></span>
      <span class="edit" v-text="message.text" v-else></span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['sendMessage']);

const messageArray = ref([{ text: '' }]);
// const data = reactive({ { "conglinyizhi": "小丛林", "redrain": "红雨", "dreampowery": "梦境引擎" } });
const dataArray = [
  '小丛林',
  '红雨',
  '梦境引擎'
]

const select = ref(-1)
// 将数据传递给父组件
const sendMessage = () => {
  emit('sendMessage', messageArray.value);
};

// 检测用户输入 @ 后启动角色选择列表
const inputText = (event) => {
  if (event.data == '@') {
    select.value = 0
  }
}
// 启动角色选择列表后，用来移动光标
const changeSelect = (event) => {
  console.log(event)
  if (event.key == 'ArrowUp' && select.value > 0) {
    select.value--
  }
  if (event.key == 'ArrowDown' && select.value < dataArray.length - 1) {
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
const pushPeopleTag = (id) => {
  if (messageArray.value[messageArray.value.length - 1].text === "@") {
    messageArray.value.pop();
  } else {
    // 如果文本末尾包括了一个 @ 符号，那么直接删掉末尾的 @ 符号
    if (messageArray.value[messageArray.value.length - 1].text.charAt(messageArray.value[messageArray.value.length - 1].text.length - 1) == '@') {
      messageArray.value[messageArray.value.length - 1].text = messageArray.value[messageArray.value.length - 1].text.slice(0, -1);
    }
  }
  messageArray.value.push({ type: 'tag', tag: id });
  messageArray.value.push({ text: '' });
  // 将用户的焦点通过原生 dom 方法移动，这种方式不可靠，暂时不使用
  // setTimeout(() => {
  //   document.querySelector(`input[data-id=${messageArray.value.length - 1}]`).focus()
  // }, 500);
  // messageArray.value.length - 1
};

</script>

<style scoped lang="scss">
.editInput {
  display: inline-block;

  .tag {
    padding: 5px;
    background: darkkhaki;
    color: black;
    border-radius: 15px;
  }

  .edit {
    border: 1px solid white;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    min-width: 3rem;
  }
}

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
}</style>
