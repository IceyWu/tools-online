<script setup lang="ts">
const name = ref('')

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
const btnList = [
  {
    name: 'Go Color',
    path: '/color',
  },
  {
    name: 'Go Links',
    path: '/links',
  },
]
const goDe = (data: any) => {
  router.push(data.path)
}
</script>

<template>
  <div>
    <!-- <div i-carbon-campsite text-4xl inline-block /> -->
    <h1>Hi! guy! 🐱‍🐉</h1>
    <p>
      <a rel="noreferrer" href="https://github.com/IceyWu" target="_blank">
        IceyWu's tools
      </a>
    </p>
    <!-- <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div> -->
    <div>
      <button
        v-for="(item, index) in btnList" :key="index"
        class="m-3 text-sm btn"
        @click="goDe(item)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
