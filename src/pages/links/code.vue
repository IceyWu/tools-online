<script setup lang="ts">
import { POSITION, TYPE, useToast } from 'vue-toastification'
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles
import { storeToRefs } from 'pinia'
import { useLinksStore } from '~/store/links'
const linksStore = useLinksStore()
const { linksList } = storeToRefs(linksStore)
const toast = useToast()
// 模板
const template = `[
    {
      "id":1,
      "name": "网站名称",
      "desc": "网站描述",
      "url": "https://www.baidu.com",
      "cover":"https://www.baidu.com/img/bd_logo1.png",
      "tags":[
        "标签"]
    }
]
`
const code = computed(() => JSON.stringify(linksList.value, null, 2) === '[]' ? template : JSON.stringify(linksList.value, null, 2))
const router = useRouter()
const codeValue = ref(code.value)
// 监听code变化
watch(code, (val) => {
  codeValue.value = val
})

const highlighter = (code: any) => {
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

// 导入json
const jsonFileName = ref('')
const handleReadFile = (file: any) => {
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = (thisFile) => {
    if (thisFile.target && thisFile.target.result) {
      const result = JSON.parse(thisFile.target.result.toString())
      result.forEach((item: any) => {
        if (!item.id)
          // item.id = new Date().getTime()
          item.id = new Date().getTime()
      })
      // code.value = JSON.stringify(result, null, 2)
      // 保存到store
      linksStore.saveLinks(result)
      toast('导入成功!', {
        type: TYPE.SUCCESS,
        position: POSITION.TOP_RIGHT,
      })
      // setTimeout(() => {
      router.replace('/links')
      // }, 1000)
    }
  }
}
const importJson = (file: any) => {
  const dom = document.getElementById('jsonFile') as HTMLInputElement
  if (dom && dom.files) {
    const file = dom.files[0]
    const { name } = file
    jsonFileName.value = name
    handleReadFile(file)
  }
}
const clickjsonFile = () => {
  const dom = document.getElementById('jsonFile') as HTMLInputElement
  if (dom)
    dom.click()
}

const goBack = () => {
  router.push('/links')
}
// 保存更改
const saveChange = () => {
  linksStore.saveLinks(JSON.parse(codeValue.value))
  toast('保存成功!', {
    type: TYPE.SUCCESS,
    position: POSITION.TOP_RIGHT,
  })
}
// 清除数据
const clearData = () => {
  linksStore.initData()
  // toast('清除成功!', {
  //   type: TYPE.SUCCESS,
  //   position: POSITION.TOP_RIGHT,
  // })
}
</script>

<template>
  <div flex flex-wrap scrollbar="~ dark:track-color-gray-800 dark:thumb-color-stone-500 rounded w-8px">
    <div class="btn-lis flex-one f-c-c w-full">
      <div class="btn" @click="goBack">
        🪐 Go Back
      </div>
      <!-- 导入Json文件 -->
      <div>
        <input
          id="jsonFile"
          display="none"
          type="file"
          accept=".json"
          class="btn"
          @change="importJson"
        >
        <div class="btn" @click="clickjsonFile">
          {{ jsonFileName ? jsonFileName : '导入Json文件' }}
        </div>
      </div>
      <div class="btn" @click="clearData">
        清除数据
      </div>
      <div class="btn" @click="exportJson">
        导出Json
      </div>
      <div class="btn" @click="saveChange">
        保存更改
      </div>
    </div>
    <PrismEditor v-model="codeValue" mode="code" class="my-editor flex-one" :highlight="highlighter" line-numbers />
  </div>
</template>

<style lang="less">
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
  .btn-lis{
    > *:not(:last-child){
      margin-bottom: 10px;
    }
  }
  // 当屏幕宽度大于 768px 时
@media (min-width: 768px) {
  .flex-one {
    flex: 1 1 0%;
    margin: 0 1rem;
  }
}
</style>

<route lang="yaml">
meta:
  layout: link
</route>

