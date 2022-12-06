import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import type { Shortcut } from 'unocss'

const usefulShortcuts: Shortcut[] = [
  ['pr', 'relative'],
  ['pa', 'absolute'],
  ['pf', 'fixed'],
  ['f-c', 'flex justify-center items-center'],
  ['f-c-c', 'f-c flex-col'],
  ['fc', 'flex justify-center'],
  ['fcc', 'flex justify-center items-center'],
  ['fs', 'flex justify-start'],
  ['fsc', 'flex justify-start items-center'],
  ['fe', 'flex justify-end'],
  ['fec', 'flex justify-end items-center'],
  ['fb', 'flex justify-between'],
  ['fbc', 'flex justify-between items-center'],
  ['fw', 'flex justify-wrap'],
  ['fwr', 'flex justify-wrap-reverse'],
  ['fa', 'flex justify-around'],
  ['fac', 'flex justify-around items-center'],

  ['fic', 'flex items-center'],
  ['fccc', 'flex justify-center items-center flex-col'],

  ['p-c', 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
  ['collapseItem', 'cursor-pointer hover:bg-[#c9cdd4] fsc bg-[#f2f3f5] rounded px-2 py-1 dark:bg-[#2e2e30] dark:hover:bg-[#2b2b2e]'],
  ['collapseSubItem', 'cursor-pointer hover:bg-[#c9cdd4] fsc rounded px-2 py-1 pl-4 dark:bg-transparent dark:hover:bg-[#2b2b2e]'],
]

export default defineConfig({
  shortcuts: [
    ...usefulShortcuts,
    ['btn', 'px-4 py-1 rounded inline-block bg-cyan-500 text-white cursor-pointer hover:bg-cyan-600 disabled:cursor-default disabled:bg-sky-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-cyan-500 !outline-none'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetScrollbar({
      // config
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
