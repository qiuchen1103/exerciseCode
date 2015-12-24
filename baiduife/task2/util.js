// //1
// // 判断arr是否为一个数组，返回一个bool值
// function isArray(arr){
// 	var t = arr.constructor === Array;
// 	return t;
// }
// var a = isArray("1233");
// alert(a);
// // 判断fn是否为一个函数，返回一个bool值
// function isFunction(fn){
// 	var i = fn.constructor === Function;
// 	return i;
// }
// var b = isFunction("1233");
// alert(b);

// //2
// // 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// // 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
// //不会...

// //3
// // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// function uniqArray(arr) {
// 	var SORT = arr.sort();
// 	for (var i = 0; i < SORT.length; i++) {
// 		var INDEX = indexOf(SORT[i],i+1);     //从当前项开始查找与当前项重复的项的位置(error?)
// 		if (INDEX == -1) {
// 			continue;						  //未找到，则进入下个循环
// 		}else{
// 			SORT.splice(INDEX,1);			  //找到，则删除该位置的项
// 			i--;							  //抵消i++，目的为再查找一次当前项
// 		}
// 	};
// 	return SORT;
	
// }
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]

// //4
// //(不是有自带的trim方法吗？)
// // 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// // 假定空白字符只有半角空格、Tab
// // 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
// function simpleTrim(str) {
//     return str.trim();
// }
// // 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// // 尝试使用一行简洁的正则表达式完成该题目
// function trim(str) {
//     // your implement
// }
// var str = '   hi!  ';
// str = trim(str);
// console.log(str); // 'hi!'


//5
//无法输出位置序号？？
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {	
	arr.forEach(fn);  
}
// 其中fn函数可以接受两个参数：item和index
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

//6???
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {

}
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

//7
// 判断是否为邮箱地址
function isEmail(emailStr) {
    
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
    var text = toString(emailStr);
    if( pattern.test(text) ) {
    	alert("是邮箱")
    }else{
    	alert("不是邮箱")
    }
}
// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
    var text = toString(phone);
    if( pattern.test(text) ) {
    	alert("是手机号")
    }else{
    	alert("不是手机号")
    }
}