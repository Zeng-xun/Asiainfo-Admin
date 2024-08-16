<template>
	<div class="w-full bg-#fafafc dark:bg-#26262a p-10 f-c-c gap-10 mb-10">
		<div
			class="w-full p-r-10"
			border-r="2px solid #efeff5 dark:#2d2d30"
		>
			<slot name="form"></slot>
		</div>
		<div
			class="flex gap-10"
			:class="`flex-${directions}`"
		>
			<slot name="actions"></slot>
			<n-button
				type="primary"
				@click="handleSearch"
			>
				{{ $t('operate.search') }}
			</n-button>
			<n-button
				v-if="showReset"
				@click="handleReset"
			>
				{{ $t('operate.reset') }}
			</n-button>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		showReset: {
			type: Boolean,
			default: false
		},
		directions: {
			type: String,
			default: 'row'
		}
	})

	const emits = defineEmits(['handleSearch', 'handleReset'])

	function handleSearch() {
		emits('handleSearch')
	}

	function handleReset() {
		emits('handleReset')
	}
</script>

<style></style>
