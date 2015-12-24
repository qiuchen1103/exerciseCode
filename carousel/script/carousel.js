addLoadEvent(normal);
addLoadEvent(fadein);
addLoadEvent(fadeoutin);
addLoadEvent(scroll);
addLoadEvent(autoscroll);

function normal() {
	var normal = document.getElementById('normal');
    
    // 获取全部指示器元素
	var Nol = normal.getElementsByTagName('ol')[0]; 
	var Nolli = Nol.getElementsByTagName('li');
	// 获取全部图片元素
	var Nul = normal.getElementsByTagName('ul')[0];
	var Nulli = Nul.getElementsByTagName('li');

	// 给所有指示器元素绑定mouseover
	for (var i = 0; i < Nolli.length; i++) {
		Nolli[i].index = i;
		Nolli[i].onmouseover = function() {
			// 清除所有指示器和图片的当前样式
			for (var i = 0; i < Nolli.length; i++) {
				Nolli[i].className = "";
				Nulli[i].style.display = "none";
			};
			this.className = "active";                   //this指当前Nolli[i]
			Nulli[this.index].style.display = "block";
		}
	};
}

function fadein() {
	var fadein = document.getElementById('fadein');
    
    // 获取全部指示器元素
	var Nol = fadein.getElementsByTagName('ol')[0]; 
	var Nolli = Nol.getElementsByTagName('li');
	// 获取全部图片元素
	var Nul = fadein.getElementsByTagName('ul')[0];
	var Nulli = Nul.getElementsByTagName('li');

	for (var i = 0; i < Nolli.length; i++) {
		Nolli[i].index = i;
		Nolli[i].onmouseover = function() {
			for (var i = 0; i < Nolli.length; i++) {
				Nolli[i].className = "";
				Nulli[i].style.display = "none";
				Nulli[i].style.opacity = 0;
			};
			this.className = "active";
			Nulli[this.index].style.display = "block";
			startMove(Nulli[this.index],{opacity:100});
		}
	};
}

function fadeoutin() {
	var fadeoutin = document.getElementById('fadeoutin');
    
    // 获取全部指示器元素
	var Nol = fadeoutin.getElementsByTagName('ol')[0]; 
	var Nolli = Nol.getElementsByTagName('li');
	// 获取全部图片元素
	var Nul = fadeoutin.getElementsByTagName('ul')[0];
	var Nulli = Nul.getElementsByTagName('li');

	for (var i = 0; i < Nolli.length; i++) {
		Nolli[i].index = i;
		Nolli[i].onmouseover = function() {
			for (var i = 0; i < Nolli.length; i++) {
				Nolli[i].className = "";
				startMove(Nulli[i],{opacity:0},function() {
					this.style.display = "none";
				})				
			};
			this.className = "active";
			Nulli[this.index].style.display = "block";
			startMove(Nulli[this.index],{opacity:100});						
		}
	};
}

function scroll() {
	var scroll = document.getElementById('scroll');
    
    // 获取全部指示器元素
	var Nol = scroll.getElementsByTagName('ol')[0]; 
	var Nolli = Nol.getElementsByTagName('li');
	// 获取全部图片元素
	var Nul = scroll.getElementsByTagName('ul')[0];
	var Nulli = Nul.getElementsByTagName('li');

	height = Nulli[0].offsetHeight;//可见区域高度

	for (var i = 0; i < Nolli.length; i++) {
		Nolli[i].index = i;
		Nolli[i].onmouseover = function() {
			for (var i = 0; i < Nolli.length; i++) {
				Nolli[i].className = "";
			};
			this.className = "active";
			startMove(Nul,{top: -this.index*height})
		}		
	};
}

function autoscroll() {
	var autoscroll = document.getElementById('autoscroll');
    
    // 获取全部指示器元素
	var Nol = autoscroll.getElementsByTagName('ol')[0]; 
	var Nolli = Nol.getElementsByTagName('li');
	// 获取全部图片元素
	var Nul = autoscroll.getElementsByTagName('ul')[0];
	var Nulli = Nul.getElementsByTagName('li');
	
	var height = Nulli[0].offsetHeight; //一张图的高度
	var iNow = 0;						//给计时器用-当前i值
	var timer = null;					//计时器
	
	//手动scroll	
	for(var i=0;i<Nolli.length;i++) {
		Nolli[i].index = i;
		Nolli[i].onmouseover = function() {
			for(var i=0;i<Nolli.length;i++) {
				Nolli[i].className = "";
			};
			this.className = 'active';
			startMove(Nul,{top: -this.index*height});
			iNow = this.index;          //给计时器用-当前i值			
		}
	};
	
	//自动scroll
	timer = setInterval(toRun,2000);
	
	autoscroll.onmouseover = function(){
		clearInterval(timer);
	};
	autoscroll.onmouseout = function(){
		timer = setInterval(toRun,2000);
	};
	
	function toRun(){
		if(iNow == Nolli.length-1){      //当前图为最后一幅图时
			iNow = 0;
		}
		else{
			iNow++;
		}
		for(var i=0;i<Nolli.length;i++){
			Nolli[i].className = "";
		}
		Nolli[iNow].className = 'active';
		startMove(Nul,{top: -iNow*height});		
	}
	
}