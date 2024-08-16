<template>
	<CommonPage>
		<AiSearchWrapper
			showReset
			@handleSearch="handleSearch"
		>
			<template #form>
				<n-grid
					:cols="24"
					:x-gap="10"
					:y-gap="10"
				>
					<n-form-item-gi
						:span="4"
						:show-label="false"
						:show-feedback="false"
					>
						<n-input
							v-model:value="searchForm.name"
							:placeholder="$t('common.user_name')"
						/>
					</n-form-item-gi>
					<n-form-item-gi
						:span="4"
						:show-label="false"
						:show-feedback="false"
					>
						<n-input
							v-model:value="searchForm.address"
							:placeholder="$t('common.address')"
						/>
					</n-form-item-gi>
					<n-form-item-gi
						:span="4"
						:show-label="false"
						:show-feedback="false"
					>
						<n-input
							v-model:value="searchForm.email"
							:placeholder="$t('common.email')"
						/>
					</n-form-item-gi>
				</n-grid>
			</template>
			<template #actions>
				<n-button type="primary">{{ $t('operate.add') }}</n-button>
			</template>
		</AiSearchWrapper>
		<AiTable
			:loading="loading"
			:data="data"
			:columns="columns"
			:pages="pages"
			@currentPageChanged="currentPageChanged"
			@pageSizeChanged="pageSizeChanged"
		></AiTable>
		<AiModal ref="model"> edit </AiModal>
	</CommonPage>
</template>

<script setup>
	import { onMounted, ref, h, reactive } from 'vue'
	import { useI18n } from 'vue-i18n'
	import mockApi from '@/api/mock'
	import { NButton } from 'naive-ui'

	const { t } = useI18n()

	const searchForm = ref({
		name: '',
		address: '',
		email: ''
	})
	const searchFormRules = ref({})

	let loading = ref(false)
	let data = reactive([])
	let pages = reactive({
		page: 1,
		pageSize: 10,
		itemCount: 0
	})

	const model = ref(null)
	onMounted(() => {
		queryData()
	})
	const columns = ref([
		{
			title: t('common.id'),
			key: 'id',
			width: 'auto'
		},
		{
			title: t('common.user_name'),
			key: 'name',
			width: 'auto'
		},
		{
			title: t('common.status'),
			key: 'status',
			width: 'auto',
			render(row, index) {
				return h(
					'span',
					{
						class: `${row.status === 0 ? 'status-tag-red' : 'status-tag-#697eff'}`
					},
					{ default: () => (row.status === 0 ? 'Stop' : 'Normal') }
				)
			}
		},
		{
			title: t('common.address'),
			key: 'address',
			width: 'auto'
		},
		{
			title: t('common.age'),
			key: 'age',
			width: 'auto'
		},
		{
			title: t('common.actions'),
			key: 'actions',
			render(row) {
				return [
					h(
						NButton,
						{
							strong: true,
							quaternary: true,
							type: 'primary',
							size: 'small',
							style: {
								'margin-right': '10px'
							},
							onClick: () => {
								model.value.open({
									title: t('operate.edit')
								})
							}
						},
						{ default: () => t('operate.edit') }
					),
					h(
						NButton,
						{
							strong: true,
							quaternary: true,
							type: 'error',
							size: 'small',
							onClick: () => {
								$dialog.confirm({
									title: t('common.warning'),
									content: t('confirm.delete_confirm'),
									onPositiveClick: () => {
										$message.success('确定')
									},
									onNegativeClick: () => {
										$message.error('不确定')
									}
								})
							}
						},
						{ default: () => t('operate.delete') }
					)
				]
			}
		}
	])

	function queryData() {
		loading.value = true
		mockApi
			.getList({
				pageNum: pages.page,
				pageSize: pages.pageSize,
				serviceName: '',
				status: ''
			})
			.then(res => {
				setTimeout(() => {
					loading.value = false
					if (res.success) {
						data = res.result
						pages.itemCount = res.total
					}
				}, 500)
			})
	}
	function handleSearch() {
		queryData()
	}
	function currentPageChanged(val) {
		pages.page = val
		queryData()
	}
	function pageSizeChanged(val) {
		pages.pageSize = val
		queryData()
	}

	function search() {
		pages = {
			page: 1,
			pageSize: 10,
			itemCount: 0
		}
		queryData()
	}
</script>

<style lang="scss"></style>
