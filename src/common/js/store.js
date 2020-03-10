// 保存数据
export function saveToLocal(id, key, value) {
	// 将商家id, key-不同的属性名, value-属性名的值存入在windows.localStorage._seller_中
	let seller = window.localStorage._seller_;
	
	if (!seller) {
		// 开始若没有创建seller
		seller = {};
		seller[id] = {};
		
	} else {
		// 若window.localStorage._seller_已经有了,
		//读取的值是字符串json,需解析为json对象
		seller = JSON.parse(seller);
		if (!seller[id]) {
			// 判断seller中是否有属性id,没有的话需进行定义
			seller[id] = {};
		}
	}
	// 设置不同id下的key值
	seller[id][key] = value;
	// 存储只能是字符串的值,需将json对象转为字符串
	//储存的localStorage的变量名是:_seller_
	window.localStorage._seller_ = JSON.stringify(seller);
};

//读取数据
export function loadFromLocal(id, key, def) {
	// 商家id,不同属性名,def默认值
	let seller = window.localStorage._seller_;
	if(!seller) {
		//若该变量没有存储在localStorage中,返回一个默认值
		return def;
	}
	// 若有则将读取的json字符串转为json对象
	//并拿取对应的id
	seller = JSON.parse(seller)[id];
	//若取的id为空,则返回默认值
	if(!seller) {
		return def;
	}
	//若不为空,则取对应属性名的值
	let ret = seller[key];
	return ret || def;
};