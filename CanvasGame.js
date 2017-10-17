/*
* @Author: yanhoor
* @Date:   2017-10-17 11:24:29
* @Last Modified by:   yanhoor
* @Last Modified time: 2017-10-17 19:06:40
*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//准备图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//定义游戏对象
var hero = {
	speed: 256
};
var monster = {};
var monsterCaught = 0;

//处理用户输入
var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;	//keyCode作为keyDown对象的属性名,true作为值
},false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
},false);

//游戏结束时重置游戏
var reset = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	monster.x = 32 + (Math.random()*(canvas.width - 64));
	monster.y = 32 + (Math.random()*(canvas.height - 64));
};

//游戏过程中更新游戏对象
var update = function(modifier){
	if (38 in keysDown) {	//向上方向键,遍历对象属性
		hero.y -= hero.speed*modifier;
	}
	if (40 in keysDown) {	//向下
		hero.y += hero.speed*modifier;
	}
	if (37 in keysDown) {	//向左
		hero.x -= hero.speed*modifier;
	}
	if (39 in keysDown) {	//向右
		hero.x += hero.speed*modifier;
	}

	//是否接触
	if (
		hero.x <= (monster.x + 32)	//hero照片大小32×32,坐标位于照片中心
		&& monster.x <= (hero.x + 32)
		&& hero.y <=(monster.y + 32)	//monster照片大小30×32,4个方向接触
		&& monster.y <= (hero.y + 32)
		) {
		++monsterCaught;
		reset();
	}
};

//渲染物体
var render = function(){
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseLine = "top";
	ctx.fillText("Goblins caught: " + monsterCaught, 32, 32);
};

var main = function(){
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();

reset();
main();