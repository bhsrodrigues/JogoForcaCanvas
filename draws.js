var canvas = document.querySelector("#game");
var context = canvas.getContext("2d");

function drawGibbet(fullClean){
	context.fillStyle="white";
	context.strokeStyle = "black";
	context.lineWidth = 1;

	if (!fullClean){
		context.fillRect(0,0,800,400);
	}else{
		context.fillRect(0,0,800,600);	
	}

	context.fillStyle = "black";

	context.fillRect(50,30,20,300);
		
	context.fillRect(50,30,150,20);
		
	context.fillRect(200,30,20,60);

	context.strokeRect(0,0,800,600);
}

//x = 210, y = 110
function drawHead(x, y){
	
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.lineWidth = 1;
	
	context.beginPath();
	context.arc(x,y,25,0,2 * Math.PI);
	context.fill();
	context.stroke();

	var resize = -10;
	
	while (resize <= 10){
		context.beginPath();
		context.arc(x+resize,y-10,1,0,2 * Math.PI);
		context.stroke();
		resize+=20;
	}
}


//x = 206, y = 135
function drawBody(x, y){
	
	context.fillStyle = "black";
	context.fillRect(x,y,5,100);
}

function drawArm(errors){
	
	armOrLegPosition(206, 155, 230, errors);
}


function drawLeg(errors){
	
	armOrLegPosition(206, 235, 310, errors);
}

function armOrLegPosition(x, y, newY, errors){
	var value = 35;
	var bodyPositionDifference = 4;
	
	context.fillStyle = "black";
	context.lineWidth = 3;
	context.beginPath();

	if (errors % 2 == 1){
		value *= -1;
		bodyPositionDifference = 0;
	}

	context.moveTo(x+bodyPositionDifference,y);
	context.lineTo(x+bodyPositionDifference+ value,newY);
	
	context.stroke();
}

function clearWord(){
	context.fillStyle = "white";
	context.fillRect(50,500,650,80);
}

function drawWordFields(selectedWord){
	
	var position = 50;
	clearWord();
	
	for (var x = 0; x < selectedWord.length; x++){
		
		if (selectedWord.charAt(x) == " "){
			context.fillStyle = "white";
		}else{
			context.fillStyle = "black";
		}
		
		context.fillRect(position,500,21,5);
		position += 26;	
	}
}

function drawFaceOne(x, y){

	drawFullSmile(x, y)
	//context.fillStyle = "white";
	/*context.strokeStyle = "black";
	
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,125,225,125,225,110);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,130,225,130,225,110);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,135,225,135,225,110);
	context.stroke();
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(203, 120);
	context.lineTo(203, 126);
	context.moveTo(210, 120);
	context.lineTo(210, 128);
	context.moveTo(218, 120);
	context.lineTo(218, 126);
	context.stroke();*/
}

//x = 195 y = 110
function drawFullSmile(x, y){
	context.strokeStyle = "black";
	
	var newX = x;
	newY = y;

	var count = 15;
	while(count <= 25){

		context.beginPath();
		context.moveTo(x, y);
		context.bezierCurveTo(x,y + count, 
			x + 30,y + count,x +30 ,y);
		context.stroke();
		count+=5;
	}

	/*context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,125,225,125,225,110);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,130,225,130,225,110);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,135,225,135,225,110);
	context.stroke();*/
	
	context.lineWidth = 1;
	/*context.beginPath();
	context.moveTo(203, 120);
	context.lineTo(203, 126);
	context.moveTo(210, 120);
	context.lineTo(210, 128);
	context.moveTo(218, 120);
	context.lineTo(218, 126);*/

	context.beginPath();
	context.moveTo(x + 8, y + 10);
	context.lineTo(x + 8, y + 16);
	context.moveTo(x + 15, y + 10);
	context.lineTo(x + 15, y + 18);
	context.moveTo(x + 23, y + 10);
	context.lineTo(x + 23, y + 16);

	context.stroke();
}

function drawFaceTwo(){
	context.beginPath();
	context.moveTo(195, 110);
	context.bezierCurveTo(195,130,225,130,225,110);
	context.stroke();
}

function drawFaceThree(){
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(200, 122);
	context.lineTo(220, 117);
	context.stroke();
}

function drawFaceThree(){
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(200, 122);
	context.lineTo(220, 117);
	context.stroke();
}

function drawFaceFour(){
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(195, 125);
	context.bezierCurveTo(195,112,225,112,225,125);
	context.stroke();
	
}

function drawFaceFive(){
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(195, 120);
	context.bezierCurveTo(195,114,205,114,205,120);
	context.moveTo(205, 120);
	context.bezierCurveTo(205,123,215,123,215,120);
	context.moveTo(215, 120);
	context.bezierCurveTo(215,114,225,114,225,120);
	context.stroke();
}

function drawFaceSix(){
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(216, 108);
	context.bezierCurveTo(216,117,224,117,224,108);
	context.moveTo(220,102);
	context.lineTo(216,108);
	context.moveTo(220,102);
	context.lineTo(224,108);
	context.moveTo(195, 125);
	context.bezierCurveTo(195,112,225,112,225,125);
	context.stroke();
}

function drawDeadFace(){
	drawHead(210, 110);


	var size = 0;
	var count = 0;

	while (count <= 1){

		context.lineWidth = 2;
		context.moveTo(195 + size, 95);
		context.lineTo(205 + size,105);
		context.stroke();

		context.moveTo(205 + size, 95);
		context.lineTo(195 + size, 105);
		context.stroke();

		count++;
		size += 20;
	}

	context.moveTo(195, 115);
	context.lineTo(225, 115);
	context.stroke();

	context.beginPath();
	context.moveTo(214, 122);
	context.bezierCurveTo(214,131,224,131,224,122);
	context.stroke();
	
	context.moveTo(214,115);
	context.lineTo(214,122);

	context.moveTo(224,115);
	context.lineTo(224,122);

	context.moveTo(219,115);
	context.lineTo(219,120);

	context.stroke();
}

function drawWinGame(){

	drawHead(210,150);

	context.strokeStyle = "black";
	
	/*context.beginPath();
	context.moveTo(195, 150);
	context.bezierCurveTo(195,165,225,165,225,150);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 150);
	context.bezierCurveTo(195,170,225,170,225,150);
	context.stroke();
	
	context.beginPath();
	context.moveTo(195, 150);
	context.bezierCurveTo(195,175,225,175,225,150);
	context.stroke();
	
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(203, 160);
	context.lineTo(203, 166);
	context.moveTo(210, 160);
	context.lineTo(210, 168);
	context.moveTo(218, 160);
	context.lineTo(218, 166);
	context.stroke();*/

	drawFullSmile(195, 150);

	/*context.fillStyle = "#000";
	context.fillRect(206,175,5,100);*/
	drawBody(206, 175);


	armOrLegPosition(206, 200, 176, 0);

	armOrLegPosition(206, 200, 176, 1);

	armOrLegPosition(206, 274, 320, 0);

	armOrLegPosition(206, 274, 320, 1);
}