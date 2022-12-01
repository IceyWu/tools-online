<script setup lang="ts">
import ItemBase from './components/item/Base.vue'
const inputEl = $ref<HTMLInputElement>()
const inputValue = ref('')
const copyValue = ref('')
const pingProcess = ref(false)
// 联想词
const suggestWords = ref('guessing...')
// 是否正在联想
const getSuggestLoading = ref(false)

const userConfigLoading = ref(false)

const isSearching = ref(false)
const searchResult = ref([
  'asas',
  'asas',
  'asas',
])
const inputChange = (e: any) => {
  if (e.keyCode === 229 && e.key === 'Process') {
    // console.log('*** 输入法切换')
    pingProcess.value = true // 拼音输入法
  }
  // && isNaN(parseInt(e.key))  输入的非数字
  // e.keyCode !== 8  --- 删除
  // e.keyCode !== 229  输入法会一次出发两次 先触发229  后触发输入的键位 比如a -- 65
  // this.pingProcess 前面先监听了输入法后面再次判断这个值表示正在输入
  // isNaN(parseInt(e.key)) 这个是键位判断 是选择的数子键位  e.keyCode !== 32 空格
  if (e.keyCode !== 8 && e.keyCode !== 229 && e.keyCode !== 32 && pingProcess.value && isNaN(parseInt(e.key))) {
    console.log('正在输入.......', e.key)
    copyValue.value += `'${e.key}`
    pingProcess.value = false
  }
  else {
    if (e.keyCode !== 229) {
      pingProcess.value = false
      console.log('确认输入：')
    }
  }
}
// 获取联想词
const getSuggest = async () => {
  suggestWords.value = 'guessing...'
  getSuggestLoading.value = true
  isSearching.value = true
  setTimeout(() => {
    // suggestWords.value = '联想词'
    suggestWords.value = `${inputValue.value}as`
    getSuggestLoading.value = false
    isSearching.value = false
  }, 800)
}

// 监听inputValue
watch(inputValue, (val) => {
  copyValue.value = val
  getSuggest()
})

function clear() {
  inputValue.value = ''
  copyValue.value = ''
  suggestWords.value = 'guessing...'
  getSuggestLoading.value = false
  isSearching.value = false
}
</script>

<template>
  <div relative border="~ rounded base" shadow font-200 text-2xl>
    <div v-if="userConfigLoading" p="x6 y4" gap2 row items-center animate-pulse>
      <div i-carbon-circle-dash w-7 h-7 animate-spin />
      <div op50>
        loading config...
      </div>
    </div>
    <input
      v-else
      ref="inputEl"
      v-model="inputValue"

      aria-label="Type to explore"
      placeholder="Type to explore..."
      type="text"
      autocomplete="off" w="full"
      p="x6 y4"
      bg-transparent border-none
      class="!outline-none"
    >
    <button
      v-if="inputValue"
      absolute flex right-2 w-10 top-2 bottom-2 text-xl op30 hover:op90
      aria-label="Clear search"
      @click="clear()"
    >
      <span i-carbon-close ma block aria-hidden="true" />
    </button>
  </div>
  <div v-if="searchResult.length || isSearching" border="l b r base" mx2 of-auto>
    <template v-if="isSearching">
      <ItemBase>
        <template #badge>
          <div i-carbon-circle-dash w-5 h-5 animate-spin ma />
        </template>
        <template #title>
          Searching...
        </template>
      </ItemBase>
      <div divider />
    </template>
    <template v-for="(i, idx) of searchResult" :key="idx">
      <!-- <ResultItem
        :item="i"
        :active="selectIndex === idx"
        @click="selectItem(i)"
      /> -->
      <div divider />
    </template>
  </div>
  <!-- <Intro v-else-if="!input" /> -->
  <div v-else p10>
    <div op40 italic mb5>
      No result found
    </div>
    <div row justify-center>
      <button btn @click="clear()">
        Clear search
      </button>
    </div>
  </div>
</template>

