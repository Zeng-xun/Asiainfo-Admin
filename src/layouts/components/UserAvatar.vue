<template>
	<n-dropdown
		:options="options"
		@select="handleSelect"
	>
		<div class="flex cursor-pointer items-center">
			<n-avatar
				round
				:size="36"
				:src="userStore.avatar"
			/>
			<div
				v-if="userStore.userInfo"
				class="ml-12 flex-col flex-shrink-0 items-center"
			>
				<span class="text-14">{{
					userStore.nickName ?? userStore.username
				}}</span>
				<!-- <span class="text-12 opacity-50"
					>[{{ userStore.currentRole?.name }}]</span
				> -->
			</div>
		</div>
	</n-dropdown>

	<RoleSelect ref="roleSelectRef" />
</template>

<script setup>
	import { useAuthStore, usePermissionStore, useUserStore } from '@/store'
	import { RoleSelect } from '@/layouts/components'
	import { useI18n } from 'vue-i18n'
	// import api from '@/api'

	const router = useRouter()
	const userStore = useUserStore()
	const authStore = useAuthStore()
	const permissionStore = usePermissionStore()
	const { t } = useI18n()

	const options = reactive([
		{
			label: '个人资料',
			key: 'profile',
			icon: () =>
				h('i', { class: 'i-material-symbols:person-outline text-14' }),
			show: computed(() =>
				permissionStore.accessRoutes?.some(
					item => item.path === '/profile'
				)
			)
		},
		{
			label: '切换角色',
			key: 'toggleRole',
			icon: () => h('i', { class: 'i-basil:exchange-solid text-14' }),
			show: computed(() => userStore.roles.length > 1)
		},
		{
			label: t('operate.logout'),
			key: 'logout',
			icon: () => h('i', { class: 'i-mdi:exit-to-app text-14' })
		}
	])

	const roleSelectRef = ref(null)
	function handleSelect(key) {
		switch (key) {
			case 'profile':
				router.push('/profile')
				break
			case 'toggleRole':
				roleSelectRef.value?.open({
					onOk() {
						location.reload()
					}
				})
				break
			case 'logout':
				$dialog.confirm({
					title: t('common.tips'),
					type: 'info',
					content: t('confirm.logout_confirm'),
					async confirm() {
						try {
							// await api.logout()
						} catch (error) {
							console.error(error)
						}
						authStore.logout()
						$message.success(t('operate.logout'))
					}
				})
				break
		}
	}
</script>
