//随机出现2或4的动画
function showNumberWithAnimation(i,j,randNumber) {
	var numberCell = $('#number-cell-'+i+'-'+j);
	//设置颜色
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    // 显示数字
    numberCell.text(randNumber);
    //动画
    numberCell.animate({
    	width:cellSideLength,
    	height:cellSideLength,
    	top:getPosTop(i,j),
    	left:getPosLeft(i,j)
    },50);
}

//移动动画
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
} 

function updatescore() {
    $("#score").text(score);
}