import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi, setupI18n } from './utils'
import { setupDirectives } from './directives'

import 'default-passive-events'

async function bootstrap() {
	const app = createApp(App)
	setupStore(app)
	setupI18n(app)
	setupDirectives(app)
	await setupRouter(app)
	app.mount('#app')
	setupNaiveDiscreteApi()
}

bootstrap()
