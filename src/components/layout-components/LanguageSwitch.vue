<template>
	<i
		class="mr-16 cursor-pointer"
		:class="
			appStore.language === 'en'
				? 'i-uil:letter-chinese-a'
				: 'i-uil:letter-english-a'
		"
		@click="toggleLanguage"
	/>
</template>

<script setup>
	import { useAppStore } from '@/store'
	import { useI18n } from 'vue-i18n'

	const { locale } = useI18n()
	const appStore = useAppStore()

	function toggleLanguage() {
		let targetLanguage = appStore.language === 'en' ? 'zh' : 'en'
		appStore.toggleLanguage(targetLanguage)
		locale.value = targetLanguage
		window.$notification.success({
			title: 'Language switching successful',
			description: `The current language is ${targetLanguage === 'zh' ? 'Chinese' : 'English'}`,
			duration: 3000
		})
	}
</script>
