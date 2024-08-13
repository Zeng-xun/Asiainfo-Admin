import { request } from './axios'
import qs from 'qs'

const $http = function ({ url, data, method = 'GET', headers, responseType }) {
	if (method === 'GET') {
		return request.get(
			url,
			{
				params: data,
				paramsSerializer: params => {
					return qs.stringify(params, { indices: false })
				}
			},
			{ headers, responseType }
		)
	}
	if (method === 'POST') {
		return request.post(url, data, { headers, responseType })
	}
	if (method === 'PUT') {
		return request.put(url, data, { headers, responseType })
	}
}

export const $get = function ({
	url,
	data,
	headers,
	responseType,
	beforeRequest = null,
	afterRequest = null
}) {
	return $http({
		url,
		method: 'GET',
		data,
		headers,
		responseType,
		beforeRequest,
		afterRequest
	})
}

export const $post = function ({
	url,
	data,
	headers,
	responseType,
	beforeRequest = null,
	afterRequest = null
}) {
	return $http({
		url,
		method: 'POST',
		data,
		headers,
		responseType,
		beforeRequest,
		afterRequest
	})
}

export const $put = function ({
	url,
	data,
	headers,
	responseType,
	beforeRequest = null,
	afterRequest = null
}) {
	return $http({
		url,
		method: 'PUT',
		data,
		headers,
		responseType,
		beforeRequest,
		afterRequest
	})
}
