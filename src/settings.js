export const defaultLayout = 'full'

export const defaultPrimaryColor = '#697eff'

// 控制 LayoutSetting 组件是否可见
export const layoutSettingVisible = true

export const naiveThemeOverrides = {
	common: {
		primaryColor: '#697effFF',
		primaryColorHover: '#697effE3',
		primaryColorPressed: '#3550ff',
		primaryColorSuppl: '#697effE3'
	}
}

export const basePermissions = [
	{
		code: 'Home',
		i18n: 'home',
		name: 'home',
		type: 'MENU',
		path: '/',
		icon: 'i-fe:home',
		order: -1,
		enable: true,
		show: true,
		component: () => import('@/views/home/index.vue')
	}
]
