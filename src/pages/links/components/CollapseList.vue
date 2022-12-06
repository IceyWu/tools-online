<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLinksStore } from '~/store/links'
const emit = defineEmits(['clickCollapseItem'])
const linksStore = useLinksStore()
const { linksList } = storeToRefs(linksStore)
const dataList = computed(() => {
  const list = linksList.value
  const result: any[] = []
  list.forEach((item: any) => {
    const { tags } = item
    if (!tags || tags.length === 0) {
      const index = result.findIndex((i: any) => i.name === '未分类')
      if (index === -1) {
        result.push({
          name: '未分类',
          isShowSub: false,
          emoji: '🌈',
          children: [
            {
              ...item,
            },
          ],
        })
      }
      else {
        result[index].children.push({
          ...item,
        })
      }
      return
    }
    tags.forEach((tag: any) => {
      const index = result.findIndex((i: any) => i.name === tag)
      if (index === -1) {
        result.push({
          name: tag,
          isShowSub: false,
          children: [
            {
              ...item,
            },
          ],
        })
      }
      else {
        result[index].children.push({
          ...item,
        })
      }
    })
  })
  return result
})
// const tagList = ref([])
// tagList 为any类型
const tagList: any = ref([])
onMounted(() => {
  tagList.value = [...dataList.value]
})
// 选中的tag
const selectedTag = ref('')
const clickItem = (item: any) => {
  selectedTag.value = item.name
  emit('clickCollapseItem', item)
  // if (item.url)
  //   window.open(item.url, '_blank')
}
</script>

<template>
  <div class="collapseList" text-xl w-full>
    <div v-for="item in tagList" :key="item.name" class="not-last:mb-1">
      <div class="collapseItem " @click="item.isShowSub = !item.isShowSub ">
        <i icon-btn :class="item.isShowSub ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'" />
        <span ml-1> {{ item.emoji || '🎯' }}</span>
        <span ml-1> {{ item.name }}</span>
      </div>
      <div v-if="item.isShowSub" v-motion-slide-bottom text-lg mt-1 :delay="15">
        <div v-for="child in item.children" :key="child.name" class="collapseSubItem" @click="clickItem(child)">
          <span ml-1> {{ child.emoji || '🚩' }}</span>
          <span ml-1> {{ child.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.collapseList {
  font-family: smiley-sans;
}
</style>
