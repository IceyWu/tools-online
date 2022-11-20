import { acceptHMRUpdate, defineStore } from 'pinia'

export const useColorStore = defineStore('color', () => {
  // 定义字符串类型的响应式数据
  const colorList: any = ref([])

  function saveColor(color: string) {
    // colorList.value.push(color)
    // 如果数组中已经存在该颜色，则不再添加，并且将该颜色放到数组的开始
    if (colorList.value.includes(color)) {
      const index = colorList.value.indexOf(color)
      colorList.value.splice(index, 1)
    }
    colorList.value.unshift(color)
    // 如果数组长度超过了10，则删除最后一个
    if (colorList.value.length > 10)
      colorList.value.pop()
  }

  return {
    colorList,
    saveColor,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useColorStore, import.meta.hot))
