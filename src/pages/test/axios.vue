<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard, usePermission } from '@vueuse/core'

const input = ref('')

const { text, isSupported, copy, copied } = useClipboard({ input })
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')
</script>

<template>
  <div>
    asas
    text: {{ text }}
    isSupported: {{ isSupported }}
    permissionRead: {{ permissionRead }}

    copied: {{ copied }}
    <input v-model="input" type="text">
  </div>
  <div v-if="isSupported">
    <div>
      Clipboard Permission: read <b>{{ permissionRead }}</b> | write
      <b>{{ permissionWrite }}</b>
    </div>
    <p>
      Current copied: <code>{{ text || 'none' }}</code>
    </p>
    <input v-model="input" type="text">
    <button @click="copy()">
      Copy
    </button>
  </div>

  <p v-else>
    Your browser does not support Clipboard API
  </p>
</template>
