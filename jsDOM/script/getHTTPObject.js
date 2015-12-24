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


//兼容版
function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined") 
		XMLHttpRequest = function() {
			try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e) {}
			return false;
		}
	return new XMLHttpRequest();
}


function getNewContent() {
	var request = getHTTPObject();
	if (request) {
		
		request.open("GET","example.txt",true);//发起GET请求
		
		request.onreadystatechange = function() {
		//在服务器给XMLHttpRequest对象送回响应时触发
			if (request.readyState == 4) {
			//0-未初始化，1-正在加载，2-加载完毕，3-正在交互，4-完成
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById("new").appendChild(para);
			}
		}
	request.send(null);//发送请求
	}
	else {
		alert("Sorry,your browser doesn\'t support XMLHttpRequest");
	}
}
addLoadEvent(getNewContent);