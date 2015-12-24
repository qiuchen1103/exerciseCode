documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;//整个棋盘格宽
cellSideLength = 0.18 * documentWidth;//单个格子宽
cellSpace = 0.04 * documentWidth;//格间距

//两个定位函数
function getPosTop(i,j) {
    return cellSpace + i*(cellSpace+cellSideLength);
}
function getPosLeft(i,j) {
    return cellSpace + j*(cellSpace+cellSideLength);
}

//两个颜色函数
function getNumberBackgroundColor(number) {
	switch(number){
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c"; break;
		case 4096: return "#a6c"; break;
		case 8192: return "#93c"; break;
	}
	return "black";
}
function getNumberColor(number) {
	if (number <= 4) {
		return "#776e65";
	};
	return "white";
}


// 判断棋盘格是否无空间（用于判断是否生成新数字）
function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false;//棋盘格仍然有空间
			};
		};
	};
	return true;
}

//四个方向的可移动判断函数
function canMoveLeft(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {//第一列不用判断
			if (board[i][j] != 0) {//有数字时
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					//左边无数字或与左边数字相等时
					return true;
				};
			};
		};
	};
	return false;
}
function canMoveUp(board) {
	for (var i = 1; i < 4; i++) {//第一行不用判断
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {//有数字时
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					//上边无数字或与上边数字相等时
					return true;
				};
			};
		};
	};
	return false;
}
function canMoveRight(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {//最后一列不用判断
			if (board[i][j] != 0) {//有数字时
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					//右边无数字或与右边数字相等时
					return true;
				};
			};
		};
	};
	return false;
}
function canMoveDown(board) {
	for (var i = 2; i >= 0; i--) {//最后一行不用判断
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {//有数字时
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					//下边无数字或与下边数字相等时
					return true;
				};
			};
		};
	};
	return false;
}

//两个判断移动方向是否有障碍物的函数
function noBlockHorizontal(row,col1,col2,board) {
	for (var i = col1+1; i < col2; i++) {
		if (board[row][i] != 0) {
			return false;
		};
	};
	return true;
}
function noBlockVertical(col,row1,row2,board) {
	for (var i = row1+1; i < row2; i++) {
		if (board[i][col] !=0 ) {
			return false;
		};
	};
	return true;
}

function nomove(board) {
	if (canMoveLeft(board) ||
		canMoveUp(board) ||
		canMoveRight(board) ||
		canMoveDown(board)) {
		return false;
	};
	return true;
}