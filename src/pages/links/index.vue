<script setup lang="ts">
import { useFavicon, useImage, useTitle } from '@vueuse/core'
import CollapseList from './components/CollapseList.vue'
import { useLinksStore } from '~/store/links'
interface LinkItem {
  id: number
  name: string
  url: string
  cover: string
  desc: string
  isCollect?: boolean
  tags?: string[]
}
const title = useTitle()
const icon = useFavicon()
const linksStore = useLinksStore()
const linkData = computed(() => linksStore.linkData)
const jump = (data: LinkItem) => {
  const { url } = data
  window.open(url)
}
const collect = (data: LinkItem) => {
  const { id } = data
  linksStore.saveCollectLink(id)
}
const selectItem = ref({} as LinkItem)
let coverIsLoading: unknown
let coverIsError: unknown
const imageOptions = ref({ src: '' })
const clickItem = (data: LinkItem) => {
  const { name = '', cover = '' } = data
  imageOptions.value = { src: cover }
  const { isLoading, error } = useImage(imageOptions, { delay: 1000 })
  coverIsLoading = isLoading
  coverIsError = error
  title.value = `Links | ${name}`
  selectItem.value = data
}

// switch List
const switchList = ref([
  {
    id: 1,
    name: '卡片',
  },
  {
    id: 2,
    name: '列表',
  },
])
const selectSwitch = ref(switchList.value[0].id)

const goDetail = (data: LinkItem) => {
  const { url } = data
  if (url)
    window.open(url)
}

onMounted(() => {
  title.value = 'Links'
  icon.value = '/favicon.ico'
  selectItem.value = linkData.value[0]
  imageOptions.value = { src: selectItem.value?.cover || '' }
  const { isLoading, error } = useImage(imageOptions, { delay: 1000 })
  coverIsLoading = isLoading
  coverIsError = error
})
</script>

<template>
  <div w-full>
    <div v-if="linkData.length === 0" w-full fcc>
      <EmptyData />
    </div>
    <div v-else w-full fcc h-full>
      <div flex-1 f-c-c h-full overflow="auto" scrollbar="~ dark:track-color-gray-800 dark:thumb-color-stone-500 rounded w-8px">
        <div>
          <div v-if="coverIsLoading" class="w-150 h-80 fcc animate-pulse bg-gray-500/5 p-2">
            Loading...
          </div>
          <div v-else-if="coverIsError">
            Failed
          </div>
          <img v-else :src="imageOptions.src" class="w-150 h-80 object-cover rounded-lg">
        </div>
        <span my-6 text-4xl>
          {{ selectItem.name || '' }}
        </span>
        <span text-2xl>
          {{ selectItem.desc || '' }}
        </span>
        <button
          mt-6
          active="scale-90 transform"
          class="btn"
          @click="goDetail(selectItem)"
        >
          👉 Go De
        </button>
        <!-- {{ selectItem }} -->
      </div>
      <div flex-1 relative h-full>
        <header mb-4 w-full fsc>
          <!-- switch选择器 -->
          <div class="bg-[#f2f3f5] dark:bg-[#2e2e30]" rounded-2xl px-4 py-1 fbc>
            <div v-for="item in switchList" :key="item.id" :class="selectSwitch === item.id ? 'bg-[#fff] !dark:bg-[#484849]' : ''" class="cursor-pointer hover:bg-[#c9cdd4] px-3 py-0.5 rounded-2xl dark:bg-transparent dark:hover:bg-[#484849]" not-last:mr-3 @click="(selectSwitch = item.id)">
              {{ item.name }}
            </div>
          </div>
        </header>
        <div v-if="(selectSwitch === 1)" scrollbar="~ dark:track-color-gray-800 dark:thumb-color-stone-500 rounded w-8px" class="card-list" flex flex-wrap items-center h-full>
          <div
            v-for="(item) in linkData"
            :key="item.id"
            class="shadow rounded-xl overflow-hidden cursor-pointer h-60 w-50 card-box relative flex justify-center items-center mx-4 my-3"
            @click="clickItem(item)"
          >
            <div class="absolute h-full w-full bg-cover bg z-0 " :style="{ backgroundImage: `url(${item.cover})` }" />
            <div text-4xl absolute z-10 color-white px-1 f-c-c>
              <h1>
                {{ item.name }}
              </h1>
              <h3 v-motion-roll-visible-right :delay="15" class="desc" text-xl mt-3 color-stone-100>
                {{ item.desc }}
              </h3>
              <div v-motion-slide-visible-once-top class="text-xl de-btn w-fit mt-1.5 btn" @click.stop="jump(item)">
                ✈ Go De
              </div>
            </div>
            <div class="btn-group absolute z-10 top-2 left-2">
              <i
                :class="item.isCollect ? 'i-carbon-favorite-filled text-red-400 hover:opacity-100 hover:text-red-400' : 'i-carbon-favorite'"
                class="text-[1.5em] text-white"
                opacity-100
                icon-btn
                @click.stop="collect(item)"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <CollapseList @click-collapse-item="clickItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '~/assets/font/font.css';

.card-box {
  font-family: smiley-sans;

  &:not(:last-child) {
    // margin-right: 2rem;
  }
  .desc,.de-btn{
    transform: 0.5s;
    display: none;
  }

  &:hover .bg {
    transition: 0.5s;
    transform: scale(1.1);
    filter: blur(2px);
  }

  &:hover .desc,
  &:hover .de-btn
  {
    display: block;
  }
}
.card-list{
  overflow: auto;
  // height: 100%;
  box-sizing: border-box;
  // padding-top: 2rem;
  height: calc(100% - 6rem);
}
</style>

<route lang="yaml">
meta:
  layout: link
</route>
