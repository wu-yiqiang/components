import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir);
};
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    vue(),
    AutoImport({
        imports: [
            'vue',
            'vue-router',
            'vue-i18n',
            {
                'lodash-es': [
                    'cloneDeep',
                    'camelCase',
                    'isPlainObject',
                    'merge',
                    'isEmpty',
                    'debounce',
                    'throttle',
                    'omit',
                    'omitBy',
                    'isObject',
                ],
            },
//            {
//                '@/hooks/index.ts': [
//                    'isArlang',
//                    'isEnlang',
//                    'isCnlang',
//                    'isDark',
//                    'isLight',
//                    'goTo',
//                ],
//            },
        ],
        dts: 'src/auto-import.d.ts',
        //ant-design-vue
        resolvers: [],
    }),
    Components({
        // 指定组件位置，默认是src/components
        dirs: ['src/components'],
        // ui库解析器
        extensions: ['vue'],
        // 配置文件生成位置
        dts: './auto-components.d.ts',
        resolvers: [
        ],
    }),
    svgLoader(),
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [pathResolve('src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  esbuild: {
    drop:
        process.env.NODE_ENV === 'development'
            ? []
            : ['console', 'debugger'],
},
  server: {
    host: '0.0.0.0',
    port: 8086,
    open: false,
    hmr: true,
    proxy: {
        '/api': {
            target: '127.0.0.1:8080',
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
},
build: {
    sourcemap: false,
    emptyOutDir: true,
    minify: 'terser', // 指定混淆器
    cssCodeSplit: true, // 启用css代码拆分
    reportCompressedSize: false, // 取消计算文件大小
    chunkSizeWarningLimit: 10240, // chunk大小警告的限制
    rollupOptions: {
        treeshake: true,
        output: {
            experimentalMinChunkSize: 100 * 1024, // 单位b 合并小chunk，避免chunk碎片化
            // manualChunks: {
            //     vendor: [
            //         'echarts',
            //         'axios',
            //         'vue',
            //         'lodash-es',
            //         'vue-router',
            //         'pinia',
            //     ],
            // },
            manualChunks: (id: string) => {
                if (id.includes('node_modules')) {
                    return 'vendor';
                }
            },
            chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
            entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
            assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        },
    },
},
})
