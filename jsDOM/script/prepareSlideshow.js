addLoadEvent(prepareSlideshow);

function prepareSlideshow() {
	//创建DIV标签
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	//创建IMG标签
    var preview = document.createElement("img");
    preview.setAttribute("src","images/flash.jpg");
    preview.setAttribute("alt","building blocks of web design");
    preview.setAttribute("id","preview");
    //插入标签
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist");
    insertAfter(slideshow,list);

    //检查
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("linklist")) return false;
	if (!document.getElementById("preview")) return false;

	


	var list = document.getElementById("linklist");
	var links = list.getElementsByTagName("a");

	links[0].onmouseover = function() {
		moveElement("preview",-169,0,1);
	}
	links[1].onmouseover = function() {
		moveElement("preview",-337,0,1);
	}
	links[2].onmouseover = function() {
		moveElement("preview",-521,0,1);
	}
}
