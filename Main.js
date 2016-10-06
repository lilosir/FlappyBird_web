var bgm = new Audio("bgm.mp3");
bgm.loop = true;
bgm.volume = 0.3;
var bgm2 = new Audio("bgm2.mp3");
bgm2.volume = 1;
var stage = new Kinetic.Stage({
	container: 'container',
	width: 340,
	height: 460
});
var layer = new Kinetic.Layer();
var messageLayer = new Kinetic.Layer();
var text_ = new Kinetic.Layer();
var messageHighLayer = new Kinetic.Layer();
var bg;
var imageObj = new Image();
var bg2 = new Image();
var currentY;
var road;
var obstacle1 = [];
var obstacle2 = [];
var random_ = [];
var sprite = new Kinetic.Sprite();
var anim_down = new Kinetic.Animation();
var anim_up = new Kinetic.Animation();
var anim_bg = new Kinetic.Animation();
var off_y = 10;
var is_top = false;

var is_over = false;
var time;

var temp_y;


var current_score = 0;
var offset_score = 1;

var bird;
var Img_bird = new Image();
Img_bird.src = 'bird.png'
Img_bird.onload = function() {
	bird = new Bird(100, 40);
};

imageObj.src = 'bg13.png';
imageObj.onload = function() {
	bg = new Kinetic.Image({
		x: 0,
		y: 0,
		image: imageObj,
		width: 340,
		height: 400
	});
	layer.add(bg);
	layer.draw();
	bg.moveToBottom();
};



bg2.src = 'bg2.png';
bg2.onload = function() {
	road = new Kinetic.Image({
		x: 0,
		y: 400,
		image: bg2,
		width: 680,
		height: 60
	});

	layer.add(road);
	layer.draw();
};

//Initial the start menu 
var startMenu = new Image();
var startMenuImage;


//main function
$(document).ready(function() {
	main();
});

function main() {
	$("#startButton").click(function() {
		startGame();
	});
}

function startGame() {
	$("#startButton").removeClass("start").addClass("started");
	init();
}

function restartGame() {
	addInterval();
	anim_down.start();
	anim_bg.start();
	window.addEventListener('keyup', key_down);
	bird.sprite.setX(100);
	bird.sprite.setY(40);
	for (var i = 0; i < obstacle1.length; i++) {
		obstacle1[i].ob1.remove();
	};
	for (var i = 0; i < obstacle2.length; i++) {
		obstacle2[i].ob2.remove();
	};
	obstacle1.splice(0, obstacle1.length);
	obstacle2.splice(0, obstacle2.length);
	current_score = 0;
	random_.splice(0,random_.length);  
}


function init() {
	initAnimation(bird);
	initCharacters();
	initStartmenu();
	addInterval();

}

function addInterval() {

	setInterval(collison, 50);
	setInterval(remove_ob, 50);
	setInterval(stop_up, 50);
	setInterval(refreshScore, 50);
	setInterval(best_, 50);
	setInterval(isover, 50);
	time = setInterval(make_obstacle, 3500);
}

function initCharacters() {
	bgm.play();

	bg_move();

	layer.add(bird.sprite);
	bird_down(bird);
	layer.draw();
	bird.sprite.start();

	fly();
}

function initStartmenu() {

	startMenu.onload = function() {
		startMenuImage = new Kinetic.Image({
			x: 100,
			y: 200,
			image: startMenu,
			width: 100,
			height: 40,
			visible: false
		});
		startMenuImage.on('click', function() {
			if (!is_over) {
				restartGame();
				startMenuImage.hide();
			}
		});

		layer.add(startMenuImage);
		layer.draw();
		startMenuImage.moveToTop();

	};
	startMenu.src = 'start_off.png';
}

function initAnimation(b) {
	anim_down = new Kinetic.Animation(function(frame) {
		currentY = b.sprite.getY();
		b.sprite.setY(currentY += 3);
	}, layer);

	anim_up = new Kinetic.Animation(function(frame) {
		currentY = b.sprite.getY();
		b.sprite.setY(currentY -= 3);
	}, layer);

	anim_down.stop();
	anim_up.stop();
}

function isover() {
	if (is_over) {
		anim_down.stop();
		anim_up.stop();
		clearInterval(time);
		startMenuImage.show();
		is_over = false;
		anim_bg.stop();
		window.removeEventListener('keyup', key_down);
	}
}


function refreshScore() {
	if (current_score <= 1) {
		writeMessage(messageLayer, "current score: " + 0);
	} else {
		writeMessage(messageLayer, "current score: " + (current_score - offset_score));
	}
	HighPoint(messageHighLayer, "best score: " + localStorage.bestpoints);
	// HighPoint(messageHighLayer, "鸟的下端：" + (bird.sprite.getY()+28));
	// writeMessage(messageLayer, "柱子顶端： " + obstacle2[0].ob2.getY());
}

//background move
function bg_move() {

	var currentX_ = road.getX();
	anim_bg = new Kinetic.Animation(function(frame) {
		currentX_ -= 1;
		road.setX(currentX_);
		if (currentX_ < -340) {
			currentX_ = 0;
		}
	}, layer);

	anim_bg.start();
}

//bird actions
function Bird(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = new Kinetic.Sprite({
		x: this.x,
		y: this.y,
		image: Img_bird,
		animation: 'fly',
		animations: {
			fly: [
				0, 0, 37, 28,
				38, 0, 37, 28
			]
		},
		frameRate: 10,
	});
}


function bird_down(b) {
	anim_down.start();
}

function bird_up(b) {
	anim_up.start();
}

function stop_up() {
	if (temp_y - 40 >= bird.sprite.getY()) {
		anim_up.stop();
		anim_down.start();
	}
}

function fly() {
	window.addEventListener('keyup', key_down);

}

function key_down(e) {
	if (e.keyCode === 32) {
		temp_y = bird.sprite.getY();
		anim_down.stop();
		bird_up(bird);
	}
}

//obstacles
function make_obstacle() {

	var random_num = Math.round(Math.random() * 5 + 1);
	var _ob1 = new build_obstacle1(random_num);
	ob_move1(_ob1);
	obstacle1.push(_ob1);

	var _ob2 = new build_obstacle2(random_num);
	ob_move2(_ob2);
	obstacle2.push(_ob2);

	random_.push(random_num);
	if (!is_over) {
		current_score++;
		if (current_score > 1)
			bgm2.play();
	}
}

//obstacles appear
function build_obstacle1(length) {

	this.width = 40;
	this.height = length * 40;
	this.ob1 = new Kinetic.Rect({
		x: 340,
		y: 0,
		width: 40,
		height: this.height,
		fill: '#045e04',
		stroke: 'black',
		strokeWidth: 1
	});
	this.currentX = this.ob1.getX();
	layer.add(this.ob1);
	layer.draw();
}

function ob_move1(ob) {
	this.anim1 = new Kinetic.Animation(function(frame) {
		currentX = ob.ob1.getX();
		ob.ob1.setX(currentX -= 1);
	}, layer);
	anim1.start();
}



function build_obstacle2(length) {

	this.width = 40;
	this.height = 280-length * 40;
	this.ob2 = new Kinetic.Rect({
		x: 340,
		y: length * 40 + 120,
		width: 40,
		height: this.height,
		fill: '#045e04',
		stroke: 'black',
		strokeWidth: 1
	});

	this.currentX = this.ob2.getX();
	layer.add(this.ob2);
	layer.draw();
}

function ob_move2(ob) {
	this.anim2 = new Kinetic.Animation(function(frame) {
		currentX = ob.ob2.getX();
		ob.ob2.setX(currentX -= 1);
	}, layer);
	anim2.start();
}

function remove_ob() {

	if (obstacle1.length > 0 && obstacle1[0].ob1.getX() < -40) {
		obstacle1[0].ob1.remove();
		obstacle1.splice(0, 1);
		random_.splice(0, 1);
	}
	if (obstacle2.length > 0 && obstacle2[0].ob2.getX() < -40) {
		obstacle2[0].ob2.remove();
		obstacle2.splice(0, 1);
	}
}

function collison() {

	for (var i = 0; i < obstacle1.length; i++) {
		if (bird.sprite.getX() + 37 > obstacle1[i].ob1.getX() &&
			bird.sprite.getX() < obstacle1[i].ob1.getX() + 40 &&
			bird.sprite.getY() < obstacle1[i].ob1.getY() + random_[i] * 40) {	
			is_over = true;
		}
	}
	for (var i = 0; i < obstacle2.length; i++) {
		if (bird.sprite.getX() + 37 > obstacle2[i].ob2.getX() &&
			bird.sprite.getX() < obstacle2[i].ob2.getX() + 40 &&
			bird.sprite.getY() + 28 > obstacle2[i].ob2.getY()) {
			is_over = true;
		}
	}
	if (bird.sprite.getY() >= 370) {
		anim_down.stop();
		is_over = true;
	}

}

//set text on messageLayer
function writeMessage(messageLayer, message) {


	var context = messageLayer.getContext();
	messageLayer.clear();
	context.fillText(message, 30, 30);
}

function HighPoint(messageHighLayer, message) {
	var context = messageHighLayer.getContext();
	messageHighLayer.clear();
	context.fillText(message, 30, 60);
};

function best_() {
	if (typeof(Storage) !== "undefined") {
		if (localStorage.bestpoints) {
			if ((current_score - offset_score) > localStorage.bestpoints) {
				localStorage.bestpoints = current_score - offset_score;
			}
		} else {
			localStorage.bestpoints = 0;
		}
	}
}



stage.add(layer);
stage.add(messageLayer);
stage.add(messageHighLayer);