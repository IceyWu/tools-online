import { resolve } from 'path'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import Layouts from 'vite-plugin-vue-layouts'
import { env } from './shared/env'

export default () => {
  return [
    Vue({
      reactivityTransform: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dirs: [
      //  'src/stores/**/*.ts',
        'src/composables/**/*.ts',
      ],
      dts: './presets/types/auto-imports.d.ts',
      vueTemplate: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: resolve(__dirname, './types/components.d.ts'),
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock',
      localEnabled: env.VITE_APP_USE_MOCK,
      prodEnabled: env.VITE_NODE_ENV === 'production' && env.VITE_APP_USE_MOCK,
      logger: false, // Whether to display the request log on the console
    }),
    // 布局系统
    Layouts(),
  ]
}
