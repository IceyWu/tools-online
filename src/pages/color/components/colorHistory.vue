<script setup lang="ts">
const colorList = ref([
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#c0c0c0',
  '#808080',
  '#800000',
  '#808000',
  '#008000',
  '#800080',
  '#008080',
  '#000080',

])
</script>

<template>
  <div class="flex flex-wrap items-center px-2">
    <div v-for="(item, index) in colorList" :key="index" class="flex flex-col items-center justify-center shadow p-2 :not-first:ml-4">
      <div w-17 h-9 mt1 border="~ base" shadow="" :style="{ background: item }" />
      <div font-mono text-sm op30>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
