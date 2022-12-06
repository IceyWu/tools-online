<script setup lang="ts">
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
</script>

<template>
  <div w-full flex flex-wrap content-start>
    <div v-if="linkData.length === 0" w-full fcc>
      <EmptyData />
    </div>
    <div
      v-for="(item) in linkData"
      v-else :key="item.id"
      class="shadow rounded-xl overflow-hidden cursor-pointer h-60 w-50 card-box relative flex justify-center items-center mx-4 my-3"
      @click="jump(item)"
    >
      <div class="absolute h-full w-full bg-cover bg z-0 " :style="{ backgroundImage: `url(${item.cover})` }" />
      <div text-4xl absolute z-10 color-white px-1>
        <h1>
          {{ item.name }}
        </h1>
        <h3 v-motion-roll-visible-right :delay="15" class="desc" text-xl mt-3 color-stone-100>
          {{ item.desc }}
        </h3>
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
    <div flex-1>
      <CollapseList />
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
  .desc{
    transform: 0.5s;
    display: none;
  }

  &:hover .bg {
    transition: 0.5s;
    transform: scale(1.1);
    filter: blur(2px);
  }

  &:hover .desc{
    display: block;
  }
}
</style>

<route lang="yaml">
meta:
  layout: link
</route>
