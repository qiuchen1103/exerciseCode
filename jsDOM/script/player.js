function createVideoControls() {
	var vids = document.getElementsByTagName('video');
	for (var i = 0; i < vids.length; i++) {
		addControls(vids[i]);
	}
}

function addControls(vid) {
	vid.removeAttribute('control');//删除内置控件

	vid.height = vid.videoHeight;
	vid.width = vid.videoWidth;//为什么这里不用px？
	vid.parentNode.style.height = vid.videoHeight + "px";
	vid.parentNode.style.width = vid.videoWidth + "px";

	var controls = document.createElement("div");
	controls.setAttribute("class","controls");

	var play = document.createElement("button");
	play.setAttribute("title","play");
	play.innerHTML = "&#x25BA";//开始、暂停按钮

	controls.appendChild(play);
	vid.parentNode.insertBefore(controls,vid);

	//给开始、暂停按钮添加事件
	play.onclick = function() {
		if (vid.ended) {
			cid.currentTime = 0;
		}//结束时，返回开头
		if (vid.paused) {
			vid.play();
		}
		else {
			vid.paused();
		}
	}
}

vid.addEventListener("play",function() {
	play.innerHTML = "&#x2590;&#x2590;";
	play.setAttribute("paused",true);
},false);
vid.addEventListener("pause",function() {
	play.removeAttribute("paused");
	play.innerHTML = "&#x25BA;";
},false);
vid.addEventListener("ended",function() {
	vid.paused();
},false);

window.onLoad = funtion() {
	createVideoControls();
}