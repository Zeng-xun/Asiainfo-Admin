<template>
	<div class="mr-16">
		<n-tooltip
			trigger="hover"
			placement="bottom"
		>
			<template #trigger>
				<div
					class="f-c-c"
					@click="modalRef.open()"
				>
					<i class="i-fe:settings cursor-pointer" />
				</div>
			</template>
			{{ $t('layout_settings') }}
		</n-tooltip>

		<AiModal
			ref="modalRef"
			:title="$t('layout_settings')"
			:show-footer="false"
			width="600px"
		>
			<n-space justify="space-around">
				<!-- <div
					class="flex-col cursor-pointer justify-center"
					@click="appStore.setLayout('simple')"
				>
					<div class="flex">
						<n-skeleton
							:width="20"
							:height="60"
						/>
						<div class="ml-4">
							<n-skeleton
								:width="80"
								:height="60"
							/>
						</div>
					</div>
					<n-button
						class="mt-12"
						size="small"
						:type="appStore.layout === 'simple' ? 'primary' : ''"
						ghost
					>
						简约
					</n-button>
				</div> -->
				<div
					class="flex-col cursor-pointer justify-center"
					@click="appStore.setLayout('normal')"
				>
					<div class="flex">
						<n-skeleton
							:width="20"
							:height="60"
						/>
						<div class="ml-4">
							<n-skeleton
								:width="80"
								:height="10"
							/>
							<n-skeleton
								class="mt-4"
								:width="80"
								:height="46"
							/>
						</div>
					</div>
					<n-button
						class="mt-12"
						size="small"
						:type="appStore.layout === 'normal' ? 'primary' : ''"
						ghost
					>
						{{ $t('general') }}
					</n-button>
				</div>

				<div
					class="flex-col cursor-pointer justify-center"
					@click="appStore.setLayout('full')"
				>
					<div class="flex">
						<n-skeleton
							:width="20"
							:height="60"
						/>
						<div class="ml-4">
							<n-skeleton
								:width="80"
								:height="6"
							/>
							<n-skeleton
								class="mt-4"
								:width="80"
								:height="4"
							/>
							<n-skeleton
								class="mt-4"
								:width="80"
								:height="42"
							/>
						</div>
					</div>
					<n-button
						class="mt-12"
						size="small"
						:type="appStore.layout === 'full' ? 'primary' : ''"
						ghost
					>
						{{ $t('comprehensive') }}
					</n-button>
				</div>
				<!-- <div
					class="flex-col cursor-pointer justify-center"
					@click="appStore.setLayout('empty')"
				>
					<div class="flex">
						<n-skeleton
							:width="104"
							:height="60"
						/>
					</div>
					<n-button
						class="mt-12"
						size="small"
						:type="appStore.layout === 'empty' ? 'primary' : ''"
						ghost
					>
						空白
					</n-button>
				</div> -->
			</n-space>
		</AiModal>
	</div>
</template>

<script setup>
	import { useAppStore } from '@/store'
	import { useModal } from '@/composables'

	const appStore = useAppStore()
	const [modalRef] = useModal()
</script>
