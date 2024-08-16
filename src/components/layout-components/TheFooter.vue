<template>
	<footer class="f-c-c text-14 text-gray-500">
		<p>
			{{ $t('copyright', [2024]) }}
			<a
				href=""
				target="__blank"
				class="transition"
				hover="decoration-underline color-primary"
			>
				{{ $t(`${title}`) }}
			</a>
		</p>
	</footer>
</template>

<script setup>
	const title = import.meta.env.VITE_I18N_CODE
</script>
