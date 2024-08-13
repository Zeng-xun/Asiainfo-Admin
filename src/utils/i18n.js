import { createI18n } from 'vue-i18n'
import { zhCN, enUS } from 'naive-ui'

const loadLocaleMessages = () => {
	const locales = import.meta.glob('../lang/*.json')
	const messages = {}

	Object.keys(locales).forEach(path => {
		const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
		if (matched && matched.length > 1) {
			const locale = matched[1]

			locales[path]().then(module => {
				switch (locale) {
					case 'en':
						messages[locale] = {
							...module,
							...enUS
						}
						break
					case 'zh':
						messages[locale] = {
							...module,
							...zhCN
						}
						break
					default:
						break
				}
			})
		}
	})

	return messages
}

const messages = loadLocaleMessages()

export const i18n = createI18n({
	locale: 'en',
	legacy: false,
	globalInjection: true,
	// silentTranslationWarn: false,
	// missingWarn: false,
	// silentFallbackWarn: false,
	// fallbackWarn: false,
	messages
})

export function setupI18n(app) {
	app.use(i18n)
	console.log('i18n.js installed')
}
