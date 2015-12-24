//window.onload绑定多个函数
function addLoadEvent(func){
	//现有的onload事件存入变量oldonload
	var oldonload = window.onload;

	//如果onload上未绑定函数，则像平时一样直接添加新函数
	if (typeof window.onload != "function") {
		window.onload = func;
	}

	//如果onload上已绑定函数，就把新函数追加到现有函数末尾
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}


//insertAfter函数
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


//创建换图节点
function preparePlaceholder() {
	//检查
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;

	//创建图片占位节点
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");

	//创建描述文本节点
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);

	//插入节点
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);

}


//换图挂钩
function prepareGallery() {
	//检查
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;

	//挂钩	
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this) ? false : true;
			//判断是否成功切换图片（会调用showPic()）
			//成功则返回false，阻止默认行为
			//失败则返回true，允许默认行为
		}
	}
}


//换图方法
function showPic(whichpic){
	//换图片
	if (!document.getElementById("placeholder")) return false;//检查
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") return false;//检查
	placeholder.setAttribute("src",source);


	//换描述文字
	//可选功能
	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";//检查并赋值
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {//检查
			description.firstChild.nodeValue = text;
		};	
	}
	return true;
} 

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);