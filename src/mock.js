import Mock from 'mockjs'
import mockData from '../data.json'

// const Random = Mock.Random
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
	timeout: '300-600'
})

const seller = mockData.seller;
const goods = mockData.goods;
const ratings = mockData.ratings;

// 获取商品信息
function getSeller(options) {
	return {
		errorNo: '0',
		data: seller
	}
}

function getGoods(options) {
	return {
		errorNo: '0',
		data: goods
	}
}

function getRatings(options) {
	return {
		errorNo: '0',
		data: ratings
	}
}
Mock.mock(RegExp('/seller' + ".*"), 'get', getSeller);
Mock.mock('/goods', 'post', getGoods);
Mock.mock('/ratings', 'get', getRatings);
// 最后将 Mock 导出
export default Mock