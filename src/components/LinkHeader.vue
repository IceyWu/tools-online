<script lang="ts" setup>
const routes = reactive([
  // { name: '导入', path: '/posts' },
  { icon: 'i-carbon-link', path: '/links', title: '链接' },
  { icon: 'i-carbon-delivery-parcel', path: '/links/code', title: '导入' },
  // { icon: 'i-carbon-bookmark', path: '/bookmark' },
  // { icon: 'i-carbon-notebook', path: '/notes' },
])
</script>

<template>
  <header
    fixed
    z-9999
    top-0
    inset-x-0
    trans
    backdrop-blur
    b="b-1 dashed gray-300 dark:b-gray-500"
  >
    <a to="/" title="Home">
      <img
        v-show="isDark"
        h-6
        fixed
        left-8
        top-6
        src="../assets/img/logo.png"
        alt="logo"
      >
      <img h-6 fixed left-8 top-6 src="../assets/img/logo.png" alt="logo">
    </a>
    <nav px-8 w-full grid="~ cols-[auto_max-content]" box-border class="h-18">
      <!-- 垫片 -->
      <div class="spacer" />
      <div grid gap-5 auto-flow-col items-center>
        <a
          v-for="route in routes"
          :key="route.path"
          :href="route.path"
          :title="
            route.title
              ? route.title
              : ''
          "
        >
          <div class="text-[1.5em]" icon-btn :class="route.icon" />
          <!-- <div linkOrg>
            {{ route.name }}
          </div> -->
        </a>
        <button class="text-[1.5em] pb-1.5" icon-btn @click="toggleDark()">
          <div dark:i-carbon-moon i-carbon-sun />
        </button>
      </div>
    </nav>
  </header>
  <!-- For header fixed -->
  <div class="h-18" />
</template>
