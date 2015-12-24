function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0]) {
			return unescape(aCrumb[1]);
		}
	}
	return null;
}

addLoadEvent(tipCookie);//判断是否要显示提示条
addLoadEvent(carousel);//轮播图
addLoadEvent(followCookie);//关注cookie判断
addLoadEvent(defaultPage);//默认显示产品设计课程第一页
addLoadEvent(ranking);//排行榜
addLoadEvent(hoverCourse);//课程卡片

var mask = document.getElementById("mask");

// 提示条动作开始*****
//判断是否要显示提示条
var tip = document.getElementById("tip");
var noAlert = document.getElementById("noAlert");
function tipCookie() {
	// 判断有无提示条cookie,有则隐藏TIP
	var tipCoo = GetCookie("noAlertTip");
	if (tipCoo == "noAlertTip") {
		tip.style.display = "none";
	};
}
// 点击“不再提示”
noAlert.addEventListener("click",function(){
	//隐藏TIP
	tip.style.display = "none";
	// 加cookie
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+30);//cookie保存30天
	document.cookie = "noAlertTip=noAlertTip;expires="+oDate;
});
// 提示条动作结束*****



// 轮播图开始*****
function carousel() {
	var carousel = document.getElementById('carousel');    
    // 获取全部指示器元素
	var ol = carousel.getElementsByTagName('ol')[0]; 
	var olli = ol.getElementsByTagName('li');
	// 获取全部图片元素
	var img = carousel.getElementsByTagName('a');
	
	var now = 0;
	var auto = setInterval(run,5000);
	carousel.addEventListener("mouseover",function() {//鼠标停留停止自动
		clearInterval(auto);
	});
	carousel.addEventListener("mouseout",function() {//鼠标移开恢复自动
		auto = setInterval(run,5000);
	});
	//自动轮播
	function run(){
		if(now == img.length-1){//当前图为最后一幅图时,下一步返回第一张
			now = 0;
		}
		else{
			now++;
		}
		// 先隐藏全部图片
		for(var i = 0;i < olli.length; i++){
			olli[i].className = "";
			img[i].style.display = "none";
			img[i].style.opacity = 0;
		}
		//再设置当前图片
		olli[now].className = 'active';
		img[now].style.display = "block";//当前图片
		fadeIn(img[now]);//淡入动画效果	
	}
	//手动轮播
	for (var i = 0; i < olli.length; i++) {
		olli[i].index = i;
		olli[i].addEventListener("mouseover",function() {
			// 先隐藏全部图片
			for (var i = 0; i < olli.length; i++) {	
				olli[i].className = "";
				img[i].style.display = "none";
				img[i].style.opacity = 0;
			};
			//再设置当前图片
			this.className = "active";//当前指示器
			img[this.index].style.display = "block";//当前图片
			fadeIn(img[this.index]);//淡入动画效果
		});
	};

}
// 淡入动画
function fadeIn(obj){
		var iCur = 0;
		//当透明度为1时，停止动画
		if (iCur = 100) {
			clearInterval(obj.timer);
		};				
		obj.timer = setInterval(function(){				
			iCur += 10;
			obj.style.opacity = iCur/100;
			obj.style.filter = "alpha(opacity="+iCur+")";//兼容IE			
		},50);	
}	
// 轮播图结束*****




// 关注+登录开始*****
var focus = document.getElementById("focus");
var followed = document.getElementById("followed");
var closeLog = document.getElementById("closeLog");
var loginPos = document.getElementById("loginPos");
var login = document.getElementById("login");
//页面加载后检查是否已关注
function followCookie() {
	var followCoo = GetCookie("followSuc");
	if (followCoo == "followSuc") {		
		focus.style.display = "none";
		followed.style.display = "inline-block";
	} 
}
//关注按钮点击事件
focus.addEventListener("click",function() {
	// 判断有无登录cookie
	var loginCoo = GetCookie("loginSuc");
	//无登录cookie时，弹出登录框
	if (loginCoo == null) {
		mask.style.display = "inline-block";
		loginPos.style.display = "inline-block";
		// 给伪提交按钮注册提交事件
		var submit = document.getElementById("submit");
		submit.addEventListener("click",function() {			
			//ajax
			var usernameVal = document.getElementById("username").value;
			var passwordVal = document.getElementById("password").value;
			var result = document.getElementById("result");
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {//IE56
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.open("GET","http://study.163.com/webDev/login.htm?userName="+hex_md5(usernameVal)+"&password="+hex_md5(passwordVal),true);
			xhr.send();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					if (xhr.responseText == 0) {
						result.innerHTML = "用户名或密码错误";
					} else if (xhr.responseText == 1){
						result.innerHTML = "匹配成功，请稍等";
						// 登录成功后
						//设置登录cookie
						var oDate = new Date();
						oDate.setDate(oDate.getDate()+30);
						document.cookie = "loginSuc=loginSuc;expires="+oDate;					
						//关闭登录页面
						mask.style.display = "none";
						loginPos.style.display = "none";
						//关注
						follow();
					}
				}
			};			
		});
	};	
});
//关注
function follow() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {//IE56
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET","http://study.163.com/webDev/attention.htm",true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (xhr.responseText == 1) {
				//设置关注cookie
				var oDate = new Date();
				oDate.setDate(oDate.getDate()+30);
				document.cookie = "followSuc=followSuc;expires="+oDate;
				// 改变关注样式
				focus.style.display = "none";
				followed.style.display = "inline-block";
			}
		}
	}
}
// 关闭登录框
closeLog.addEventListener("click",function() {
	mask.style.display = "none";
	loginPos.style.display = "none";
});
// 关注+登录结束*****




// 视频开始*****
var videoImg = document.getElementById("videoImg");
var videoPos = document.getElementById("videoPos");
var video = document.getElementsByTagName("video")[0];
var closeVideo = document.getElementById("closeVideo");
// 打开
videoImg.addEventListener("click",function() {
	mask.style.display = "inline-block";
	videoPos.style.display = "inline-block";
	video.load();
	video.play();
});
//关闭
closeVideo.addEventListener("click",function() {
	mask.style.display = "none";
	videoPos.style.display = "none";
	video.pause();
});
// 视频结束*****




// tab切换开始*****
function defaultPage() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {//IE56
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10",true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var jsonData = xhr.responseText;
			var jsonObj = JSON.parse(jsonData);
			//显示课程、页码
			showCourse(jsonObj);
			// 给页码注册事件
			pageEvent("Desi");
		}	
	}		
}

var tabDesi = document.getElementById("tabDesi");
var tabLang = document.getElementById("tabLang");

tabDesi.addEventListener("click",function() {
	//更改tab样式
	tabDesi.className = "selection";
	tabLang.className = "";
	//ajax
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {//IE56
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10",true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var jsonData = xhr.responseText;
			var jsonObj = JSON.parse(jsonData);
			//显示课程、页码
			showCourse(jsonObj);
			// 给页码注册事件
			pageEvent("Desi");
		}	
	}			
});

tabLang.addEventListener("click",function() {
	//更改tab样式
	tabDesi.className = "";
	tabLang.className = "selection";
	//ajax
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {//IE56
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=20",true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var jsonData = xhr.responseText;
			var jsonObj = JSON.parse(jsonData);
			//显示课程、页码
			showCourse(jsonObj);
			// 给页码注册事件
			pageEvent("Lang");
		}	
	}		
});


//显示课程、页码
var courseList = document.getElementsByClassName("courseList")[0];
var courseH = courseList.getElementsByClassName("courseH");
var author = courseList.getElementsByClassName("author");
var learnerCount = courseList.getElementsByClassName("learnerCount");
var price = courseList.getElementsByTagName("b");
var courseImg = courseList.getElementsByClassName("courseImg");
   //hoverBox
var hoverH = courseList.getElementsByClassName("hoverH");
var hoverBoxAuthor = courseList.getElementsByClassName("hoverBoxAuthor");
var hoverBoxLearnerCount = courseList.getElementsByClassName("hoverBoxLearnerCount");
var categoryName = courseList.getElementsByClassName("categoryName");
var hoverBoxCourseImg = courseList.getElementsByClassName("hoverBoxCourseImg");
var description = courseList.getElementsByClassName("description");

  //page
var course = document.getElementById("course");
var courseNavOl = course.getElementsByTagName("ol")[0];

function showCourse(obj) {
	var allCourse = obj.list;
	//显示课程(第一页)
	for (var i = 0; i < allCourse.length; i++) {//遍历所有获取的课程
		courseH[i].innerHTML = allCourse[i].name;	//对应标题	
		author[i].innerHTML = allCourse[i].provider;//对应发布机构
		learnerCount[i].innerHTML = allCourse[i].learnerCount;//对应在学人数
		price[i].innerHTML = "￥"+allCourse[i].price;//对应价格
		courseImg[i].style.backgroundImage = "url("+allCourse[i].middlePhotoUrl+")";//对应图片

		hoverH[i].innerHTML = allCourse[i].name;
		hoverBoxAuthor[i].innerHTML = allCourse[i].provider;
		hoverBoxLearnerCount[i].innerHTML = allCourse[i].learnerCount;
		categoryName[i].innerHTML = allCourse[i].categoryName;
		description[i].innerHTML = allCourse[i].description;
		hoverBoxCourseImg[i].style.backgroundImage = "url("+allCourse[i].middlePhotoUrl+")";

	};
	//显示页码
	var AllPage = obj.pagination.totlePageCount;
	courseNavOl.innerHTML = '<li><a class="back">&lt;</a></li>';//先把上一页写上...
	
	for (var i = 1; i < AllPage+1; i++) {//中间写上全部页码	
		var courseNavOlLi = document.createElement("li");
		// if (i=1) {
		// 	courseNavOlLi.className = "selection";
		// };//有bug？？？why？？？
		courseNavOlLi.innerHTML = '<a class="nav">'+i+'</a>';		
		courseNavOl.appendChild(courseNavOlLi);
		
	};
	
	var courseNavOlLastLi = document.createElement("li");
	courseNavOlLastLi.innerHTML = '<a class="forward">&gt;</a>';
	courseNavOl.appendChild(courseNavOlLastLi);//最后把下一页写上...

	return;
}
//给页码注册事件
function pageEvent(courseName) {
	//数字	
	var allNav = document.getElementsByClassName("nav");
	for (var i = 1; i < allNav.length+1; i++) {
		// alert(i);
		allNav[i-1].addEventListener("click",function() {
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {//IE56
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (courseName == "Desi") {
				xhr.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo="+i+"&psize=20&type=10",true);
			} else if (courseName == "Lang") {
				xhr.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo="+i+"&psize=20&type=20",true);
			}	// 为什么每个都注册成最后一个i了啊？？？
			xhr.send();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var jsonData = xhr.responseText;
					var jsonObj = JSON.parse(jsonData);
					//显示课程、页码
					showCourse(jsonObj);
					// // 给页码注册事件
					// pageEvent();
					// 啊啊啊啊啊！！！怎样给页码这里点过去的页面的页码再注册事件？？？
				}	
			}
		});
	};
}
// tab切换结束*****

// 最热排行开始*****
var rankingList = document.getElementById("rankingList");
var rankingTitle = rankingList.getElementsByTagName("h4");
var rankingCount = rankingList.getElementsByClassName("countAll");
var rankingImg = rankingList.getElementsByClassName("courseImgMini");


function ranking() {
	var timer = setInterval(function() {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {//IE56
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}		
		xhr.open("GET","http://study.163.com/webDev/hotcouresByCategory.htm",true);		
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var jsonData = xhr.responseText;
				var jsonObj = JSON.parse(jsonData);
				for (var i = 0; i < jsonObj.length; i++) {
					rankingTitle[i].innerHTML = jsonObj[i].name;//对应课程名称  报错？？？
					rankingCount[i].innerHTML = jsonObj[i].learnerCount;//对应课程价格

					rankingImg[i].style.backgroundImage = "url("+jsonObj[i].smallPhotoUrl+")";
				};			
			};
		}
	},5000);
}

// 最热排行结束*****

// 课程卡片开始*****
var courseBox = document.getElementsByClassName("courseBox");
var hoverBox = document.getElementsByClassName("hoverBox");


function hoverCourse() {
	for (var i = 0; i < courseBox.length; i++) {	

		courseBox[i].index = i;

		courseBox[i].addEventListener("mouseover",function() {
			hoverBox[this.index].style.display = "inline-block";		
		});
		courseBox[i].addEventListener("mouseout",function() {
			hoverBox[this.index].style.display = "";	
		});
	};
}

// 课程卡片结束*****
