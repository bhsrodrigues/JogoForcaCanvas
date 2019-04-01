var canvas = document.querySelector("#game");
var context = canvas.getContext("2d");

function background(fullClean){
	

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

function drawHead(){
	
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.lineWidth = 1;
	
	context.beginPath();
	context.arc(210,110,25,0,2 * Math.PI);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.arc(200,100,1,0,2 * Math.PI);
	context.stroke();
	
	context.beginPath();
	context.arc(220,100,1,0,2 * Math.PI);
	context.stroke();

	
	
}


function drawBody(){
	
	context.fillStyle = "black";
	context.fillRect(206,135,5,100);
}

function drawArm(errors){
	
	position(206, 155, 230, errors);
}


function drawLeg(errors){
	
	position(206, 235, 310, errors);
}

function position(x, y, newY, errors){
	var value = 35;
	
	context.fillStyle = "black";
	context.lineWidth = 3;
	context.beginPath();
	
	if (errors % 2 == 1){
		value *= -1;
		context.moveTo(x,y);
		context.lineTo(x + value,newY);
	}else{
		context.moveTo(x+4,y);
		context.lineTo(x+4+ value,newY);
	}
	
	context.stroke();
}

var bands = ["Metallica", "Iron Maiden", "Arctic Monkeys"];
var movies = ["Se beber não case", "Pulp Fiction", "Clube da Luta"];
var books = ["O iluminado", "A batalha do apocalipse", "Dança da morte"];


var word = "";

function selecionarPalavras(){
	
	mistakes = 0;
	lettersOK = 0;
	
	var comboitem = document.querySelector("select").value;
	var selectedItem;
	
	if (comboitem == "" ){
		alert("Selecione um item");
		document.querySelector("#letter").disabled=true;
		document.querySelector("#sendletter").disabled=true;
	}else{
		if (comboitem == "books"){
			selectedItem = books;
		}else if (comboitem == "bands"){
			selectedItem = bands;
		}else{
			selectedItem = movies;
		}
		
		console.log(selectedItem);
		
		word = getWord(selectedItem);
		drawWord(word);
		allLetters = [];
		wrongLetters = [];
		lettersOK = [];


		disableNewGameButton(false);
		disableLetterButton(false);
		disableLetterField(false);
		document.querySelector("#gameoptions").disabled = true;
		disableStartButton(true);
		
	}
	
	
	
}

function getWord(selectedItem){
	
	
	var item = selectedItem[Math.floor(Math.random() * selectedItem.length)];
	
	console.log(item)
	
	return item;
}

function clearWord(){
	context.fillStyle = "white";
	context.fillRect(50,500,650,80);
}

function drawWord(selectedWord){
	
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

var allLetters = [];
var correctLetters = [];
var wrongLetters = [];

function validateNotAcceptableChar(letter){
	var notAcceptable = [" ", "-","_","!","1","2","3","4","5","6","7","8","9","0","=","+","§",")","(","*","&","¨",
				"%","$","#","@","´","`","{","[","^","~",";",":",".",">","<","]","}",")"];

	return notAcceptable.includes(letter);
}

function removeChars(){
	var totalItens = 0;
	for(var x = 0; x < word.length; x++){
		console.log("Achou item");
		if ((word.charAt(x) == " ") || (word.charAt(x) == " ") || (word.charAt(x) == " ")){
			totalItens++;
		}
	}

	var tempWord = word;

	var count = 0;
	while(count < totalItens){
		tempWord = tempWord.replace(" ","").replace("-","",).replace("_","");
		count++;
	}

	console.log(tempWord);

	return tempWord;
}

function validateLetter(){
	var gameWord = removeChars();

	console.log(gameWord);
	
	var input = document.querySelector("#letter");
	var letter = input.value.toLowerCase();

	if (validateNotAcceptableChar(letter)){
		alert("Caracter informado não é válido");
	}else{
		var playedLetterBefore = false;

		for(var x = 0; x < allLetters.length; x++){
			if (letter == allLetters[x].toLowerCase()){
				playedLetterBefore = true;
				break;
			}
		}
	
		if (!playedLetterBefore){
			if (gameWord.toLowerCase().includes(letter)){
				showLetter(letter, 50, 485);
				correctLetters.push(letter);
			}else{
				showWrongLetters(300, 50);
				wrongLetters.push(letter);
				mistakes++;
				validateMistakes(mistakes);
			}

			allLetters.push(letter);
		}else{
			alert("Letra já foi informada. Tente novamente");
		}
	
		console.log("Letras corretas " + lettersOK);
		console.log("Total caracteres " + gameWord.length);
	
		if (lettersOK == gameWord.length){
			background(false);
			drawWinGame();
			alert("Parabéns, você finalizou o jogo");
			disableLetterField(true);
			disableLetterButton(true);
		}
		
	}

	document.querySelector("#letter").value = "";
	document.querySelector("#letter").focus();
	

}

function drawWinGame(){
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.lineWidth = 1;
	
	context.beginPath();
	context.arc(210,150,25,0,2 * Math.PI);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.arc(200,140,1,0,2 * Math.PI);
	context.stroke();
	
	context.beginPath();
	context.arc(220,140,1,0,2 * Math.PI);
	context.stroke();

	//drawFaceOne();

	context.strokeStyle = "black";
	
	context.beginPath();
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
	context.stroke();

	context.fillStyle = "#000";
	context.fillRect(206,175,5,100);


	position(206, 200, 176, 0);

	position(206, 200, 176, 1);

	position(206, 274, 320, 0);

	position(206, 274, 320, 1);

	
}

function showWrongLetters(x, y){

	context.font = "20px Arial";
	context.fillStyle = "red";

	context.fillText("Letras erradas".toUpperCase(), 300, 50);

	y+=50;

	for (var arrayIndex = 0; arrayIndex < wrongLetters.length; arrayIndex++){
		
		context.fillText(wrongLetters[arrayIndex].toUpperCase(), x + 2, y);
		context.fillRect(x,y+15,21,3);
		x += 26;
	}
}

function showLetter(letter, x, y){
		
	for (var charIndex = 0; charIndex < word.length; charIndex++){
		
		//console.log(word.toLowerCase().charAt(x));
		if (word.toLowerCase().charAt(charIndex) == letter){
			context.font = "20px Arial";
			context.fillStyle = "black";
			context.fillText(letter.toUpperCase(), x + 2, y);
			context.fillRect(x,y+15,21,5);
			lettersOK++;
			//console.log(lettersOK)
		}
		
		
		x += 26;
		
	}
	
}

var mistakes = 0;
var lettersOK;

function drawFaceOne(){
	//context.fillStyle = "white";
	context.strokeStyle = "black";
	
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
	drawHead();


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

function validateMistakes(mistakes){
	if (mistakes == 1){
		drawHead();
		drawFaceOne();
	}else if (mistakes == 2){
		drawBody();
		drawHead();
		drawFaceTwo();
	}else if (mistakes == 3){
		drawArm(mistakes);
		drawHead();
		drawFaceThree();
	}else if(mistakes == 4){
		drawArm(mistakes);
		drawHead();
		drawFaceFour();
	}else if(mistakes == 5){
		drawLeg(mistakes);
		drawHead();
		drawFaceFive();
	}else if (mistakes == 6){
		drawLeg(mistakes);
		drawHead();
		drawFaceSix();
	}else{
		drawHead();
		drawDeadFace();
		alert("Infelizmente você perdeu. Tente em outro jogo");
		disableLetterField(true);
		disableLetterButton(true);
	}
}

function disableLetterField(disable){
	var letterField = document.querySelector("#letter");
	letter.disabled = disable;
	letter.value = "";
}

function disableLetterButton(disable){
	var letterButton = document.querySelector("#sendletter");
	letterButton.disabled = disable;
}

function disableNewGameButton(disable){
	var newGameButton = document.querySelector("#newGameButton")
	newGameButton.disabled = disable;
}


function clearAll(){
	background(true);
	disableCombo(false);
	disableStartButton(false);
	disableLetterField(true);
	disableLetterButton(true);
	disableNewGameButton(true);
}

function disableCombo(disable){
	var combo = document.querySelector("#gameoptions");
	combo.selectedIndex = 0;
	combo.disabled = disable;
}

function disableStartButton(disable){
	var startButton = document.querySelector("#startgame");
	startButton.disabled = disable;
}

function callSendLetter(e){
	if (e.keyCode == 13){
		document.querySelector("#sendletter").click();
	}
}


document.querySelector("body").onload = clearAll;

document.querySelector("#startgame").onclick = selecionarPalavras;

document.querySelector("#sendletter").onclick = validateLetter;

document.querySelector("#newGameButton").onclick = clearAll;

document.querySelector("#letter").onkeypress = callSendLetter;

