// JavaScript Document
// obj:运动对象，json:目标属性及值
function startMove(obj,json,endFn){
	
		clearInterval(obj.timer);
		
		obj.timer = setInterval(function(){
			
			var bBtn = true;
			
			for(var attr in json){  //每次循环，都将json的一个目标属性名赋值给attr
				
				var iCur = 0;       //当前属性值
			
				if(attr == 'opacity'){ //透明度（0~1）
					if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){//当前透明度十分接近0（透明）
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					
					}
					else{
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
					}	
				}else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				
				var iSpeed = (json[attr] - iCur)/8; //变化速度（越来越慢，因为iCur在不断接近json[attr]）
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //大于0则向上取整，反之向下取整，为什么？？？
				
				if(iCur!=json[attr]){
					bBtn = false;             //当前属性值不等于目标值时
				}
				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
					
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
				
			}
			
			if(bBtn){//当前属性值等于目标值时，清楚计时器
				clearInterval(obj.timer);
				
				if(endFn){//如果结束函数参数传入，执行
					endFn.call(obj);
				}
			}
			
		},30);
	
	}
	
// 获取该元素该属性的值	
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE9
	}
	else{
		return getComputedStyle(obj,false)[attr];   
	}
}