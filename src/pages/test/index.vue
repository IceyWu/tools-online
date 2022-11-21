<script setup lang="ts">
const inputValue = ref('')
// 联想词
const suggestWords = ref('')
// 监听inputValue
watch(inputValue, (val) => {
  const replaceStr = '\u2003'
  suggestWords.value = replaceStr.repeat(val.length)
  suggestWords.value += '提升'
  console.log(suggestWords.value)
})
</script>

<template>
  <div
    class="!w-full h-screen flex flex-col items-center justify-center"
  >
    <div relative border="~ rounded base" class="w-[30%] min-w-120 h-15 box-border" shadow font-200 text-2xl>
      <div v-if="suggestWords" color-gray bg-transparent w-full h-full absolute z-9 flex items-center justify-start px-6 pt-2 box-border>
        {{ suggestWords }}
      </div>
      <input v-model="inputValue" z-10 aria-label="What color it is?" placeholder="What color it is?..." type="text" autocomplete="off" w="full" p="x6 y4" bg-transparent border-none="" class="!outline-none absolute left-0">
    </div>
  </div>
</template>

