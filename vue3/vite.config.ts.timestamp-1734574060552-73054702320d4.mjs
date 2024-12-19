// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "file:///D:/projects/components/vue3/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.0_sass-embedded@1.81.0_sass@1.81.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/projects/components/vue3/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@22.9.0_sass-embedded@1.81.0_sass@1.81.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/projects/components/vue3/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.0_vite@5.4.11_@types+node@22.9.0_sass-embedded@1.81.0_sass@1.81.0__iu6tih3hwljzipuayn6nmg4abq/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/projects/components/vue3/node_modules/.pnpm/vite-plugin-vue-devtools@7.6.4_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_sass-embedded@1.8_xev55zsuediklc6spkdhgyicgu/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///D:/projects/components/vue3/node_modules/.pnpm/unplugin-auto-import@0.18.6_rollup@4.26.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/projects/components/vue3/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.2_rollup@4.26.0_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import svgLoader from "file:///D:/projects/components/vue3/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.12_typescript@5.6.3_/node_modules/vite-svg-loader/index.js";
import { createSvgIconsPlugin } from "file:///D:/projects/components/vue3/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.11_@types+node@22.9.0_sass-embedded@1.81.0_sass@1.81.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\projects\\components\\vue3";
var __vite_injected_original_import_meta_url = "file:///D:/projects/components/vue3/vite.config.ts";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        {
          "lodash-es": [
            "cloneDeep",
            "camelCase",
            "isPlainObject",
            "merge",
            "isEmpty",
            "debounce",
            "throttle",
            "omit",
            "omitBy",
            "isObject"
          ]
        }
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
      dts: "src/auto-import.d.ts",
      //ant-design-vue
      resolvers: []
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ["src/components"],
      // ui库解析器
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "./auto-components.d.ts",
      resolvers: []
    }),
    svgLoader(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve("src/assets/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  esbuild: {
    drop: process.env.NODE_ENV === "development" ? [] : ["console", "debugger"]
  },
  server: {
    host: "0.0.0.0",
    port: 8086,
    open: false,
    hmr: true,
    proxy: {
      "/api": {
        target: "127.0.0.1:8080",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    sourcemap: false,
    emptyOutDir: true,
    minify: "terser",
    // 指定混淆器
    cssCodeSplit: true,
    // 启用css代码拆分
    reportCompressedSize: false,
    // 取消计算文件大小
    chunkSizeWarningLimit: 10240,
    // chunk大小警告的限制
    rollupOptions: {
      treeshake: true,
      output: {
        experimentalMinChunkSize: 100 * 1024,
        // 单位b 合并小chunk，避免chunk碎片化
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
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js",
        // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]"
        // 资源文件像 字体，图片等
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxjb21wb25lbnRzXFxcXHZ1ZTNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RzXFxcXGNvbXBvbmVudHNcXFxcdnVlM1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdHMvY29tcG9uZW50cy92dWUzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcclxuXHJcbmNvbnN0IHBhdGhSZXNvbHZlID0gKGRpcjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgJy4nLCBkaXIpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICB2dWVEZXZUb29scygpLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgICAndnVlJyxcclxuICAgICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICAgICAndnVlLWkxOG4nLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnbG9kYXNoLWVzJzogW1xyXG4gICAgICAgICAgICAgICAgICAgICdjbG9uZURlZXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjYW1lbENhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICdpc1BsYWluT2JqZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAnbWVyZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICdpc0VtcHR5JyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVib3VuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0aHJvdHRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ29taXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdvbWl0QnknLFxyXG4gICAgICAgICAgICAgICAgICAgICdpc09iamVjdCcsXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgJ0AvaG9va3MvaW5kZXgudHMnOiBbXHJcbi8vICAgICAgICAgICAgICAgICAgICAnaXNBcmxhbmcnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgJ2lzRW5sYW5nJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICdpc0NubGFuZycsXHJcbi8vICAgICAgICAgICAgICAgICAgICAnaXNEYXJrJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICdpc0xpZ2h0JyxcclxuLy8gICAgICAgICAgICAgICAgICAgICdnb1RvJyxcclxuLy8gICAgICAgICAgICAgICAgXSxcclxuLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0LmQudHMnLFxyXG4gICAgICAgIC8vYW50LWRlc2lnbi12dWVcclxuICAgICAgICByZXNvbHZlcnM6IFtdLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTdFQzRcdTRFRjZcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY2MkZzcmMvY29tcG9uZW50c1xyXG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgICAvLyB1aVx1NUU5M1x1ODlFM1x1Njc5MFx1NTY2OFxyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXHJcbiAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3NTFGXHU2MjEwXHU0RjREXHU3RjZFXHJcbiAgICAgICAgZHRzOiAnLi9hdXRvLWNvbXBvbmVudHMuZC50cycsXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgXSxcclxuICAgIH0pLFxyXG4gICAgc3ZnTG9hZGVyKCksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoUmVzb2x2ZSgnc3JjL2Fzc2V0cy9pY29ucy9zdmcnKV0sXHJcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH0sXHJcbiAgfSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICBkcm9wOlxyXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXHJcbiAgICAgICAgICAgID8gW11cclxuICAgICAgICAgICAgOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSxcclxufSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIHBvcnQ6IDgwODYsXHJcbiAgICBvcGVuOiBmYWxzZSxcclxuICAgIGhtcjogdHJ1ZSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogJzEyNy4wLjAuMTo4MDgwJyxcclxuICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSxcclxuYnVpbGQ6IHtcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1NjMwN1x1NUI5QVx1NkRGN1x1NkRDNlx1NTY2OFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLCAvLyBcdTU0MkZcdTc1Mjhjc3NcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSwgLy8gXHU1M0Q2XHU2RDg4XHU4QkExXHU3Qjk3XHU2NTg3XHU0RUY2XHU1OTI3XHU1QzBGXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMjQwLCAvLyBjaHVua1x1NTkyN1x1NUMwRlx1OEI2Nlx1NTQ0QVx1NzY4NFx1OTY1MFx1NTIzNlxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIHRyZWVzaGFrZTogdHJ1ZSxcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgZXhwZXJpbWVudGFsTWluQ2h1bmtTaXplOiAxMDAgKiAxMDI0LCAvLyBcdTUzNTVcdTRGNERiIFx1NTQwOFx1NUU3Nlx1NUMwRmNodW5rXHVGRjBDXHU5MDdGXHU1MTREY2h1bmtcdTc4OEVcdTcyNDdcdTUzMTZcclxuICAgICAgICAgICAgLy8gbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICB2ZW5kb3I6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAnZWNoYXJ0cycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJ2F4aW9zJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAndnVlJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAnbG9kYXNoLWVzJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJ3BpbmlhJyxcclxuICAgICAgICAgICAgLy8gICAgIF0sXHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIG1hbnVhbENodW5rczogKGlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsIC8vIFx1NUYxNVx1NTE2NVx1NjU4N1x1NEVGNlx1NTQwRFx1NzY4NFx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTUzMDVcdTc2ODRcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcclxuICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJywgLy8gXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU1MENGIFx1NUI1N1x1NEY1M1x1RkYwQ1x1NTZGRVx1NzI0N1x1N0I0OVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJRLFNBQVMsZUFBZSxXQUFXO0FBQzlTLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQVRyQyxJQUFNLG1DQUFtQztBQUE0SCxJQUFNLDJDQUEyQztBQVd0TixJQUFNLGNBQWMsQ0FBQyxRQUF3QjtBQUN6QyxTQUFPLFFBQVEsa0NBQVcsS0FBSyxHQUFHO0FBQ3RDO0FBQ0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNJLGFBQWE7QUFBQSxZQUNUO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BV0o7QUFBQSxNQUNBLEtBQUs7QUFBQTtBQUFBLE1BRUwsV0FBVyxDQUFDO0FBQUEsSUFDaEIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsTUFFUCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxNQUV2QixZQUFZLENBQUMsS0FBSztBQUFBO0FBQUEsTUFFbEIsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUNYO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQTtBQUFBLE1BRWpCLFVBQVUsQ0FBQyxZQUFZLHNCQUFzQixDQUFDO0FBQUE7QUFBQSxNQUU5QyxVQUFVO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQ0ksUUFBUSxJQUFJLGFBQWEsZ0JBQ25CLENBQUMsSUFDRCxDQUFDLFdBQVcsVUFBVTtBQUFBLEVBQ3BDO0FBQUEsRUFDRSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxJQUFJO0FBQUEsUUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDaEQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBO0FBQUEsSUFDUixjQUFjO0FBQUE7QUFBQSxJQUNkLHNCQUFzQjtBQUFBO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUE7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDSiwwQkFBMEIsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVdoQyxjQUFjLENBQUMsT0FBZTtBQUMxQixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDN0IsbUJBQU87QUFBQSxVQUNYO0FBQUEsUUFDSjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNBLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
