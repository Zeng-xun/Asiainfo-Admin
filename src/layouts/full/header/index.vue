<template>
	<AppCard
		class="flex items-center px-12"
		border-b="1px solid light_border dark:dark_border"
	>
		<MenuCollapse />

		<BreadCrumb />

		<div class="ml-auto flex flex-shrink-0 items-center px-12 text-18">
			<ToggleTheme />

			<LanguageSwitch />

			<LayoutSetting />

			<Fullscreen />

			<ThemeSetting class="mr-16" />

			<UserAvatar />
		</div>
	</AppCard>
</template>

<script setup>
	import { ToggleTheme, LanguageSwitch } from '@/components'
	import {
		BreadCrumb,
		Fullscreen,
		MenuCollapse,
		UserAvatar
	} from '@/layouts/components'
</script>
