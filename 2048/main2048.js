

var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){

    prepareForMobile();

    //初始化棋盘格
    init();
    
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    };

    $("#grid-container").css("width",gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02*gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*cellSideLength);
}


//初始化空棋盘格
function init(){
    // 遍历所有格子，设置位置
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            var gridCell = $('#grid-cell-'+i+'-'+j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));
        }
    // 创建二维数组，用于数字，并初始化为0
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        };
    };
    // 渲染数字
    updateBoardView();
    score = 0;
    updatescore();
}

// 渲染数字
function updateBoardView() {
    $(".number-cell").remove();//如果存在数字，删除

    // 遍历所有格子，渲染数字
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );//引号的用法???
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            // 当数字为0时
            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                // 位置居中以便动画效果
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            // 当数字不为0时
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                // 设定颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                // 显示数字
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        };
    };
    $(".number-cell").css("line-height",cellSideLength+"px");
    $(".number-cell").css("font-size",0.6*cellSideLength+"px");
}

// 随机生成一个数字
function generateOneNumber() {
    if ( nospace(board) ) {
        return false;//棋盘格无空间
    }

    // 随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    var times = 0;
    while( times < 50 ) {
        if (board[randx][randy] == 0) {//若随机位置为空，则退出循环
            break;
        };
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                };
            };
        };
    };

    // 随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;//二分之一的概率

    // 在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);//生成动画

    return true;//???
}


//操作
$(document).keydown(function(event) {


    switch(event.keyCode) {
        case 37://left
            event.preventDefault();
            if (moveLeft()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
            break;
        case 38://up
            event.preventDefault();
            if (moveUp()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
            break;
        case 39://right
            event.preventDefault();
            if (moveRight()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
            break;
        case 40://down
            event.preventDefault();
            if (moveDown()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
            break;
        default://按其他按键
            break;
    }
});

document.addEventListener("touchstart",function(event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener("touchend",function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.03*documentWidth && Math.abs(deltay) < 0.03*documentWidth) {
        return;
    };
    
    //x
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            //right
            if (moveRight()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
        } else {
            //left
            if (moveLeft()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
        }
    } else {
    //y  
        if (deltay > 0) {
            //down
            if (moveDown()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
        } else {
            //up
            if (moveUp()) {//若能执行移动操作
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);//判断游戏结束否
            };
        }
    }
});

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    };
}

function gameover() {
    alert("gameover!");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    };

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {//第一列不检查
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {//遍历i行j之前的格子
                    if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {//左边为0且无障碍物
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {//左边有相同值且无障碍物且未进行过叠加
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updatescore();

                        hasConflicted[i][k] = true;
                        continue;
                    }
                };
            };
        };
    };
    setTimeout("updateBoardView()",200);//延迟执行刷新，否则移动动画会被跳过（计算机速度运行for循环太快）
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    };

    for (var i = 1; i < 4; i++) {//第一行不检查
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < i; k++) {//遍历j列i之前的格子
                    if (board[k][j] == 0 && noBlockVertical(j,k,i,board)) {//上边为0且无障碍物
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]) {//上边有相同值且无障碍物且未进行过叠加
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updatescore();

                        hasConflicted[k][j] = true;
                        continue;
                    }
                };
            };
        };
    };
    setTimeout("updateBoardView()",200);//延迟执行刷新，否则移动动画会被跳过（计算机速度运行for循环太快）
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    };

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {//最后一列不检查
            if (board[i][j] != 0) {

                for (var k = 3; k > j; k--) {//遍历i行j之后的格子
                    if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {//右边边为0且无障碍物
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)  && !hasConflicted[i][k]) {//右边有相同值且无障碍物且未进行过叠加
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updatescore();

                        hasConflicted[i][k] = true;
                        continue;
                    }
                };
            };
        };
    };
    setTimeout("updateBoardView()",200);//延迟执行刷新，否则移动动画会被跳过（计算机速度运行for循环太快）
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    };

    for (var i = 2; i >= 0; i--) {//最后一行不检查
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 3; k > i; k--) {//遍历j列i之后的格子
                    if (board[k][j] == 0 && noBlockVertical(j,i,k,board)) {//下边为0且无障碍物
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]) {//下边有相同值且无障碍物且未进行过叠加
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updatescore();

                        hasConflicted[k][j] = true;
                        continue;
                    }
                };
            };
        };
    };
    setTimeout("updateBoardView()",200);//延迟执行刷新，否则移动动画会被跳过（计算机速度运行for循环太快）
    return true;
}