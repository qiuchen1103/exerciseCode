//获取画布
var canvas = document.getElementById("clockCanvas");
var context = canvas.getContext("2d");
//小圆半径
var RADIUS = 8;
//时钟边距
var MARGIN_LEFT = 50;
var MARGIN_TOP = 50;
//时间
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);//截止倒数的时间（1小时）
var curShowTimeSeconds;                   //目前到截止的时间间隔
//动画小圆
var balls = [];
var colors = ["#33B5E5","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];


window.onload = function() {

	curShowTimeSeconds = getCurrentShowTimeSeconds(); //目前到截止的时间间隔
	
	setInterval(
		function(){
			render(context);              //创建计时钟动画
			update();                    //刷新
			console.log(balls.length);
		},
	50
	);
	
}

//计算目前到截止的时间间隔（秒）
function getCurrentShowTimeSeconds() {
	var curTime = new Date();                        //当前时间
	
    var ret = endTime.getTime() - curTime.getTime(); //时间间隔（毫秒）
    ret = Math.round(ret/1000);				 		 //时间间隔（秒）

    return ret >= 0 ? ret : 0;                       //返回大于0的秒值
}

//创建计时钟动画
function render(cxt) {
	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height); //每次调用清空画布

	var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = curShowTimeSeconds%60;

    //绘制计时钟本体
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	//绘制动画小球
	for(var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}

//绘制计时钟本体
function renderDigit(x,y,num,cxt) {

	cxt.fillStyle = "rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {

				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			};
		};
	};
}


//刷新
function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();//再调用，计算目前到截止的时间间隔

	//下一帧时间
    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds%60;

    //当前帧时间
    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds = curShowTimeSeconds%60;

    if( nextSeconds != curSeconds ){ 
		//在变化的下一个数字做小球动画
        if (parseInt(nextHours/10) != parseInt(curHours/10)) {
        	addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10));
        };
        if (parseInt(nextHours%10) != parseInt(curHours%10)) {
        	addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nextHours%10));
        };
        if (parseInt(nextMinutes/10) != parseInt(curMinutes/10)) {
        	addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
        };
        if (parseInt(nextMinutes%10) != parseInt(curMinutes%10)) {
        	addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));
        };
        if (parseInt(nextSeconds/10) != parseInt(curSeconds/10)) {
        	addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
        };
        if (parseInt(nextSeconds%10) != parseInt(curSeconds%10)) {
        	addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
        };
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}

//创建彩色小球
function addBalls(x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				//创建每个数字的小球
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:5,
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//-4或4（随机性由random()的乘积决定?）
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			};
		};
	};
}

//小球运动效果
function updateBalls() {
	for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= context.canvas.height-RADIUS){
        	balls[i].y = context.canvas.height-RADIUS;
            balls[i].vy = -balls[i].vy*0.5;
        }
    }
    //性能优化
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
    	if (balls[i].x+RADIUS > 0 && balls[i].x-RADIUS < context.canvas.width) {
    		balls[cnt++] = balls[i];     //将仍在画面的小球排在数组前面
    	};
    };
    while (balls.length > cnt) {
    	balls.pop();                     //将索引大于cnt的小球删除
    }
}





