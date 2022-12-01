<script setup lang="ts">
import { useClipboard, useTransition } from '@vueuse/core'
import { POSITION, TYPE, useToast } from 'vue-toastification'
import colorHistory from './components/colorHistory.vue'
// const { t, availableLocales, locale } = useI18n()

const toast = useToast()
const color = ref('')
// rgbColor
const rgbColor = ref('rgb(0, 0, 0)')
const rgbColorBase = ref([0, 0, 0])
const easeOutElastic = (n: any) => {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : n.toFixed(1) + 1
}

const output = useTransition(rgbColorBase, {
  transition: easeOutElastic,
})

const rgbColorAnim = computed(() => {
  const [r, g, b] = output.value
  return `rgb(${r}, ${g}, ${b})`
})
const { copy: rgbCopy, copied: rgbCopied, isSupported: rgbIsSupported } = useClipboard()
const { copy: hexCopy, copied: hexCopied, isSupported: hexIsSupported } = useClipboard()
// hexColor
const hexColor = ref('#000000')
// 背景色
const colorBg = ref('white')
// 是否需要动态改变背景色
const isChangeBg = ref(false)

// rgb转16进制
const rgbToHex = (rgb: string) => {
  // 如果rgb为空，就返回空
  if (!rgb)
    return ''
  // 如果rgb不是rgb颜色，就返回空
  if (!rgb.startsWith('rgb'))
    return ''
  // 把rgb颜色转换成数组
  const rgbArr = rgb.replace('rgb(', '').replace(')', '').split(',')
  // 如果数组长度不是3，就返回空
  if (rgbArr.length !== 3)
    return ''
  // 把数组转换成16进制颜色
  const hex = `#${rgbArr.map((x) => {
    const hex = Number(x).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }).join('')}`
  // 返回16进制颜色
  return hex
}
// 16进制转rgb
const hexToRgb = (hex: string) => {
  // 如果hex为空，就返回空
  if (!hex)
    return ''
  // 如果hex不是16进制颜色，就返回空
  if (!hex.startsWith('#'))
    return ''
  // 如果hex长度不是7，就返回空
  if (hex.length !== 7)
    return ''
  // 把16进制颜色转换成数组
  const rgbArr = hex.replace('#', '').match(/.{1,2}/g) || []
  // 如果数组长度不是3，就返回空
  if (rgbArr.length !== 3)
    return ''
  // 把数组转换成rgb颜色
  const rgb = `rgb(${rgbArr.map(x => parseInt(x, 16)).join(',')})`
  // 返回rgb颜色
  return rgb
}
// 随机颜色
const randomColor = () => {
  // 随机生成rgb颜色
  const rgb = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  // 把rgb颜色转换成16进制颜色
  const hex = rgbToHex(rgb)
  // 把rgb颜色赋值给rgbColor
  rgbColor.value = rgb
  // 把16进制颜色赋值给hexColor
  hexColor.value = hex
  // 把rgb颜色赋值给color
  color.value = rgb
  // 背景色赋值给colorBg
  if (isChangeBg.value)
    colorBg.value = rgb
}
// 存储转换成功的颜色
const colorhistory = ref<string[]>([])
const saveHistoryColor = () => {
  colorhistory.value.push(color.value)
  // 如果有重复的颜色，就删除重复的颜色
  colorhistory.value = colorhistory.value.filter((item, index) => colorhistory.value.indexOf(item) === index)
}
const colorMutate = () => {
  // 如果是空的，就隨機產生一個顏色
  if (!color.value) {
    return toast('Value is null! 🙉', {
      type: TYPE.WARNING,
      // position: POSITION.TOP_CENTER,
      position: POSITION.TOP_RIGHT,
    })
  }
  // 判断是否是16进制颜色
  if (color.value.startsWith('#')) {
    const rgb = hexToRgb(color.value)
    // 如果转换失败，就返回
    if (!rgb) {
      return toast('Hex to rgb failed!', {
        type: TYPE.ERROR,
        // position: POSITION.TOP_CENTER,
        position: POSITION.TOP_RIGHT,
      })
    }
    rgbColor.value = rgb
    hexColor.value = color.value
    if (isChangeBg.value)
      colorBg.value = color.value
  }
  // 判断是否是rgb颜色(如果有'rgb',则只取'()'里的内容
  else if (color.value.includes('rgb')) {
    // 如果是rgb颜色，就转换成16进制颜色
    const hex = rgbToHex(color.value)
    // 如果转换失败，就返回
    if (!hex) {
      return toast('Rgb to Hex failed!', {
        type: TYPE.ERROR,
        // position: POSITION.TOP_CENTER,
        position: POSITION.TOP_RIGHT,
      })
    }
    hexColor.value = hex
    rgbColor.value = color.value
    if (isChangeBg.value)
      colorBg.value = color.value
  }
  // 如果以'('开头，')'结尾
  else if (color.value.startsWith('(') && color.value.endsWith(')')) {
    const hex = rgbToHex(`rgb${color.value}`)
    if (!hex) {
      return toast('Rgb to Hex failed!', {
        type: TYPE.ERROR,
        // position: POSITION.TOP_CENTER,
        position: POSITION.TOP_RIGHT,
      })
    }

    hexColor.value = hex
    rgbColor.value = color.value
    if (isChangeBg.value)
      colorBg.value = hex
  }
  // 如果包含两个","
  else if (color.value.split(',').length === 3) {
    const hex = rgbToHex(`rgb(${color.value})`)
    if (!hex) {
      return toast('Rgb to Hex failed!', {
        type: TYPE.ERROR,
        // position: POSITION.TOP_CENTER,
        position: POSITION.TOP_RIGHT,
      })
    }
    hexColor.value = hex
    rgbColor.value = color.value
    if (isChangeBg.value)
      colorBg.value = hex
  }

  else {
    return toast('Value is not a color!', {
      type: TYPE.ERROR,
      // position: POSITION.TOP_CENTER,
      position: POSITION.TOP_RIGHT,
    })
  }
  // 存储转换成功的颜色
  saveHistoryColor()
}

const test = () => {
  rgbColorBase.value = [100, 88, 21]
  // useTransition(rgbColorBase, {
  //   transition: [0.75, 0, 0.25, 1],
  // })
}

// 如果rgbColor改变，则同时改变rgbColorAnim
watch(rgbColor, (val) => {
  // 将rgb颜色转换成数组
  const rgbArr = val.replace('rgb(', '').replace(')', '').split(',')
  rgbColorBase.value = rgbArr.map(x => parseInt(x))
})
// 是否正在联想
const getSuggestLoading = ref(false)
const copyValue = ref('')
const suggestWords = ref('')

// 获取联想词
const getSuggest = async () => {
  suggestWords.value = 'guessing...'
  getSuggestLoading.value = true
  let suggestEg = ''
  setTimeout(() => {
    if (copyValue.value.includes('r') || copyValue.value.includes('g') || copyValue.value.includes('b'))
      suggestEg = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    // 如果数字开头，则返回格式为12，34，56的字符串
    else if (copyValue.value.match(/^\d/))
      suggestEg = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`
      // 如果是#开头，则返回格式为#123456的字符串
    else if (copyValue.value.match(/^#/))
      suggestEg = `#${Math.floor(Math.random() * 256).toString(16)}${Math.floor(Math.random() * 256).toString(16)}${Math.floor(Math.random() * 256).toString(16)}`
    else
      suggestEg = 'It is not a color!'

    suggestWords.value = `eg:${suggestEg}`
    getSuggestLoading.value = false
  }, 800)
}
// 监听inputValue
watch(color, (val) => {
  copyValue.value = val
  getSuggest()
})

const changeBg = () => {
  isChangeBg.value = !isChangeBg.value
  if (isChangeBg.value)
    colorBg.value = hexColor.value
  else
    colorBg.value = '#fff'
}
</script>

<template>
  <div
    class="!w-full h-screen flex flex-col items-center justify-center"
    :style="
      {
        backgroundColor: colorBg,
      }
    "
  >
    <div relative="" border="~ rounded base" class="w-[30%] min-w-120 h-15 box-border" shadow font-200 text-2xl>
      <div absolute flex w-full h-full px-6>
        <div v-if="copyValue" color-transparent opacity-0 bg-transparent h-full z-9 flex items-center justify-start pt-2 box-border>
          {{ copyValue }}
        </div>
        <div v-if="color" bg-blue-400 color-gray bg-transparent h-full z-9 flex items-center justify-start pt-2 box-border ml-2>
          {{ suggestWords }}

          <!-- 旋转动画图标 -->
          <div v-if="getSuggestLoading" class="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-gray" />
        </div>
      </div>
      <input v-model="color" z-10 aria-label="What color it is?" placeholder="What color it is?..." type="text" autocomplete="off" w="full" p="x6 y4" bg-transparent="" border-none="" class="!outline-none absolute left-0" @keydown.enter="colorMutate"><!---->
    </div>
    <div>
      <button
        class="m-3 text-sm btn"
        @click="colorMutate"
      >
        colorMutate
      </button>
      <button
        class="m-3 text-sm btn"
        @click="randomColor"
      >
        randomColor
      </button>
      <button
        class="m-3 text-sm btn"
        @click="changeBg"
      >
        {{ !isChangeBg ? 'changeBg' : 'notChangeBg' }}
      </button>
    </div>
    <div>
      <div class="m-3 text-sm flex items-center justify-between">
        rgbColor:
        <div>
          {{ rgbColor }}
          <button v-if="rgbIsSupported" icon-btn @click="rgbCopy(rgbColor)">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!rgbCopied" i-carbon-calculator>Copy</span>
            <span v-else i-carbon-calculator-check>Copied!</span>
            <span v-if="rgbCopied">Copied!</span>
          </button>
        </div>
      </div>
      <div class="m-3 text-sm flex justify-between">
        hexColor: <div>
          {{ hexColor }}
          <button v-if="hexIsSupported" icon-btn @click="hexCopy(hexColor)">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!hexCopied" i-carbon-calculator>Copy</span>
            <span v-else i-carbon-calculator-check>Copied!</span>
            <span v-if="hexCopied">Copied!</span>
          </button>
        </div>
      </div>
      <!-- <div class="m-3 text-sm flex justify-between">
        test: <div>
          {{ rgbColorAnim }}
        </div>
      </div> -->
      <div class="m-3 text-sm flex justify-between">
        <!-- 色块显示 -->
        color:
        <div
          class="h-4 w-8"
          :style="
            {
              backgroundColor: hexColor,
            }
          "
        />
      </div>
    </div>
    <div>
      <colorHistory :colorList="colorhistory" />
    </div>
  </div>
</template>

