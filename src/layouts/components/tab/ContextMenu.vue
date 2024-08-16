<template>
	<n-dropdown
		:show="show"
		:options="options"
		:x="x"
		:y="y"
		placement="bottom-start"
		@clickoutside="handleHideDropdown"
		@select="handleSelect"
	/>
</template>

<script setup>
	import { useTabStore } from '@/store'
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()

	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		currentPath: {
			type: String,
			default: ''
		},
		x: {
			type: Number,
			default: 0
		},
		y: {
			type: Number,
			default: 0
		}
	})

	const emit = defineEmits(['update:show'])

	const tabStore = useTabStore()

	const options = computed(() => [
		{
			label: t('reload'),
			key: 'reload',
			disabled: props.currentPath !== tabStore.activeTab,
			icon: () => h('i', { class: 'i-mdi:refresh text-14' })
		},
		{
			label: t('close'),
			key: 'close',
			disabled: tabStore.tabs.length <= 1 || props.currentPath === '/',
			icon: () => h('i', { class: 'i-mdi:close text-14' })
		},
		{
			label: t('close_other'),
			key: 'close-other',
			disabled: tabStore.tabs.length <= 1,
			icon: () =>
				h('i', { class: 'i-mdi:arrow-expand-horizontal text-14' })
		},
		{
			label: t('close_left_side'),
			key: 'close-left',
			disabled:
				tabStore.tabs.length <= 1 ||
				props.currentPath === tabStore.tabs[0].path,
			icon: () => h('i', { class: 'i-mdi:arrow-expand-left text-14' })
		},
		{
			label: t('close_right_side'),
			key: 'close-right',
			disabled:
				tabStore.tabs.length <= 1 ||
				props.currentPath ===
					tabStore.tabs[tabStore.tabs.length - 1].path,
			icon: () => h('i', { class: 'i-mdi:arrow-expand-right text-14' })
		}
	])

	const route = useRoute()
	const actionMap = new Map([
		[
			'reload',
			() => {
				tabStore.reloadTab(route.fullPath, route.meta?.keepAlive)
			}
		],
		[
			'close',
			() => {
				tabStore.removeTab(props.currentPath)
			}
		],
		[
			'close-other',
			() => {
				tabStore.removeOther(props.currentPath)
			}
		],
		[
			'close-left',
			() => {
				tabStore.removeLeft(props.currentPath)
			}
		],
		[
			'close-right',
			() => {
				tabStore.removeRight(props.currentPath)
			}
		]
	])

	function handleHideDropdown() {
		emit('update:show', false)
	}

	function handleSelect(key) {
		const actionFn = actionMap.get(key)
		if (typeof actionFn === 'function') actionFn()
		handleHideDropdown()
	}
</script>
