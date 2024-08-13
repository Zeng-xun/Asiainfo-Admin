import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import removeNoMatch from 'vite-plugin-router-warn'
import { pluginIcons, pluginPagePathes } from './build/plugin-isme'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
	const viteEnv = loadEnv(mode, process.cwd())
	const { VITE_PUBLIC_PATH, VITE_PROXY_TARGET } = viteEnv

	return {
		base: VITE_PUBLIC_PATH || '/',
		plugins: [
			Vue(),
			VueDevTools(),
			Unocss(),
			AutoImport({
				imports: ['vue', 'vue-router'],
				dts: false
			}),
			Components({
				resolvers: [NaiveUiResolver()],
				dts: false
			}),
			// 自定义插件，用于生成页面文件的path，并添加到虚拟模块
			pluginPagePathes(),
			// 自定义插件，用于生成自定义icon，并添加到虚拟模块
			pluginIcons(),
			// 移除非必要的vue-router动态路由警告: No match found for location with path
			removeNoMatch(),
			viteMockServe({
				mockPath: './mock/', // 设置模拟数据的存储文件夹
				supportTs: false, // 是否读取ts文件模块
				logger: true, //  是否在控制台显示请求日志
				localEnabled: true, //设置是否启用本地mock文件
				prodEnabled: false //设置打包是否启用 mock 功能
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(process.cwd(), 'src'),
				'~': path.resolve(process.cwd())
			}
		},
		server: {
			host: '0.0.0.0',
			port: 3200,
			open: false,
			proxy: {
				'/api': {
					target: VITE_PROXY_TARGET,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '/api/v1'),
					secure: false,
					configure: (proxy, options) => {
						// 配置此项可在响应头中看到请求的真实地址
						proxy.on('proxyRes', (proxyRes, req) => {
							proxyRes.headers['x-real-url'] =
								new URL(req.url || '', options.target)?.href ||
								''
						})
					}
				}
			}
		},
		build: {
			chunkSizeWarningLimit: 1024 // chunk 大小警告的限制（单位kb）
		}
	}
})
