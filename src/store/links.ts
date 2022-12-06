import { acceptHMRUpdate, defineStore } from 'pinia'
import { POSITION, TYPE, useToast } from 'vue-toastification'
const toast = useToast()
export const useLinksStore = defineStore('links', () => {
  // 定义字符串类型的响应式数据
  const linksList: any = ref([])
  const collectLinksList: any = ref([])
  // 收藏的链接
  const collectLinks: any = computed(() => {
    return linksList.value.filter((item: any) => collectLinksList.value.includes(item.id))
  })
  const linkData: any = computed(() => {
    return linksList.value.map((item: any) => {
      return {
        ...item,
        isCollect: collectLinksList.value.includes(item.id),
      }
    })
  })
  // 存储链接
  function saveLinks(links: string) {
    linksList.value = links
  }
  // 收藏链接(传入对应id)
  function saveCollectLink(id: number) {
    const isCollect = collectLinksList.value.includes(id)
    if (isCollect) {
      const index = collectLinksList.value.indexOf(id)
      collectLinksList.value.splice(index, 1)
    }
    else {
      collectLinksList.value.push(id)
    }
  }
  // 数据初始化
  function initData() {
    linksList.value = []
    collectLinksList.value = []
    toast('数据清除成功', {
      // message: '数据初始化成功',
      position: POSITION.TOP_RIGHT,
      type: TYPE.SUCCESS,
    })
  }
  return {
    linksList,
    saveLinks,
    linkData,
    collectLinks,
    collectLinksList,
    saveCollectLink,
    initData,
  }
},
{
  persist: {
    key: 'links-key',
  },
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot))
