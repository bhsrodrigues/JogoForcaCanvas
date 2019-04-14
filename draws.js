var canvas = document.querySelector("#game");
var context = canvas.getContext("2d");

function drawGibbet(fullClean){
	context.fillStyle="white";
	context.strokeStyle = "black";
	context.lineWidth = 1;

	if (!fullClean){
		context.fillRect(0,0,800,365);
	}else{
		context.fillRect(0,0,800,600);	
	}

	context.fillStyle = "black";

	context.fillRect(50,30,20,300);
		
	context.fillRect(50,30,150,20);
		
	context.fillRect(200,30,20,60);

	context.strokeRect(0,0,800,600);
}

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
	
	clearWord();
	
	var lines = calcLenght(selectedWord);
	var positionY = 400;
	var substring;
	var index = 0;
	
	for(var line = 0; line < lines.length; line++){
		var positionX = 50;

		if (line == 0){
			substring = selectedWord.substring(index,lines[line]);
			index+= lines[line];
		}else if(line == lines.length - 1){
			substring = selectedWord.substring(index);
		}else{
			substring = selectedWord.substring(index,lines[line]+index);
			index += lines[line];
		}

		for (var x = 0; x < substring.length; x++){
		
			if (substring.charAt(x) == " "){
				context.fillStyle = "white";
			}else{
				context.fillStyle = "black";
			}
			
			context.fillRect(positionX,positionY,21,5);
			positionX += 26;

		}

		positionY += 50;
		
	}
	
}

function calcLenght(selectedWord){

	var array = selectedWord.split(" ");

	var count = 0;
	var size = 0;
	var tempString = "";
	var arrayPositions = [];

	var position = 0;

	if(selectedWord.length <= 26){
		arrayPositions.push(selectedWord.length);
	}else{
		selectedWord = removeChars(selectedWord,false,false,true);
		while(count <= selectedWord.replace(":","").length && size < array.length){
			tempString += array[size].concat(" ");

			if (tempString.length >= 26){
				arrayPositions.push(count);
				position = 0;
				tempString = "";
			}else{
				size++;
				position = tempString.length
				count = tempString.length
			}
		}
	}

	arrayPositions.push(position);

	return arrayPositions;

}

function drawFaceOne(x, y){

	drawFullSmile(x, y);
}

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

	
	context.lineWidth = 1;

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
	

	drawFullSmile(195, 150);

	drawBody(206, 175);

	armOrLegPosition(206, 200, 176, 0);

	armOrLegPosition(206, 200, 176, 1);

	armOrLegPosition(206, 274, 320, 0);

	armOrLegPosition(206, 274, 320, 1);
}