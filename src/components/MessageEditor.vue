<template>
  <div v-if="!changeTalker">
    当前发言角色：{{ dataArray[talkerId].name }} <v-btn @click="changeTalker = true">更换发言角色</v-btn>
  </div>
  <div v-else>
    请选择发言对象：<v-btn v-for="(talker, index) in dataArray" @click="changeTalkerOnClick(index)">{{ talker.name }} - {{ index }}</v-btn>
    <div>或者，尝试 <v-btn @click="newPeopleDialogShow = true">添加一个角色</v-btn></div>
    <div v-show="newPeopleDialogShow">
      <v-text-field variant="filled" label="角色名称" v-model="newPeopleInputText"></v-text-field>
      <v-btn color="primary" @click="addPeople">确认添加角色</v-btn>
    </div>
  </div>
  <div class="editInput" v-for="(message, index) in messageArray" :key="message">
    <span :data-id="index" class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
    <input :data-id="index" class="edit" type="text" v-model="message.text" @keyup.enter="inputEnter" @input="inputText"
      @keydown="changeSelect" v-else>
  </div>
  <v-btn @click="sendMessage">发送</v-btn>
  <div class="editPeopleList" v-show="select > -1">
    <div class="item" v-for="(people, index) in dataArray" :class="{ 'select': select == index }">{{ people.name }}
    </div>
  </div>
  <div style="margin-top: 10rem;">
    内容预览
    <span v-show="!changeTalker">{{ dataArray[talkerId].name }}：</span>
    <div class="editInput" v-for="message in messageArray" :key="message">
      <span class="tag" v-if="message.type == 'tag'">{{ dataArray[message.tag].name }}</span>
      <span class="edit" v-else>{{ message.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['sendMessage']);

// 定义当前对话的角色id
const talkerId = ref(0);
const changeTalker = ref(true);
const messageArray = ref([{ text: '' }]);
// const data = reactive({ { "conglinyizhi": "小丛林", "redrain": "红雨", "dreampowery": "梦境引擎" } });
const dataArray = ref([
  '小丛林',
  '红色雨夜',
  '梦境引擎',
  '花语之鹿',
  '纳西妲',
  '提纳里',
  '派蒙'
].map(name => {
  return {
    name,
    group: 'default',
    profile: ''
  }
}))

const newPeopleDialogShow = ref(false)
const newPeopleInputText = ref('')
const addPeople = () => {
  if(! newPeopleInputText.value.trim()){
    alert('请给阁下的角色一个名字，好吗')
  }else{
    dataArray.value.push({
      name: newPeopleInputText.value,
      group: 'default',
      profile: ''
    })
    newPeopleDialogShow.value = false
    newPeopleInputText.value = ''
  }
}
const changeTalkerOnClick = (i) => {
  talkerId.value = i
  changeTalker.value = false
}
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
}
</style>
