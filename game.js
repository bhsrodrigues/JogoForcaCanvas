var canvas = document.querySelector("#game");
var context = canvas.getContext("2d");

function background(fullClean){

	drawGibbet(fullClean);

}

function loadOptionStyle(){
	var e = document.querySelector("#difficulty");
	var strUser = e.options[e.selectedIndex];
	if (strUser.value=="normal"){
		e.style["background-color"] = "#0f0";
	}else if(strUser.value=="dificil"){
		e.style["background-color"] = "#ff0";
	}else if(strUser.value=="muitodificil"){
		e.style["background-color"] = "#e8a546";
	}else if(strUser.value=="extremo"){
		e.style["background-color"] = "#f00";
	}else{
		e.style["background-color"] = "#fff";
	}
}

//TODO Remover função após passar corpo com sucesso
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

//var bands = ["Metallica", "Iron Maiden", "Arctic Monkeys"];
//var movies = ["Se beber não case", "Pulp Fiction", "Clube da Luta"];
var books = ["O iluminado", "A batalha do apocalipse", "Dança da morte"];


var word = "";

function selecionarPalavras(){
	
	mistakes = 0;
	getDificulty();
	lettersOK = 0;
	
	var comboitem = document.querySelector("#gameoptions").value.toLowerCase();
	var selectedItem;
	
	if (comboitem == "" ){
		alert("Selecione um item");
		document.querySelector("#letter").disabled=true;
		document.querySelector("#sendletter").disabled=true;
	}else{
		if (comboitem == "livros"){
			selectedItem = books;
		}else if (comboitem == "bandas"){
			selectedItem = bands;
		}else{
			selectedItem = movies;
		}

//		alert(comboitem);
		
		console.log(selectedItem);
		
		word = getWord(selectedItem);
		drawWordFields(word);
		allLetters = [];
		wrongLetters = [];
		lettersOK = [];


		disableNewGameButton(false);
		disableLetterButton(false);
		disableLetterField(false);
		document.querySelector("#gameoptions").disabled = true;
		disableStartButton(true);

		document.querySelector("#letter").focus();
		
	}
	
}

function getDificulty(){

	var difficulty = document.querySelector("#difficulty").value.toLowerCase();

	console.log(difficulty + " " + difficulty.length);
	//console.log("Erros" + mistakes);

	if (difficulty == "normal"){
		mistakes = 0;
	}else if(difficulty == "dificil"){
		mistakes = 2;
		hard();
	}else if(difficulty == "muitodificil"){
		mistakes = 4;
		veryHard();
	}else{
		mistakes = 6;
		extreme();
	}
}

function hard(){
	drawHead(210,110);
	drawFaceOne(195,110);
	drawBody(206, 135);
}

function veryHard(){
	drawHead(210,110);
	drawFaceFour();
	drawBody(206, 135);
	drawArm(1);
	drawArm(2);
}

function extreme(){
	drawHead(210,110);
	drawFaceSix();
	drawBody(206, 135);
	drawArm(1);
	drawArm(2);
	drawLeg(1);
	drawLeg(2);
}

function getWord(selectedItem){
	
	var item = selectedItem[Math.floor(Math.random() * selectedItem.length)].replace(":","");
	
	return item;
}

var allLetters = [];
var correctLetters = [];
var wrongLetters = [];



function showLetter(letter, x, y){
		
	var lines = calcLenght(word);
	//var positionY = 450;
	var newX = x;
	var substring;
	var index = 0;
	for(var line = 0; line < lines.length; line ++){
		//var positionX = 50;
		//positionY = 450;
		



		/*if (line == 0){
			substring = word.substring(line,lines[line]);
		}else if(line == lines.length - 1){
			substring = word.substring(lines[line]);
		}else{
			substring = word.substring(lines[line],lines[line+1]);
		}*/

		if (line == 0){
			substring = word.substring(index,lines[line]);
			index+= lines[line];
		}else if(line == lines.length - 1){
			substring = word.substring(index);
		}else{
			substring = word.substring(index,lines[line]+index);
			index += lines[line];
		}
		
		
		//console.log(substring);
		
		for (var charIndex = 0; charIndex < substring.length; charIndex++){
	
			//console.log("Letra do jogo " + substring.toLowerCase().charAt(charIndex));

			var result = foundLetter(substring.toLowerCase().charAt(charIndex),letter.toLowerCase());

			//console.log("Resultado " + result);

			if (result[0]){
				context.font = "20px Arial";
				context.fillStyle = "black";
				context.fillText(result[1].toUpperCase(), x + 2, y);
				context.fillRect(x,y+15,21,5);
				lettersOK++;
			}

			//console.log("Letras OK " + lettersOK);	

			x += 26;
			//console.log("X " + x + " Y " + y);
		}

		/*for (var x = 0; x < substring.length; x++){
		
			//console.log(selectedWord.charAt(x))
			if (substring.charAt(x) == " "){
				context.fillStyle = "white";
			}else{
				context.fillStyle = "black";
			}
			
			context.fillRect(positionX,positionY,21,5);
			positionX += 26;
			
		//	console.log("X " + positionX + " Y " + positionY);

		}*/

		//console.log("Saiu do FOr " + line);

		y += 50;
		x = newX;
	}

	/*for (var charIndex = 0; charIndex < word.length; charIndex++){
	
		if (word.toLowerCase().charAt(charIndex) == letter){
			context.font = "20px Arial";
			context.fillStyle = "black";
			context.fillText(letter.toUpperCase(), x + 2, y);
			context.fillRect(x,y+15,21,5);
			lettersOK++;
		}
		x += 26;
	}*/
}

function validateNotAcceptableChar(letter){
	var notAcceptable = [" ", "-","_","!","1","2","3","4","5","6","7","8","9","0","=","+","§",")","(","*","&","¨",
				"%","$","#","@","´","`","{","[","^","~",";",":",".",">","<","]","}",")"];

	return notAcceptable.includes(letter);
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }

function validateLetter(){
	var gameWord = removeChars(word);

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
				showLetter(letter, 50, 385);
				correctLetters.push(letter);
			}else{
				wrongLetters.push(letter);
				showWrongLetters(300, 50);
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
			disableLetterField(true);
			disableLetterButton(true);
			alert("Parabéns, você finalizou o jogo");
		}
		
	}

	document.querySelector("#letter").value = "";
	document.querySelector("#letter").focus();
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

function foundLetter(gameLetter, userLetter){

	var result = [false, ""];
	//var found = false;

	console.log("Letra do jogo " + gameLetter + "|Letra informada " + userLetter);

	/*if (gameLetter == "à" || gameLetter == "á" || gameLetter == "â" || gameLetter == "ã"){
		
	}

	if ()

	/*if (gameLetter == userLetter){
		/*result.push(true);
		result.push(userLetter);
		result = [true, gameLetter];
}*/

	if (userLetter == "a" && validateLetterA(gameLetter)[0]){
		result = validateLetterA(gameLetter);
	}else if(userLetter == "e" && validateLetterE(gameLetter)[0]){
		result = validateLetterE(gameLetter);
	}else if(userLetter == "i" && validateLetterI(gameLetter)[0]){
		result = validateLetterI(gameLetter);
	}else if(userLetter == "o" && validateLetterO(gameLetter)[0]){
		result = validateLetterO(gameLetter);
	}else if(userLetter == "u" && validateLetterU(gameLetter)[0]){
		result = validateLetterU(gameLetter);
	}else if(userLetter == gameLetter){
		result = [true,gameLetter];
	}

	return result;
}

function validateLetterA(gameLetter){

	var a = ["a","à","á","â","ã"];

	for(var count = 0; count < a.length; count++){
		if (a[count] == gameLetter){
			return [true, gameLetter];
		}
	}

	return [false,""];
}

function validateLetterE(gameLetter){
	
	var e = ["e","é","è","ê"];

	for(var count = 0; count < e.length; count++){
		if (e[count] == gameLetter){
			return [true, gameLetter];
		}
	}

	return [false,""];

}

function validateLetterI(gameLetter){
	
	var i = ["i","í","ì","î"];

	for(var count = 0; count < i.length; count++){
		if (i[count] == gameLetter){
			return [true, gameLetter];
		}
	}

	return [false,""];

}

function validateLetterO(gameLetter){
	
	var o = ["o","ó","ò","ô","õ"];

	for(var count = 0; count < o.length; count++){
		if (o[count] == gameLetter){
			return [true, gameLetter];
		}
	}

	return [false,""];

}

function validateLetterU(gameLetter){
	
	var u = ["u","ü","ú","ù"];

	for(var count = 0; count < u.length; count++){
		if (u[count] == gameLetter){
			return [true, gameLetter];
		}
	}

	return [false,""];

}

var mistakes = 0;
var lettersOK;

/*function drawFaceOne(){
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
}*/

/*function drawWinGame(){

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
	context.stroke();

	drawFullSmile(195, 150);

	/*context.fillStyle = "#000";
	context.fillRect(206,175,5,100);
	drawBody(206, 175);


	armOrLegPosition(206, 200, 176, 0);

	armOrLegPosition(206, 200, 176, 1);

	armOrLegPosition(206, 274, 320, 0);

	armOrLegPosition(206, 274, 320, 1);
}*/

function validateMistakes(mistakes){
	drawHead(210, 110);
	if (mistakes == 1){
		drawFaceOne(195, 110);
	}else if (mistakes == 2){
		drawBody(206, 135);
		drawFaceTwo();
	}else if (mistakes == 3){
		drawArm(mistakes);
		drawFaceThree();
	}else if(mistakes == 4){
		drawArm(mistakes);
		drawFaceFour();
	}else if(mistakes == 5){
		drawLeg(mistakes);
		drawFaceFive();
	}else if (mistakes == 6){
		drawLeg(mistakes);
		drawFaceSix();
	}else{
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

document.querySelector("#difficulty").onchange = loadOptionStyle;

document.querySelector("#startgame").onclick = selecionarPalavras;

document.querySelector("#sendletter").onclick = validateLetter;

document.querySelector("#newGameButton").onclick = clearAll;

document.querySelector("#letter").onkeypress = callSendLetter;