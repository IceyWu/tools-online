<script setup lang="ts">
import { useClipboard, useTransition } from '@vueuse/core'
import { POSITION, TYPE, useToast } from 'vue-toastification'
import colorHistory from './components/colorHistory.vue'

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
// hexColor
const hexColor = ref('#000000')
// 背景色
const colorBg = ref('white')

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
  colorBg.value = rgb
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
    console.log('hex')
    // 如果是16进制颜色，就转换成rgb颜色
    const rgb = hexToRgb(color.value)
    // 如果转换失败，就返回
    if (!rgb) {
      return toast('Hex to rgb failed!', {
        type: TYPE.ERROR,
        // position: POSITION.TOP_CENTER,
        position: POSITION.TOP_RIGHT,
      })
    }
    // 转换成功，就把rgb颜色赋值给rgbColor
    rgbColor.value = rgb
    // 把16进制颜色赋值给hexColor
    hexColor.value = color.value
    // 把16进制颜色赋值给背景色
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
    // 转换成功，就把16进制颜色赋值给hexColor
    hexColor.value = hex
    // 把rgb颜色赋值给rgbColor
    rgbColor.value = color.value
    // 把16进制颜色赋值给背景色
    colorBg.value = hex
  }

  else {
    return toast('Value is not a color!', {
      type: TYPE.ERROR,
      // position: POSITION.TOP_CENTER,
      position: POSITION.TOP_RIGHT,
    })
  }
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
    <div relative="" border="~ rounded base" class="w-[30%] min-w-120" shadow="" font-200="" text-2xl="">
      <input v-model="color" aria-label="What color it is?" placeholder="What color it is?..." type="text" autocomplete="off" w="full" p="x6 y4" bg-transparent="" border-none="" class="!outline-none" @keydown.enter="colorMutate"><!---->
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
        @click="test"
      >
        test
      </button>
    </div>
    <div>
      <div class="m-3 text-sm flex items-center justify-center">
        rgbColor: {{ rgbColor }}

        <button v-if="rgbIsSupported" icon-btn @click="rgbCopy(rgbColor)">
          <!-- by default, `copied` will be reset in 1.5s -->
          <span v-if="!rgbCopied" i-carbon-calculator>Copy</span>
          <span v-else i-carbon-calculator-check>Copied!</span>
          <span v-if="rgbCopied">Copied!</span>
        </button>
      </div>
      <div class="m-3 text-sm">
        hexColor: {{ hexColor }}
      </div>
      <div class="m-3 text-sm">
        test: {{ rgbColorAnim }}
      </div>
    </div>
    <div>
      <colorHistory />
    </div>
  </div>
</template>

