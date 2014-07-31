$(document).ready(function(){
//    alert("Welcome to Liink!");

	//prepare blocks
	prepare();

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

var rowNo = 8;
var colNo = 8;
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
			$("#main-content").append(block);
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
    if (isSilver($(this))){
        return;
    }
	if(firstBlock === null && secondBlock === null) {
		firstBlock = $(this);
		selectBlock(firstBlock);
	}
	else if(firstBlock !== null && secondBlock === null) {
		secondBlock = $(this);
		selectBlock(secondBlock);
	}
	else{
		alert("OMG, this cannot happen!");
        releaseBlocks();
	}

	if(firstBlock !== null && secondBlock !== null) {
		tryToLiink();	
	}
} 

function tryToLiink () {
    if (firstBlock.attr("id") !== secondBlock.attr("id")) {
        blockList = canBeKilled();
        if (blockList.length !== 0) {
            killBlocks(blockList);
        }
    }
	releaseBlocks();	
}

function canBeKilled () {
	if (firstBlock.css("background-color") !== secondBlock.css("background-color")){
        return [];
    }
    return isLiink(firstBlock, secondBlock, [], [], 0);
}

function isSilver(block) {
    return block.css("background-color") === "rgb(192, 192, 192)";
}
function isDirectionChanged(direction, turns) {
    if (direction !== 0) {
        lastDirection = turns[turns.length - 1];
        if (lastDirection !== direction) {
            return true;
        }
    }
    return false;
}
function isLiink(block, targetBlock, blockList, turns, direction) {
    if(blockList.length > (rowNo+colNo)*1.5){
        return [];
    }
    var directionChanged = isDirectionChanged(direction, turns);
    if (directionChanged === true) {
        turns.push(direction);
    }

    if(turns.length > 3){
        turns.pop();
        return [];
    }

    blockList.push(block.attr("id"));

    if (isAround(block,targetBlock)){
        return blockList;
    }
    var nextBlock = getUpBlock(block);
    if (isSilver(nextBlock) && isNotInList(nextBlock, blockList) && isLiink(nextBlock, targetBlock, blockList, turns, 1).length !== 0){
        return blockList;
    }
    nextBlock = getDownBlock(block);
    if (isSilver(nextBlock) && isNotInList(nextBlock, blockList) && isLiink(nextBlock, targetBlock, blockList, turns, 2).length !== 0){
        return blockList;
    }
    nextBlock = getLeftBlock(block);
    if (isSilver(nextBlock) && isNotInList(nextBlock, blockList) && isLiink(nextBlock, targetBlock, blockList, turns, 3).length !== 0){
        return blockList;
    }
    nextBlock = getRightBlock(block);
    if (isSilver(nextBlock) && isNotInList(nextBlock, blockList) && isLiink(nextBlock, targetBlock, blockList, turns, 4).length !== 0){
        return blockList;
    }
    if (directionChanged === true) {
        turns.pop();
    }
    blockList.pop();
    return [];
}

function isNotInList(block, blockList) {
    return blockList.length === 0 || blockList.indexOf(block.attr("id")) === -1
}

function isAround(block, targetBlock) {
    if (getUpBlock(block).attr("id") === targetBlock.attr("id")){
        return true;
    }
    if (getDownBlock(block).attr("id") === targetBlock.attr("id")){
        return true;
    }
    if (getLeftBlock(block).attr("id") === targetBlock.attr("id")){
        return true;
    }
    if (getRightBlock(block).attr("id") === targetBlock.attr("id")){
        return true;
    }
    return false;
}

function getUpBlock(block) {
    id = block.attr("id");
    newId = id - 10;
    return $("#"+newId);
}


function getDownBlock(block) {
    id = block.attr("id");
    newId = id - (-10);
    return $("#"+newId);
}


function getLeftBlock(block) {
    id = block.attr("id");
    newId = id - 1;
    return $("#"+newId);
}


function getRightBlock(block) {
    id = block.attr("id");
    newId = id - (-1);
    return $("#"+newId);
}

function killBlocks (blockList) {
//	console.log(firstBlock);
//	console.log(secondBlock);
//    console.log(blockList);
    blockList.push(secondBlock.attr("id"));
    colorLine(blockList);
    sleep(500,function() {unColorLine(blockList)});
}

function unColor (block) {
	block.css("background-color", "silver");
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

function sleep(millis, callback) {
    setTimeout(function()
        { callback(); }
        , millis);
}

function colorLine(blockList){
    for(i=0;i<blockList.length;i++){
        $("#"+blockList[i]).css("background-color", "red");
    }
}

function unColorLine(blockList){
    for(i=0;i<blockList.length;i++){
        $("#"+blockList[i]).css("background-color", "silver");
    }
//    unColor(firstBlock);
//    unColor(secondBlock);
//    unselect(firstBlock);
//    unselect(secondBlock);
//    firstBlock = null;
//    secondBlock = null;
}