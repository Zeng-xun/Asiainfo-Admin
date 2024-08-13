<template>
	<n-data-table
		class="ai-table"
		remote
		striped
		:loading="loading"
		:columns="columns"
		:data="data"
		:bordered="false"
		:pagination="{
			'display-order': ['size-picker', 'pages'],
			'show-size-picker': true,
			'page-sizes': [10, 20, 30, 40, 50],
			prefix({ itemCount }) {
				return `Total count: ${itemCount}.`
			},
			...pages
		}"
		@update:page="handlePageChange"
		@update:page-size="handlePageSizeChange"
	>
		<template #loading>
			<div class="loader"></div>
		</template>
	</n-data-table>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue'
	defineProps({
		loading: {
			type: Boolean,
			default: false
		},
		pages: {
			type: Object,
			default: {
				page: 1,
				pageSize: 10,
				itemCount: 0
			}
		},
		columns: {
			type: Array,
			default: []
		},
		data: {
			type: Array,
			default: []
		}
	})
	const emits = defineEmits(['currentPageChanged', 'pageSizeChanged'])

	function handlePageChange(currentPage) {
		emits('currentPageChanged', currentPage)
	}
	function handlePageSizeChange(pageSize) {
		emits('pageSizeChanged', pageSize)
	}
</script>

<style lang="scss" scoped>
	.loader {
		display: block;
		--height-of-loader: 4px;
		--loader-color: rgba(var(--primary-color));
		width: 130px;
		height: var(--height-of-loader);
		border-radius: 30px;
		background-color: rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.loader::before {
		content: '';
		position: absolute;
		background: var(--loader-color);
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
		border-radius: 30px;
		animation: moving 1s ease-in-out infinite;
	}

	@keyframes moving {
		50% {
			width: 100%;
		}

		100% {
			width: 0;
			right: 0;
			left: unset;
		}
	}
</style>
