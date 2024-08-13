import { $get, $post } from '@/utils'

export default {
	login: data =>
		$post({
			url: 'owner/user/login',
			data
		}),
	generateCode: data =>
		$get({
			url: 'gen/user/generateCode',
			data
		}),
	testApi: data =>
		$post({
			url: 'owner/service/queryServiceList',
			data
		})
}
