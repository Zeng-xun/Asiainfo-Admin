<template>
	<n-config-provider
		class="wh-full"
		:locale="appStore.local"
		:date-locale="appStore.dateLocale"
		:theme="appStore.isDark ? darkTheme : undefined"
		:theme-overrides="appStore.naiveThemeOverrides"
	>
		<router-view
			v-if="Layout"
			v-slot="{ Component, route: curRoute }"
		>
			<component :is="Layout">
				<KeepAlive :include="keepAliveNames">
					<component
						:is="Component"
						v-if="!tabStore.reloading"
						:key="curRoute.fullPath"
					/>
				</KeepAlive>
			</component>
		</router-view>
	</n-config-provider>
</template>

<script setup>
	import { darkTheme } from 'naive-ui'
	import { useAppStore, useTabStore } from '@/store'
	import { useNavigatorLanguage } from '@vueuse/core'
	import { useI18n } from 'vue-i18n'

	const appStore = useAppStore()
	const { language } = useNavigatorLanguage()
	const { locale } = useI18n()
	if (!appStore.language) {
		let navigatorLanguage = ''
		if (['zh', 'zh-CN', 'zh-TW', 'zh-HK'].includes(language.value)) {
			navigatorLanguage = 'zh'
		} else {
			navigatorLanguage = 'en'
		}
		appStore.toggleLanguage(navigatorLanguage)
		locale.value = navigatorLanguage
	} else {
		appStore.toggleLanguage(appStore.language)
		locale.value = appStore.language
	}

	const layouts = new Map()
	function getLayout(name) {
		// 利用map将加载过的layout缓存起来，防止重新加载layout导致页面闪烁
		if (layouts.get(name)) return layouts.get(name)
		const layout = markRaw(
			defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`))
		)
		layouts.set(name, layout)
		return layout
	}

	const route = useRoute()
	if (appStore.layout === 'default') appStore.setLayout('')
	const Layout = computed(() => {
		if (!route.matched?.length) return null
		return getLayout(route.meta?.layout || appStore.layout)
	})

	const tabStore = useTabStore()
	const keepAliveNames = computed(() => {
		return tabStore.tabs
			.filter(item => item.keepAlive)
			.map(item => item.name)
	})

	watchEffect(() => {
		appStore.setThemeColor(appStore.primaryColor, appStore.isDark)
	})
</script>
