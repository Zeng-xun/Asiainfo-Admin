<template>
	<CommonPage>
		<AppCard class="flex flex-justify-between flex-items-center gap-10px">
			<n-form
				ref="formRef"
				inline
				:model="searchForm"
				:rules="searchFormRules"
			>
				<n-grid
					:cols="24"
					:x-gap="24"
				>
					<n-form-item-gi
						span="6"
						path="name"
					>
						<n-input v-model:value="searchForm.name" />
					</n-form-item-gi>
					<n-form-item-gi
						span="6"
						path="address"
					>
						<n-input v-model:value="searchForm.address" />
					</n-form-item-gi>
				</n-grid>
			</n-form>
			<n-divider vertical />
			<n-button
				type="primary"
				@click="search"
				>{{ $t('operate.search') }}</n-button
			>
			<n-button>{{ $t('operate.reset') }}</n-button>
		</AppCard>
		<AiTable
			:loading="loading"
			:data="data"
			:columns="columns"
			:pages="pages"
			@currentPageChanged="currentPageChanged"
			@pageSizeChanged="pageSizeChanged"
		></AiTable>
		<AiModal ref="model"> hahah </AiModal>
	</CommonPage>
</template>

<script setup>
	import { onMounted, ref, h, reactive } from 'vue'
	import mockApi from '@/api/mock'
	import { NTag, NButton } from 'naive-ui'

	const searchForm = ref({
		name: ''
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
			title: 'ID',
			key: 'id',
			width: 'auto'
		},
		{
			title: 'Name',
			key: 'name',
			width: 'auto',
			render(row, index) {
				return h(
					NTag,
					{ type: 'primary', size: 'small' },
					() => row.name
				)
			}
		},
		{
			title: 'Address',
			key: 'address',
			width: 'auto'
		},
		{
			title: 'Age',
			key: 'age',
			width: 'auto'
		},
		{
			title: 'Action',
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
									title: 'Model'
								})
							}
						},
						{ default: () => 'Edit' }
					),
					h(
						NButton,
						{
							strong: true,
							quaternary: true,
							type: 'error',
							size: 'small',
							onClick: () => {
								window.$dialog.confirm({
									title: 'tips',
									content: '11111'
								})
							}
						},
						{ default: () => 'Delete' }
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

<style></style>
