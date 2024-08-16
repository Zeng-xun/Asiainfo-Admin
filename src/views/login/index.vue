<template>
	<div class="wh-full flex-col bg-cover">
		<div
			class="m-auto max-w-700 min-w-345 f-c-c rounded-8 bg-opacity-20 bg-cover p-12 card-shadow auto-bg"
		>
			<div class="hidden w-380 px-20 py-35 md:block">
				<img
					src="@/assets/images/login_banner.webp"
					class="w-full"
					alt="login_banner"
				/>
			</div>

			<div class="w-320 flex-col px-20 py-32">
				<h2 class="f-c-c text-24 text-#6a6a6a font-normal">
					<img
						src="@/assets/images/logo.png"
						class="mr-12 h-50"
					/>
					{{ $t(`${title}`) }}
				</h2>
				<n-input
					v-model:value="loginInfo.username"
					autofocus
					clearable
					class="mt-32 h-40 items-center"
					:placeholder="$t('authentication.user_name_input')"
				>
					<template #prefix>
						<i class="i-fe:user mr-12 opacity-20" />
					</template>
				</n-input>
				<n-input
					v-model:value="loginInfo.password"
					class="mt-20 h-40 items-center"
					type="password"
					show-password-on="mousedown"
					clearable
					:placeholder="$t('authentication.password_input')"
					@keydown.enter="handleLogin()"
				>
					<template #prefix>
						<i class="i-fe:lock mr-12 opacity-20" />
					</template>
				</n-input>

				<div class="mt-20 flex items-center gap-10">
					<n-input
						v-model:value="loginInfo.captcha"
						class="h-40 items-center"
						:placeholder="
							$t('authentication.verification_code_input')
						"
						:maxlength="4"
						@keydown.enter="handleLogin()"
					>
						<template #prefix>
							<i class="i-fe:key mr-12 opacity-20" />
						</template>
					</n-input>
					<canvas
						id="verfication-code-canvas"
						class="h-40"
					></canvas>
				</div>

				<n-checkbox
					class="mt-20"
					:checked="isRemember"
					:label="$t('authentication.remember_me')"
					:on-update:checked="val => (isRemember = val)"
				/>

				<div class="mt-20 flex items-center">
					<n-button
						class="h-40 flex-1 rounded-5 text-16"
						type="primary"
						:loading="loading"
						@click="handleLogin()"
					>
						{{ $t('operate.login') }}
					</n-button>
				</div>
			</div>
		</div>

		<TheFooter class="py-12" />
	</div>
</template>

<script setup>
	import { useStorage } from '@vueuse/core'
	import mockApi from '@/api/mock'
	import { lStorage, throttle } from '@/utils'
	import { useAuthStore, useUserStore } from '@/store'
	import { onMounted } from 'vue'
	import { useI18n } from 'vue-i18n'

	const authStore = useAuthStore()
	const router = useRouter()
	const route = useRoute()
	const title = import.meta.env.VITE_I18N_CODE
	const { t } = useI18n()

	const loginInfo = ref({
		username: 'admin',
		password: '123456',
		captcha: '7798'
	})

	const localLoginInfo = lStorage.get('loginInfo')
	if (localLoginInfo) {
		loginInfo.value.username = localLoginInfo.username || ''
		loginInfo.value.password = localLoginInfo.password || ''
	}
	onMounted(() => {
		initCaptcha()
	})

	function initCaptcha() {
		const code = '7798'
		const canvas = document.getElementById('verfication-code-canvas')
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.font = '100px Helvetica'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = '#f0f0f0'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		// 添加彩色干扰线
		for (let i = 0; i < 20; i++) {
			const startX = Math.random() * canvas.width
			const startY = Math.random() * canvas.height
			const endX = Math.random() * canvas.width
			const endY = Math.random() * canvas.height
			const color = `rgb(${Math.random() * 255}, ${
				Math.random() * 255
			}, ${Math.random() * 255})`
			ctx.strokeStyle = color
			ctx.beginPath()
			ctx.moveTo(startX, startY)
			ctx.lineTo(endX, endY)
			ctx.stroke()
		}
		// 生成随机颜色
		for (let i = 0; i < code.length; i++) {
			const color = `rgb(${Math.random() * 255}, ${
				Math.random() * 255
			}, ${Math.random() * 255})`
			ctx.fillStyle = color
			ctx.fillText(code.charAt(i), 30 + i * 60, 80)
		}
	}

	const isRemember = useStorage('isRemember', true)
	const loading = ref(false)
	async function handleLogin() {
		const { username, password, captcha } = loginInfo.value
		if (!username || !password)
			return $message.warning(t('authentication.user_info_required'))
		if (!captcha)
			return $message.warning(
				t('authentication.verification_code_required')
			)
		try {
			loading.value = true
			$message.loading(t('authentication.to_be_verified'), {
				key: 'login'
			})
			const { result } = await mockApi.login({
				account: username,
				password: password.toString(),
				code: captcha
			})
			if (isRemember.value) {
				lStorage.set('loginInfo', { username, password })
			} else {
				lStorage.remove('loginInfo')
			}
			onLoginSuccess(result)
		} catch (error) {
			// xxxx为验证码错误专属业务码
			if (error?.code === 'xxxx') {
				// 为防止爆破，验证码错误则刷新验证码
				initCaptcha()
			}
			$message.destroy('login')
		}
		loading.value = false
	}

	async function onLoginSuccess(data = {}) {
		lStorage.set('userInfo', data)
		authStore.setToken(data)
		$message.loading(t('authentication.logging_in'), { key: 'login' })
		try {
			$message.success(t('message.login_successful'), { key: 'login' })
			console.log(route.query.redirect)
			if (route.query.redirect) {
				const path = route.query.redirect
				delete route.query.redirect
				router.push({ path, query: route.query })
			} else {
				router.push('/')
			}
		} catch (error) {
			console.error(error)
			$message.destroy('login')
		}
	}
</script>
