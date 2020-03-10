// 解析url参数,返回值是对象
export function urlParse() {
	let obj = {};
	let reg = /[?&][^?&]+=[^?&%]+/g;
	let url = window.location.search;
	let arr = url.match(reg);
	if(arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		})
	}
	return obj;
}