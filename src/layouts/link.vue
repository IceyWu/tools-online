<template>
  <main h-full font-sans text="center gray-700 dark:gray-200">
    <LinkHeader />
    <router-view class="content" />
  </main>
</template>

<style>
.content {
  height: calc(100% - 4.5rem);
}
</style>
