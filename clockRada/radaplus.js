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

var popCanvas = document.getElementById('popCanvas');
var ctx = popCanvas.getContext('2d');
var linearGradient = null;

var time = new Date();
var rets = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();//一天过去的总秒数
var hours = rets/3600<12 ? rets/3600 : rets/3600-12;
var minutes = (rets - time.getHours() * 3600) / 60;
var seconds = time.getSeconds();
var milliseconds = seconds*1000 + time.getMilliseconds();//一分钟过去的总毫秒数


addLoadEvent(flash);

function flash() {
	var flashInterval = setInterval(function() {
		showTime();//绘制
		runWatch();//跑起
	},
	50);
}


//绘制
function showTime() {

	

	ctx.save();//1原点(0,0)

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色	
	ctx.translate(160,160);
	
						
	//时针

	ctx.save();//2原点(160,160)
	ctx.rotate(30*hours/180*Math.PI);	
	RadialGradient = ctx.createRadialGradient(0,-120,5,0,-120,10);
	RadialGradient.addColorStop(0,'rgba(255,255,255,1)');
	RadialGradient.addColorStop(1,'rgba(0,0,0,0)');
	ctx.fillStyle = RadialGradient;
	ctx.beginPath();
	ctx.arc(0,-120,15,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.restore();//2

	//分针
	ctx.save();//2
	ctx.rotate(30*(minutes/5)/180*Math.PI);	
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.beginPath();
	ctx.arc(0,-120,6,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.restore();//2

	//秒针+渐变
	ctx.save();//2
	ctx.rotate(30*(milliseconds/5000)/180*Math.PI);	
	ctx.fillStyle = 'rgb(255,255,255)';

	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(1,0);
	ctx.lineTo(-1,0);
	ctx.lineTo(-1,-120);
	ctx.lineTo(1,-120);
	ctx.closePath();
	ctx.fill();

	// ctx.rotate(30*(milliseconds/5000)/180*Math.PI);	
	linearGradient = ctx.createLinearGradient(0,-120,-120,80);
	linearGradient.addColorStop(0,'rgba(255,221,84,0.3)');
	linearGradient.addColorStop(1,'rgba(0,0,0,0)');

	// ctx.rotate(30*(milliseconds/5000)/180*Math.PI);
	ctx.fillStyle = linearGradient;
	ctx.beginPath();
	ctx.moveTo(0,0);

	ctx.arc(0,0,120,-(4/3)*Math.PI,-0.5*Math.PI);
	// ctx.fillRect(0,-120,-120,120);
	ctx.closePath();
	ctx.fill();
	ctx.restore();//2
	// linearGradient = null




	//中心红点
	ctx.save();//2
	ctx.fillStyle = 'rgb(255,0,0)';
	ctx.beginPath();
	ctx.arc(0,0,3,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.restore();//2

	ctx.save();//2
	ctx.strokeStyle = 'rgb(255,255,255)';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(0,0,4,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();//2


	ctx.restore();//1
					
}

function runWatch() {	
	time = new Date();
	rets = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();//一天过去的总秒数		
	hours = rets/3600<12 ? rets/3600 : rets/3600-12;
	minutes = (rets - time.getHours() * 3600) / 60;
    seconds = time.getSeconds();
    milliseconds = seconds*1000 + time.getMilliseconds();
	


	// ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布
	// ctx.fillStyle = '#000';
	// ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色
		
	// ctx.translate(160,160);


						
	// for (var i = 0; i < 12; i++) {
	// 	//表盘			
	// 	ctx.save();
	// 	ctx.rotate(30*i/180*Math.PI);	
	// 	ctx.fillStyle = 'rgb(255,255,255)';
	// 	ctx.beginPath();
	// 	ctx.arc(0,-120,3,0,2*Math.PI);
	// 	ctx.closePath();
	// 	ctx.fill();
	// 	ctx.restore();

	// 	//时针
	// 	ctx.save();
	// 	ctx.rotate(30*hours/180*Math.PI);	
	// 	ctx.fillStyle = 'rgb(255,255,255)';
	// 	ctx.beginPath();
	// 	ctx.arc(0,-120,10,0,2*Math.PI);
	// 	ctx.closePath();
	// 	ctx.fill();
	// 	ctx.restore();

	// 	//分针
	// 	ctx.save();
	// 	ctx.rotate(30*(minutes/5)/180*Math.PI);	
	// 	ctx.fillStyle = 'rgb(255,255,255)';
	// 	ctx.beginPath();
	// 	ctx.arc(0,-120,6,0,2*Math.PI);
	// 	ctx.closePath();
	// 	ctx.fill();
	// 	ctx.restore();

	// 	//中心红点
	// 	ctx.save();
	// 	ctx.fillStyle = 'rgb(255,0,0)';
	// 	ctx.beginPath();
	// 	ctx.arc(0,0,3,0,2*Math.PI);
	// 	ctx.closePath();
	// 	ctx.fill();
	// 	ctx.restore();
						
}