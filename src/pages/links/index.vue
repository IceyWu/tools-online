<script setup lang="ts">
import linkJson from './links.json'
interface LinkItem {
  id: number
  name: string
  url: string
  cover: string
  desc: string
  isCollect?: boolean
}
const colectList: any = ref([1])
const linkList = computed(() => {
  return linkJson.linkList.map((item: LinkItem) => {
    if (colectList.value.includes(item.id))
      item.isCollect = true
    else
      item.isCollect = false
    return item
  })
})
const jump = (data: LinkItem) => {
  const { url } = data
  window.open(url)
}
const collect = (data: LinkItem) => {
  const { id } = data
  if (colectList.value.includes(id))
    colectList.value.splice(colectList.value.indexOf(id), 1)
  else
    colectList.value.push(id)
}
</script>

<template>
  <div w-full flex justify="center" items-center>
    <div
      v-for="(item) in linkList" :key="item.id"
      class="shadow rounded-xl overflow-hidden cursor-pointer bg-red-400 h-60 w-50 card-box relative flex justify-center items-center"
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
  </div>
</template>

<style lang="less">
@import '~/assets/font/font.css';

.card-box {
  font-family: smiley-sans;

  &:not(:last-child) {
    margin-right: 2rem;
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
