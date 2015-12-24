addLoadEvent(hightlightRows);

function hightlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseover = function() {
			this.style.fontWeight = "bold";
		}
		// rows[i].onmouseout = funciton() {
		// 	this.style.fontWeight = "normal";
		// }好像不支持啊...
	};
}