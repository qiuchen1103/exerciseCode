addLoadEvent(displayAbbreviations);

function displayAbbreviations() {
    //兼容检查
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;


	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length < 1) return false;//如果文档里没有abbr，则函数到此结束

    var defs = new Array();
    //提取title为数组
    for (var i = 0; i < abbreviations.length; i++) {
    	var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1 ) continue;//IE退化
    	var defintion = current_abbr.getAttribute("title");
    	var key = current_abbr.firstChild.nodeValue;
    	defs[key] = defintion;
    }

    //创建dl
    var dlist = document.createElement("dl");
    for (key in defs) {//defs的下标值传递给key（为什么是下标值？）（这里的key是全局变量吗？）
    	var defintion = defs[key];
    	
        //创建dt
    	var dtitle = document.createElement("dt");
    	var dtitle_text = document.createTextNode(key);
    	dtitle.appendChild(dtitle_text);

        //创建dd
    	var ddesc=document.createElement("dd");
    	var ddesc_text = document.createTextNode(defintion);
    	ddesc.appendChild(ddesc_text);

    	dlist.appendChild(dtitle);
    	dlist.appendChild(ddesc);
    }
    //if (dilst.childNodes.length < 1) return false;//IE退化 (添加了这句就无法跑代码，WHY？)

    //创建总标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);

    document.body.appendChild(header);
    document.body.appendChild(dlist);
}