$(document).ready(function(){
	//prepare blocks
	prepare();

	// alert("Welcome to Liink!");

	//bind events
	$("#reset").click(reset);
});

function reset(){	
	$(".block").remove();
	prepare();
}

function prepare(){
	addBlocks();
	arrangeBlocks();
	colorBlocks();
	bindEventsOfBlocks();
}

var rowNo = 4;
var colNo = 4	;
var areaTop = 100;
var areaLeft = 20;
var blockMargin = 10;
var blockSize = 60;
var firstBlock = null;
var secondBlock = null;

function addBlocks(){
	for (var i = 1; i <= rowNo; i++) {
		for (var j = 1; j <= colNo; j++) {
			var block=document.createElement("block");
			block.id = i.toString() + j.toString();
			block.className = "block";
			$("body").append(block);		
		};
	};
}

function arrangeBlocks(){
	for (var i = 1; i <= rowNo; i++) {
		for (var j = 1; j <= colNo; j++) {
			var top = areaTop + i*blockMargin + (i-1)*blockSize;
			var left = areaLeft + j*blockMargin + (j-1)*blockSize;
			$("#" + i + j).css("top",top).css("left",left);		
		};
	};
}

function colorBlocks(){
	blockIds = new Array();
	for (var i = 1; i <= rowNo; i++) {
		for (var j = 1; j <= colNo; j++) {
			blockIds.push("#"+i+j);		
		};
	};
	while(blockIds.length>0){
		var c = randomColor();
		var randomNo = Math.floor(Math.random() * blockIds.length);
		$(blockIds[randomNo]).css("background-color",c);		
		blockIds.splice(randomNo, 1);
		randomNo = Math.floor(Math.random() * blockIds.length);
		$(blockIds[randomNo]).css("background-color",c);		
		blockIds.splice(randomNo, 1);
	};	
}

function randomColor(){
 	var colors = ["lightpink", "lightgreen", "lightskyblue", "orchid", "orange"];
 	return colors[Math.floor(Math.random() * 5)]
}

function bindEventsOfBlocks(){
	$(".block").on("click", blockClick);
}

function blockClick(){
	if(firstBlock === null && secondBlock === null) {
		firstBlock = $(this);
		selectBlock(firstBlock);
	}
	else if(firstBlock !== null && secondBlock === null) {
		secondBlock = $(this);
		selectBlock(secondBlock);
	}
	else{
		alert("OMG, this cannot happen!")
	}

	if(firstBlock !== null && secondBlock !== null) {
		tryToLiink();	
	}
} 

function tryToLiink () {
	if (isSame()){
		killBlocks();
	}
	releaseBlocks();	
}

function isSame () {
	return firstBlock.css("background-color") === secondBlock.css("background-color");
}

function killBlocks () {
	console.log(firstBlock);
	console.log(secondBlock);
	unColor(firstBlock);
	unColor(secondBlock);
	unselect(firstBlock);
	unselect(secondBlock);
	firstBlock = null;
	secondBlock = null;
}

function unColor (block) {
	block.css("background-color", "white");
}

function unselect (block) {
	block.removeClass('selected');
}

function selectBlock (block) {
	block.addClass('selected');
}

function releaseBlocks () {
	unselect(firstBlock);
	unselect(secondBlock);
	firstBlock = null;
	secondBlock = null;
}