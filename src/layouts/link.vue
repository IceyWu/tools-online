<template>
  <main h-full font-sans text="center gray-700 dark:gray-200">
    <LinkHeader />
    <router-view class="content px-2 py-4" />
  </main>
</template>

<style>
.content {
  height: calc(100% - 4.5rem);
}
</style>
