$(document).ready(function(){
	//prepare blocks
	prepare();

	// alert("Welcome to Liink!");

	//bind events
	$("button").click(reset);
});

function reset(){	
	alert("Reset");
}

function prepare(){
	addBlocks();
	arrangeBlocks();
	colorBlocks();
	bindEventsOfBlocks();
}

var rowNo = 4;
var colNo = 4;
var areaTop = 100;
var areaLeft = 20;
var blockMargin = 10;
var blockSize = 60;

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
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	} else{
		$(this).addClass('selected');
	};
} 
	// $("#11").addClass('block');