<template>
	<div class="inputBoxFather">
		<v-container>
			<div>
				<div class="editPeopleList" v-show="select > -1">
					<div class="item" v-for="(people, iId) in dataArray" :class="{ 'select': select == iId }"
						@click="pushPeopleTag(iId)">
						{{ people.name }}
					</div>
				</div>
				<v-slide-y-reverse-transition>
					<div class="SettingLayer" name="弹出层" v-show="changeTalker">
						<div name="对话设置">
							<v-switch v-model="isTalkModeSwitch" label="对话模式（开启后在每次发送消息后都会切换为上一个角色）" color="primary"></v-switch>
						</div>
						<div name="更换对话内容角色区域" class="editor">
							<v-chip-group active-class="primary-text" color="primary" column v-model="chipSelectalkerId" :readonly="true">
								<v-chip prepend-icon="mdi-account-circle" v-for="(p, i) in dataArray.slice(1)" @click="setTalkerId(i + 1)"
									:value="i">
									{{ p.name }}
								</v-chip>
								<v-chip prepend-icon="mdi-account-plus" @click="addPeople">
									添加角色 >
								</v-chip>
							</v-chip-group>
						</div>
					</div>
				</v-slide-y-reverse-transition>
				<message-show />
				<v-row class="inputBoxMain">
					<v-col cols="auto">
						<v-chip class="my-4" prepend-icon="mdi-account-circle" :append-icon="changeTalker ? 'mdi-close' : 'mdi-menu'"
							@click="changeTalker = !changeTalker">
							{{ dataArray[talkerId].name }}
						</v-chip>
					</v-col>
					<v-col>
						<v-text-field class="input" :label="getLabel()" @input="input" @keyup.enter="enter" @keydown="key"
							v-model="messageArray[messageArrayIndex].text">
						</v-text-field>
					</v-col>
					<!-- <v-col></v-col>
					<v-col></v-col> -->
				</v-row>
			</div>
		</v-container>
	</div>
	<div name="提示层" class="chipGroup">
		<v-chip prepend-icon="mdi-pencil" v-if="!isTalkModeSwitch">正常模式</v-chip>
		<v-chip prepend-icon="mdi-message-text" color="green" text-color="white" v-show="isTalkModeSwitch">对话模式</v-chip>
		<v-chip prepend-icon="mdi-message-text-fast" color="green" text-color="white" v-show="isTalkModeSwitch">对话等待切换：
			{{ messageArrayIndex < 1 ? '...' : dataArray[talkModeOldSelect].name }} </v-chip>
	</div>
</template>

<script setup>
import { VChipGroup, VChip, VCol, VSlideYReverseTransition,VContainer } from 'vuetify/lib/components/index.mjs';
import MessageShow from './MessageShow.vue';
import { ref } from 'vue';

// import store
import { useTalkConfig } from '../store/people';
import { storeToRefs } from 'pinia';
const talkConfig = useTalkConfig();
const {
	messageArray, messageArrayIndex, messageArrayList, dataArray, talkerId, select
} = storeToRefs(talkConfig);

const chipSelectalkerId = ref(0)
const changeTalker = ref(false)

const isTalkModeSwitch = ref(false)
const talkModeOldSelect = ref(0)

const messageEditorIndex = ref(0)
const setTalkerId = (i) => {
	talkerId.value = i;
	changeTalker.value = false;
}

const addPeople = () => {
	const nameInput = { value: prompt('请输入角色名称') };
	// const nameInput = ref('');
	if (!nameInput.value.trim()) {
		alert('请给阁下的角色一个名字，好吗')
	} else {
		dataArray.value.push({ name: nameInput.value, group: 'default', profile: '' })
		nameInput.value = ''
		setTalkerId(dataArray.value.length - 1)
	}
}

/**
 * 根据当前的消息编辑器索引获取标签。
 *
 * @return {string} 要显示的标签。
 */
const getLabel = () => {
	if (messageEditorIndex.value) {
		return '然后...TA 会说什么呢...'
	} else {
		return `你希望 ${dataArray.value[talkerId.value].name} 说...`
	}
}

// 检测用户输入 @ 后启动角色选择列表
const input = (event) => {
	if (event.data == '@') select.value = 0
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
	const selectedTalkerId = select.value;
	if (selectedTalkerId === 0) {
		select.value = -1;
	} else if (selectedTalkerId > -1) {
		pushPeopleTag(selectedTalkerId);
	} else if (messageArray.value[0].text || messageArray.value[0].type === 'tag') {
		messageArrayList.value.push({
			say: talkerId.value,
			msg: messageArray.value,
		});
		messageArrayIndex.value = 0;
		messageArray.value = [{ type: 'text', text: '' }];
		if (isTalkModeSwitch.value) {
			if (talkModeOldSelect.value === 0 || talkerId.value === talkModeOldSelect.value) {
				talkModeOldSelect.value = talkerId.value;
			} else {
				const temp = talkerId.value;
				talkerId.value = talkModeOldSelect.value;
				talkModeOldSelect.value = temp;
			}
		}
	}
};

/**
 * 将人员标签推送到`messageArray`。
 *
 * @param {number} id - 要推送的标签的ID。
 */
const pushPeopleTag = (id) => {
	if (''.matchAll(/\@/g).length > 1) {
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
	messageArrayIndex.value = messageArray.value.length - 1
};
</script>

<style lang="scss">
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

.inputBoxFather {
	// 绝对定位
	position: absolute;
	bottom: 0;
	left: 1rem;
	right: 1rem;
}

.SettingLayer {
	background-color: black;
	padding: 1rem;
	max-height: 20rem;
	overflow-y: auto;
}

.chipGroup>* {
	margin: 0.25rem;
}
</style>
