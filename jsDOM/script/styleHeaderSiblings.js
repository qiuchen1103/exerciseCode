addLoadEvent(styleHeaderSiblings);

function styleHeaderSiblings() {
	if (!document.getElementsByTagName) return false;

	var headers = document.getElementsByTagName("h1");

	var elem;
	for (var i = 0; i < headers.length; i++) {
		elem = getNextElement(headers[i].nextSibling);
		elem.style.fontWeight = "bold";
		elem.style.fontSize = "1.2em"
	}
}

//获取下一个元素节点
function getNextElement(node) {
	if (node.nodeType == 1) {//元素节点
		return node;
	}
	if (node.nextSibling) {//如存在下一个节点，接着判断是否元素节点
		return getNextElement(node.nextSibling);
	}
	return null;
}