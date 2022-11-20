<script setup lang="ts">
// const typedRef = useTyped(['is not found!'])

const router = useRouter()

const back = () => router.push('/')
</script>

<template>
  <div class="flex flex-wrap h-screen text-center justify-around items-center">
    <div class="font-blod w-75 flex-1">
      <div class="text-7xl mb-5">
        404
      </div>
      <div ref="typedRef" class="text-3xl h-10">
        The Page
      </div>
      <button
        active="scale-90 transform"
        class="btn"
        @click="back"
      >
        👉 Go Home
      </button>
    </div>

    <img src="/notFound/1.svg" class="w-175 h-auto my-[5px] max-w-full max-h-full" alt="page not found">
  </div>
</template>

<route lang="yaml">
meta:
  layout: notFound
</route>
