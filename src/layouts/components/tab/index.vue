<template>
	<div>
		<n-tabs
			:value="tabStore.activeTab"
			type="card"
			@close="path => tabStore.removeTab(path)"
		>
			<n-tab
				v-for="item in tabStore.tabs"
				:key="item.path"
				:name="item.path"
				:closable="item.path !== '/'"
				@click="handleItemClick(item.path)"
				@contextmenu.prevent="handleContextMenu($event, item)"
			>
				{{ $t(`menu.${item.i18n}`) }}
			</n-tab>
		</n-tabs>

		<ContextMenu
			v-if="contextMenuOption.show"
			v-model:show="contextMenuOption.show"
			:current-path="contextMenuOption.currentPath"
			:x="contextMenuOption.x"
			:y="contextMenuOption.y"
		/>
	</div>
</template>

<script setup>
	import ContextMenu from './ContextMenu.vue'
	import { useTabStore } from '@/store'

	const router = useRouter()
	const tabStore = useTabStore()
	console.log(tabStore.tabs)

	const contextMenuOption = reactive({
		show: false,
		x: 0,
		y: 0,
		currentPath: ''
	})

	function handleItemClick(path) {
		tabStore.setActiveTab(path)
		router.push(path)
	}

	function showContextMenu() {
		contextMenuOption.show = true
	}
	function hideContextMenu() {
		contextMenuOption.show = false
	}
	function setContextMenu(x, y, currentPath) {
		Object.assign(contextMenuOption, { x, y, currentPath })
	}

	// 右击菜单
	async function handleContextMenu(e, tagItem) {
		const { clientX, clientY } = e
		hideContextMenu()
		setContextMenu(clientX, clientY, tagItem.path)
		await nextTick()
		showContextMenu()
	}
</script>

<style scoped lang="scss">
	:deep(.n-tabs) {
		.n-tabs-tab {
			position: relative;
			height: 36px;
			background: transparent !important;
			border-color: transparent !important;
			margin-right: 4px;
			transition: all 0.3s ease-in-out;

			&:hover {
				color: rgba(var(--primary-color), 0.8) !important;

				&:not(.n-tabs-tab--active) {
					.n-base-icon svg {
						width: 1rem;
						transition: all 0.3s ease-in-out;
					}
				}

				&::before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 50%;
					height: 2px;
					background-color: rgba(var(--primary-color));
					transition: all 0.3s ease-in-out;
				}

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					right: 50%;
					width: 50%;
					height: 2px;
					background-color: rgba(var(--primary-color));
					transition: all 0.3s ease-in-out;
				}
			}

			&:not(.n-tabs-tab--active) {
				.n-base-icon svg {
					width: 0;
					transition: all 0.3s ease-in-out;
				}
			}

			&::before {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 0;
				height: 2px;
				background-color: rgba(var(--primary-color));
				transition: all 0.3s ease-in-out;
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				right: 50%;
				width: 0;
				height: 2px;
				background-color: rgba(var(--primary-color));
				transition: all 0.3s ease-in-out;
			}
		}

		.n-tabs-tab--active {
			position: relative;
			color: rgba(var(--primary-color)) !important;
			background-color: rgba(var(--primary-color), 0.1) !important;

			&::before {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 50%;
				height: 2px;
				background-color: rgba(var(--primary-color));
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				right: 50%;
				width: 50%;
				height: 2px;
				background-color: rgba(var(--primary-color));
			}
		}

		.n-tabs-pad,
		.n-tabs-tab-pad,
		.n-tabs-scroll-padding {
			border: none !important;
		}
	}
</style>
