<script setup>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles
import linkJson from './links.json'

const code = ref('')
// code.value =
// code的值为linkJson的linkList
code.value = JSON.stringify(linkJson.linkList, null, 2)

const highlighter = (code) => {
  return highlight(code, languages.js) // languages.<insert language> to return html with markup
}

// 导出json
const exportJson = () => {
  const blob = new Blob([code.value], { type: 'text/plain;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'links.json'
  a.click()
}
</script>

<template>
  <div flex >
    <div class="btn-lis flex-1 fcc">
      <div class="btn" @click="exportJson">
        导出Json
      </div>
    </div>
    <PrismEditor flex-1 v-model="code" mode="code" class="my-editor" :highlight="highlighter" line-numbers />
  </div>
</template>

<style>
  /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>

<route lang="yaml">
meta:
  layout: link
</route>

