import { $get, $post } from '@/utils'

export default {
	login: data =>
		$post({
			url: 'mock/login',
			data
		}),
	getList: data =>
		$post({
			url: 'mock/getList',
			data
		})
}
