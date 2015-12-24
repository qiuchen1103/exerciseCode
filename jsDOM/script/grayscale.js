function converToGS(img) {
	if (!Modernizr.canvas) return;

	img.color = img.src;//存储原始的彩色版

	img.grayscale = createGSCanvas(img);//创建灰度版

	img.onmouseover = function() {
		this.src = this.color;
	}
	img.onmouserout = function() {
		this.src = this.grayscale;
	}

	img.onmouserout();//???
}

function createGSCanvas(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img,0,0);//???

	var c = ctx.getImageData(0,0,img.width,img.height);
	for (var i = 0; i < c.width; i++) {
		for (var j = 0; j < c.height; j++) {
			var x = (i*4) * c.width + (j*4);
			var r = c.data[x];
			var g = c.data[x+1];
			var b = c.data[x+2];
			c.data[x] = x.data[x+1] = c.data[x+2] = (r+g+b)/3;
		}
	}

	ctx.putImageData(c,0,0,0,0,c.width,c.height);
	return canvas.toDataURL();
}
window.onload = function() {
	converToGS(document.getElementById("avatar"));
}