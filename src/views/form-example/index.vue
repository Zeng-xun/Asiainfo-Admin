<template>
	<CommonPage>
		<n-form
			:model="nformModel"
			:rules="nformRules"
		>
			<n-grid
				:x-gap="10"
				:y-gap="10"
			>
				<n-form-item-gi
					span="8"
					:label="$t('common.user_name')"
				>
					<n-input v-model:value="nformModel.name"></n-input>
				</n-form-item-gi>
				<n-form-item-gi
					span="8"
					:label="$t('common.age')"
				>
					<n-input v-model:value="nformModel.age"></n-input>
				</n-form-item-gi>
				<n-form-item-gi
					span="8"
					:label="$t('common.email')"
				>
					<n-input v-model:value="nformModel.email"></n-input>
				</n-form-item-gi>
				<n-form-item-gi
					span="8"
					:label="$t('common.address')"
				>
					<n-input v-model:value="nformModel.address"></n-input>
				</n-form-item-gi>
			</n-grid>
		</n-form>
	</CommonPage>
</template>

<script setup>
	import { ref } from 'vue'

	const nformModel = ref({
		name: '',
		age: '',
		email: '',
		address: ''
	})
	const nformRules = ref({})
</script>

<style></style>
