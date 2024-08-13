import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'
import { dateZhCN, zhCN } from 'naive-ui'
import {
	defaultLayout,
	defaultPrimaryColor,
	naiveThemeOverrides
} from '@/settings'

export const useAppStore = defineStore('app', {
	state: () => ({
		collapsed: false,
		isDark: useDark(),
		local: null,
		dateLocal: null,
		language: '',
		layout: defaultLayout,
		primaryColor: defaultPrimaryColor,
		naiveThemeOverrides
	}),
	actions: {
		switchCollapsed() {
			this.collapsed = !this.collapsed
		},
		setCollapsed(b) {
			this.collapsed = b
		},
		toggleDark() {
			this.isDark = !this.isDark
		},
		toggleLanguage(language) {
			this.language = language
			document.querySelector('html').setAttribute('lang', language)
			if (language === 'zh') {
				this.local = zhCN
				this.dateLocal = dateZhCN
			} else {
				this.local = null
				this.dateLocal = null
			}
		},
		setLayout(v) {
			this.layout = v
		},
		setPrimaryColor(color) {
			this.primaryColor = color
		},
		setThemeColor(color = this.primaryColor, isDark = this.isDark) {
			const colors = generate(color, {
				list: true,
				dark: isDark
			})
			document.body.style.setProperty(
				'--primary-color',
				getRgbStr(colors[5])
			)
			this.naiveThemeOverrides.common = Object.assign(
				this.naiveThemeOverrides.common || {},
				{
					primaryColor: colors[5],
					primaryColorHover: colors[4],
					primaryColorSuppl: colors[4],
					primaryColorPressed: colors[6]
				}
			)
		}
	},
	persist: {
		paths: [
			'collapsed',
			'local',
			'dateLocal',
			'language',
			'layout',
			'primaryColor',
			'naiveThemeOverrides'
		],
		storage: sessionStorage
	}
})
