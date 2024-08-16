import Mock from 'mockjs'

const baseData = {
	resultCode: '000000',
	success: true
}

const generateRandomUser = () => {
	return {
		userName: 'admin',
		password: '123456',
		id: Mock.Random.guid(),
		nickName: Mock.Random.cname(),
		avatar: Mock.Random.image(
			'200x200',
			Mock.Random.color(),
			'#FFF',
			'Mock Avatar'
		),
		token: Mock.Random.guid(),
		address: Mock.Random.county(true),
		email: Mock.Random.email(),
		status: Mock.mock('@integer(0, 1)')
	}
}

const mockDataCache = []

const mock = [
	{
		url: '/mock/login',
		method: 'post',
		response: options => {
			return {
				...baseData,
				result: generateRandomUser()
			}
			// const { userName, password, captcha } = options
			// if (
			// 	userName === 'admin' &&
			// 	password === '123456' &&
			// 	captcha !== ''
			// ) {
			// 	return {
			// 		...baseData,
			// 		data: generateRandomUser()
			// 	}
			// } else {
			// 	return {
			// 		resultCode: '401',
			// 		success: false,
			// 		message: '用户名或密码错误'
			// 	}
			// }
		}
	},
	{
		url: '/mock/getList',
		method: 'post',
		response: req => {
			const { pageNum = 1, pageSize = 10 } = req.body

			const generateRandomList = count => {
				const data = []
				for (let i = 0; i < count; i++) {
					data.push({
						id: Mock.Random.guid(),
						name: Mock.Random.cname(),
						age: Mock.Random.integer(18, 60),
						address: Mock.Random.county(true),
						email: Mock.Random.email(),
						status: Mock.mock('@integer(0, 1)')
					})
				}
				return data
			}

			const generatePagedData = (pageNum, pageSize) => {
				const total = 100 // 模拟总条目数
				// 如果缓存数据为空，则生成数据
				if (mockDataCache.length === 0) {
					mockDataCache.push(...generateRandomList(total))
				}
				const startIndex = (pageNum - 1) * pageSize
				const endIndex = Math.min(pageNum * pageSize, total)
				const pagedData = mockDataCache.slice(startIndex, endIndex)
				return {
					...baseData,
					total,
					pageNum,
					pageSize,
					result: pagedData
				}
			}

			return generatePagedData(pageNum, pageSize)
		}
	}
]

export default mock
