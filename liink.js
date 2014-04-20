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
}

var rowNo = 2;
var colNo = 2;
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
	for (var i = 1; i <= rowNo; i++) {
		for (var j = 1; j <= colNo; j++) {
			$("#" + i + j).css("background-color",randomColor());		
		};
	};
}

function randomColor(){
	var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
	// $("#11").addClass('block');