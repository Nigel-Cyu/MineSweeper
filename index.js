/*
* @Author: Marte
* @Date:   2018-03-14 20:00:35
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-14 20:01:27
*/

var Mine;
var boomNum = 10;

function layOut (size, num) {  //布局函数
    boomNum = num;
    var frame = document.getElementById('mainBody');
    var bNum = document.getElementById('boomNum');
    bNum.innerText = boomNum;
    var mine = new Array(size);
    for(var  i = 0; i < size; i++) {
        mine[i] = new Array(size);
    }
    mine = randomNumber(mine, num);
    Mine = mine;
    for (var i = 0;i < size;i++) {
        frame.appendChild(onLoading(i, size, mine));
    }
}

function randomNumber (mine, num) { //地雷配置函数
    var mine = mine;
    var rows = mine.length;
    var columns = mine.length;
    var n = 0;
    while (n < num) {
        var row = Math.ceil(rows * (Math.random())) - 1;
        var col = Math.ceil(columns * (Math.random())) - 1;
        if (mine[row][col] != "雷") {
            mine[row][col] = "雷";
            n++;
        }
    }
    for (var i = 0;i < rows;i++) { //地雷提示累计
        for (j = 0;j < columns;j++) {
            var onum = 0;
            if ((i - 1 >= 0) && (j - 1 >= 0)) { //左上
                if (mine[i - 1][j - 1] == "雷") onum++;
            }
            if (i >= 1) { //正上
                if (mine[i - 1][j] == "雷")onum++;
            }
            if ((i - 1 >= 0) && (j <= columns - 2)) { //右上
                if (mine[i - 1][j + 1] == "雷") onum++;
            }
            if (j <= columns - 2) { //正右
                if (mine[i][j + 1] == "雷") onum++;
            }
            if ((i <= rows - 2) && (j <= columns - 2)) { //右下
                if (mine[i + 1][j + 1] == "雷") onum++;
            }
            if (i <= rows - 2) { //正下
                if (mine[i + 1][j] == "雷")onum++;
            }
            if ((i <= rows - 2) && (j - 1 >= 0)) { //左下
                if (mine[i + 1][j - 1] == "雷") onum++;
            }
            if (j - 1 >= 0) { //正左
                if (mine[i][j - 1] == "雷") onum++;
            }
            if ((mine[i][j] != "雷")) {
                mine[i][j] = onum;
                if(onum == 0) {
                     mine[i][j] = null;
                }

            }
        }
    }
    return mine;
}

function onLoading (row, len, mine) { //装载函数
    var tr = document.createElement('tr');
    for (var i = 0;i < len;i++) {
        var td = document.createElement('td');
        var content = mine[row][i];
        var button = document.createElement('input');
        button.type = 'button';
        button.id = row + '.' + i;
        button.className = 'obutton';
        button.onclick = function () {
            getValue(this);
            if (this.value == "雷") {
                this.className = 'button_';
                getValue("over");
                alert("你炸了！");
                alert("哈哈哈哈哈哈哈哈！！！");
                if (confirm("再来一局？")) {
                    window.location.reload();
                }
                return false;
            }else if (!this.value) {
                spread(this);
            }
            this.oncontextmenu = function () {
                return false;
            }
            judge();
        }
        button.oncontextmenu = function () {
            if (this.value == "标") {
                boomNum++;
                this.value = "";
                var bNum = document.getElementById('boomNum');
                bNum.innerText = boomNum;
            }else if (this.value == "") {
                this.value = "标";
                boomNum--;
                var bNum = document.getElementById('boomNum');
                bNum.innerText = boomNum;
                judge();
            }else {
                return false;
            }
        }
        td.appendChild(button);
        tr.appendChild(td);
    }
    return tr;
}

function getValue (obj) {  //赋值函数
    if (obj != "over") {
        var oid = obj.id;
        var row = oid.split(".")[0];
        var col = oid.split(".")[1];
        obj.value = Mine[row][col];
        obj.className = "button" + obj.value;
    }else {
        for (var i = 0;i < Mine.length;i++) {
            for (var j = 0;j < Mine[i].length;j++) {
                var button = document.getElementById(i + "." + j);
                if (Mine[i][j] == "雷") {
                    button.value = "雷";
                    button.className = "button_";
                }
            }
        }
    }
}

function spread (obj) {  //空白扩散函数
    var id = obj.id;
    var row = parseInt(id.split(".")[0]);
    var col = parseInt(id.split(".")[1]);
    // console.log(typeof col)
    if ((row - 1 >= 0) && (col - 1 >= 0)) {  //判断左上
        var obutton = document.getElementById((row - 1) + "." + (col - 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row - 1][col - 1] == "雷")?"":Mine[row - 1][col - 1];
            obutton.className = "button" + obutton.value;
        }
    }
    if (row >= 1) {  //判断正上
        var obutton = document.getElementById((row - 1) + "." + col);
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row - 1][col] == "雷")?"":Mine[row - 1][col];
            obutton.className = "button" + obutton.value;
        }
    }
    if ((row >= 1) && (col <= Mine.length - 2)) {  //判断右上
        var obutton = document.getElementById((row - 1) + "." + (col + 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row - 1][col + 1] == "雷")?"":Mine[row - 1][col + 1];
            obutton.className = "button" + obutton.value;
        }
    }
    if (col <= Mine.length - 2) {  //判断正右
        var obutton = document.getElementById(row + "." + (col + 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row][col + 1] == "雷")?"":Mine[row][col + 1];
            obutton.className = "button" + obutton.value;
        }
    }
    if ((row <= Mine.length - 2) && (col <= Mine.length - 2)) {  //判断右下
        var obutton = document.getElementById((row + 1) + "." + (col + 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row + 1][col + 1] == "雷")?"":Mine[row + 1][col + 1];
            obutton.className = "button" + obutton.value;
        }
    }
    if (row <= Mine.length - 2) {  //判断正下
        var obutton = document.getElementById((row + 1) + "." + col);
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row + 1][col] == "雷")?"":Mine[row + 1][col];
            obutton.className = "button" + obutton.value;
        }
    }
    if ((row <= Mine.length - 2) && (col >= 1)) {  //判断左下
        var obutton = document.getElementById((row + 1) + "." + (col - 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row + 1][col - 1] == "雷")?"":Mine[row + 1][col - 1];
            obutton.className = "button" + obutton.value;
        }
    }
    if (col >= 1) {  //判断正左
        var obutton = document.getElementById(row + "." + (col - 1));
        if (obutton.value === null) {
            spread(obutton);
        }else{
            obutton.value = (Mine[row][col - 1] == "雷")?"":Mine[row][col - 1];
            obutton.className = "button" + obutton.value;
        }
    }
}

function judge () {  //判断是否去除所有地雷函数
    var row = Mine.length;
    var col = Mine.length;
    var digNum = 0;
    var wrongNum = 0;
    for (var i = 0;i < row;i++) {
        for (var j = 0;j < col;j++) {
            var button = document.getElementById(i + "." + j);
            if (Mine[i][j] == "雷" && button.value == "标") {
                digNum++;
            }
            if (Mine[i][j] != "雷" && button.value == "标") {
                wrongNum++;
            }
        }
    }
    if (digNum == boomNum && wrongNum == 0) {
        if (confirm("恭喜你把地雷全部挖除！再来一局？")) {
            window.location.reload();
        }
    }
}
layOut(9,10);