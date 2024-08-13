export default [
	{
		type: 'MENU',
		id: 2,
		name: 'Table Example',
		code: 'TableExample',
		i18n: 'table_example',
		icon: 'i-fe:table',
		show: true,
		enable: true,
		path: '/table-example',
		layout: null,
		component: '/src/views/table-example/index.vue',
		keepAlive: true,
		order: 1,
		children: []
	},
	{
		type: 'MENU',
		id: 3,
		name: 'Form Example',
		code: 'FormExample',
		i18n: 'form_example',
		icon: 'i-fe:list-bullet',
		show: true,
		enable: true,
		path: '/form-example',
		layout: null,
		component: '/src/views/form-example/index.vue',
		keepAlive: true,
		order: 2,
		children: []
	}
]
