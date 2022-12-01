<script setup lang="ts">
const props = defineProps<{
  colorList: string[]
}>()
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
