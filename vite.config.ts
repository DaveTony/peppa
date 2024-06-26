import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { visualizer } from 'rollup-plugin-visualizer'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    base: '/peppa/',
    resolve: {
        alias: {
            '@': resolve('./src'),
            src: resolve('./src')
        }
    },
    plugins: [
        // https://npmmirror.com/package/unplugin-vue-router
        VueRouter({
            routesFolder: [{ src: 'src/pages' }],
            dts: 'types/typed-router.d.ts'
        }),

        // Vue must be placed after VueRouter()
        vue(),

        // https://npmmirror.com/package/unplugin-auto-import
        AutoImport({
            imports: ['vue', VueRouterAutoImports],
            dts: 'types/auto-imports.d.ts'
        }),

        // https://npmmirror.com/package/unplugin-vue-components
        Components({
            dirs: ['src/components'],
            dts: 'types/components.d.ts',
            resolvers: [IconsResolver()]
        }),

        // https://npmmirror.com/package/unplugin-icons#h-auto-importing
        // https://icones.js.org
        Icons({
            compiler: 'vue3',
            autoInstall: true,
            scale: 1.5,
            defaultClass: 'cursor-pointer'
        }),

        // analyze bundle size
        visualizer()
    ]
})
