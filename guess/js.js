
// 取得三个可选图案
var s1 = document.getElementById("select1");
var s2 = document.getElementById("select2");
var s3 = document.getElementById("select3");
// 取得三个结果元素
var mine = document.getElementById("mine");
var cpt = document.getElementById("cpt");
var result1 = document.getElementById("result1");
// 取得统计数据
var count1 =document.getElementById("count1");
var cnt = 0;

// 石头点击事件	
s1.addEventListener("click",function() {
	mine.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg");			
	guest("st");
});
// 剪刀点击事件	
s2.addEventListener("click",function() {
	mine.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg");
	guest("jd");
});
// 剪刀点击事件	
s3.addEventListener("click",function() {
	mine.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg");
	guest("bu");
});

// 电脑出拳
function guest(mySlt) {
	var ran = Math.round( Math.random()*2 );
	var mySelect = mySlt;
	// 石头
	if (ran == 0) {
		cpt.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg");	
		judge(mySelect,"st");
	};
	// 剪刀
	if (ran == 1) {
		cpt.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg");		
		judge(mySelect,"jd");
	};
	// 布
	if (ran == 2) {
		cpt.setAttribute("src","https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg");	
		judge(mySelect,"bu");
	};
}
// 裁判
function judge(selectA,selectB) {
	if (selectA == selectB) {
		result1.innerHTML="平局啊";
	};
	if ( (selectA=="st"&&selectB=="jd") || (selectA=="jd"&&selectB=="bu") || (selectA=="bu"&&selectB=="st") ) {
		result1.innerHTML="你赢了";
		cnt += 1;
		count1.innerHTML=cnt;
	};
	if ( (selectA=="st"&&selectB=="bu") || (selectA=="jd"&&selectB=="st") || (selectA=="bu"&&selectB=="jd") ) {
		result1.innerHTML="你输了";
	};
}


