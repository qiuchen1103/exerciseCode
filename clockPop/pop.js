function random(e, t) {
    return Math.random() * (t - e) + e;
};


var ball = {};
ball.definition = {
    minr:8,
    maxr:15,
    minvx:-3,
    maxvx:3,
    minvy:-3,
    maxvy:3
};
ball.RADIUS = [];        //最终半径
ball.vbox = [];          //最终速度
ball.positionBoard1 = [];//田字位置
ball.positionBoard2 = []; //全局位置

ball.watchButton = true; //表盘显示开关


var popCanvas = document.getElementById('popCanvas');
var ctx = popCanvas.getContext('2d');

var floatInterval = null; //浮动动画

window.onload = function() {
	randomDigit();
	sitv();
}

//开始动画
function sitv() {
	floatInterval = setInterval(
		function() {
			renderDigit();//绘制
			updateBall();//运动	
			crashTest();//碰撞检测
			shackTest();//用户晃动监测
		},
	50);
}

//初始化
function randomDigit(){
	for (var i = 0; i < 12; i++) {
		ball.vbox[i] = {};
		ball.vbox[i].x = random(ball.definition.minvx,ball.definition.maxvx);	
		ball.vbox[i].y = random(ball.definition.minvx,ball.definition.maxvx);	

		ball.RADIUS[i] = random(ball.definition.minr,ball.definition.maxr);

		//田字位置
		ball.positionBoard1[i] = Math.floor(random(1,4));
		var digit1 = [15,15];
		var digit2 = [45,15];
		var digit3 = [15,45];
		var digit4 = [45,45];
		switch (ball.positionBoard1[i]) {
			case 1:
				ball.positionBoard1[i] = {};
				ball.positionBoard1[i].x = digit1[0];
				ball.positionBoard1[i].y = digit1[1];
				break;
			case 2:		
				ball.positionBoard1[i] = {};			
				ball.positionBoard1[i].x = digit2[0];
				ball.positionBoard1[i].y = digit2[1];
				break;
			case 3:		
				ball.positionBoard1[i] = {};			
				ball.positionBoard1[i].x = digit3[0];
				ball.positionBoard1[i].y = digit3[1];
				break;
			case 4:		
				ball.positionBoard1[i] = {};			
				ball.positionBoard1[i].x = digit4[0];
				ball.positionBoard1[i].y = digit4[1];
				break;
			default:
				alert("wrong!");
		}

		// var originX = 0;//70+60*j;
		// var originY = 0;//40+60*i;
		
		//全局位置，未赋田字位置
		ball.positionBoard2[i] = {};
		if (i >= 0 && i <= 2) {
			ball.positionBoard2[i].x = 70+60*i;
			ball.positionBoard2[i].y = 40;
		}else if (i >= 3 && i <= 5) {
			ball.positionBoard2[i].x = 70+60*(i-3);
			ball.positionBoard2[i].y = 100;
		}else if (i >= 6 && i <= 8) {
			ball.positionBoard2[i].x = 70+60*(i-6);
			ball.positionBoard2[i].y = 160;
		}else if (i >= 9 && i <= 11) {
			ball.positionBoard2[i].x = 70+60*(i-9);
			ball.positionBoard2[i].y = 220;
		}
		//全局位置，赋田字位置
		ball.positionBoard2[i].x += ball.positionBoard1[i].x;
		ball.positionBoard2[i].y += ball.positionBoard1[i].y;

	};	
}

//绘制 
function renderDigit() {
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布

	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色

	ctx.fillStyle = "rgb(255,255,255)";
					
	for (var i = 0; i < 12; i++) {		
		ctx.beginPath();
		ctx.arc(ball.positionBoard2[i].x,ball.positionBoard2[i].y,ball.RADIUS[i],0,2*Math.PI);
		ctx.closePath();
		ctx.fill();		
	};
}

//圆运动
function updateBall() {
	for (var i = 0; i < 12; i++) {	
		ball.positionBoard2[i].x += ball.vbox[i].x;
		ball.positionBoard2[i].y += ball.vbox[i].y;					
	};	
	
}

//碰撞检测
function crashTest() {
	
 	for (var i = 0; i < 12; i++) {
		//碰左右边
		if (ball.positionBoard2[i].x >= 320-ball.RADIUS[i]) {
			ball.positionBoard2[i].x = 320-ball.RADIUS[i];
			ball.vbox[i].x = -ball.vbox[i].x;
		};
		if (ball.positionBoard2[i].x <= ball.RADIUS[i]) {
			ball.positionBoard2[i].x = ball.RADIUS[i];
			ball.vbox[i].x = -ball.vbox[i].x;
		};
		//碰上下边
		if (ball.positionBoard2[i].y >= 320-ball.RADIUS[i]) {
			ball.positionBoard2[i].y = 320-ball.RADIUS[i];
			ball.vbox[i].y = -ball.vbox[i].y;
		};
		if (ball.positionBoard2[i].y <= ball.RADIUS[i]) {
			ball.positionBoard2[i].y = ball.RADIUS[i];
			ball.vbox[i].y = -ball.vbox[i].y;
		};	
		//互碰
		ball.positionBoard2.forEach(function(item,index,array) {			
			if (index != i) {		
				var distanceSqu = Math.pow(ball.positionBoard2[i].x - item.x,2)+Math.pow(ball.positionBoard2[i].y - item.y,2);						
				if ( distanceSqu <= Math.pow(ball.RADIUS[i]+ball.RADIUS[index],2) ) {					
					ball.vbox[i].x = -ball.vbox[i].x;
					ball.vbox[i].y = -ball.vbox[i].y;
					// ball.vbox[index].x = -ball.vbox[index].x;
					// ball.vbox[index].y = -ball.vbox[index].y;				
				}			
			} else {
				return;
			}			
		});	
	}
}



function shackTest() {
	if (ball.watchButton) {
		
		clearInterval(floatInterval);//动画停止				
		clearCanvas();//消失动画，显示时间				
		
	};
}

//消失动画1.5s
function clearCanvas() {
	var count = 30; 

	var opacityInterval = setInterval(function() {
		updateBall();
		crashTest();
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布

		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色

		ctx.fillStyle = 'rgba(255,255,255,'+count/30+')';
					
		for (var i = 0; i < 12; i++) {	
				
			ctx.beginPath();
			ctx.arc(ball.positionBoard2[i].x,ball.positionBoard2[i].y,ball.RADIUS[i],0,2*Math.PI);
			ctx.closePath();
			ctx.fill();		
		};
		count --;
		// alert(count);
		if (count <= 0) {
		clearInterval(opacityInterval);
		showTime();//显示时间
		};
	},
	50);

	
}


//显示时间1.5s
function showTime() {
	var time = new Date();
	var rets = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();//一天过去的总秒数
	
	var hours = rets/3600<12 ? rets/3600 : rets/3600-12;
	var minutes = (rets - time.getHours() * 3600) / 60;

	var count2 = 0;

	//淡入
	var watchOpacityInterval = setInterval(function() {

		ctx.save();//保存原点为0的状态
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色

		
		ctx.translate(160,160);
						
		for (var i = 0; i < 12; i++) {
			//表盘			
			ctx.save();
			ctx.rotate(30*i/180*Math.PI);	
			ctx.fillStyle = 'rgba(255,255,255,'+count2/30+')';
			ctx.beginPath();
			ctx.arc(0,-120,3,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//时针
			ctx.save();
			ctx.rotate(30*hours/180*Math.PI);	
			ctx.fillStyle = 'rgba(255,255,255,'+count2/30+')';
			ctx.beginPath();
			ctx.arc(0,-120,10,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//分针
			ctx.save();
			ctx.rotate(30*(minutes/5)/180*Math.PI);	
			ctx.fillStyle = 'rgba(255,255,255,'+count2/30+')';
			ctx.beginPath();
			ctx.arc(0,-120,6,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//中心红点
			ctx.save();
			ctx.fillStyle = 'rgba(255,0,0,'+count2/30+')';
			ctx.beginPath();
			ctx.arc(0,0,3,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
					
		};
		ctx.restore();

		count2 ++;
		// alert(count2);
		if (count2 >= 30) {
			clearInterval(watchOpacityInterval);
			runWatch();
		};
	},
	50);
}

function runWatch() {
	// alert(h);
	var runWatchInterval = setInterval(function() {
		var time = new Date();
		var rets = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();//一天过去的总秒数
		
		var hours = rets/3600<12 ? rets/3600 : rets/3600-12;
		var minutes = (rets - time.getHours() * 3600) / 60;


		ctx.save();//保存原点为0的状态

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //每次调用清空画布
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);//背景黑色
		
		ctx.translate(160,160);
						
		for (var i = 0; i < 12; i++) {
			//表盘			
			ctx.save();
			ctx.rotate(30*i/180*Math.PI);	
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.beginPath();
			ctx.arc(0,-120,3,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//时针
			ctx.save();
			ctx.rotate(30*hours/180*Math.PI);	
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.beginPath();
			ctx.arc(0,-120,10,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//分针
			ctx.save();
			ctx.rotate(30*(minutes/5)/180*Math.PI);	
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.beginPath();
			ctx.arc(0,-120,6,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();

			//中心红点
			ctx.save();
			ctx.fillStyle = 'rgb(255,0,0)';
			ctx.beginPath();
			ctx.arc(0,0,3,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
					
		};
		ctx.restore();
	},1000);
}