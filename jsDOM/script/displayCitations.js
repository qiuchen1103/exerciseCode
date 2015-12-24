addLoadEvent(displayCitations);

function displayCitations() {
	if (!document.getElementsByTagName) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;

	var quotes = document.getElementsByTagName("blockquote");

	for (var i = 0; i < quotes.length; i++) {
		//提取引用地址
		if (!quotes[i].getAttribute("cite")) continue;
		var url = quotes[i].getAttribute("cite");

		//提取插入位置节点
		var quoteChildren = quotes[i].getElementsByTagName("*");
		//提取所有元素子节点（排除文本节点，换行符可能也是一个文本节点）
		if (quoteChildren.length < 1) continue;
		var elem = quoteChildren[quoteChildren.length - 1];
		//提取最后一个元素子节点

		//创建引用链接（上标a标签）
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);

		//插入引用链接
		elem.appendChild(superscript);
	}
}