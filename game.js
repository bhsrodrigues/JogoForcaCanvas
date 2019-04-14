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

var word = "";

function selecionarPalavras(){
	
	mistakes = 0;
	getDificulty();
	lettersOK = 0;
	
	var comboitem = document.querySelector("#gameoptions").value.toLowerCase();
	var selectedItem;
	var category;
	
	if (getDificulty() == ""){
		alert("Selecione uma dificuldade");
		return;
	}

	if (comboitem == "" ){
		alert("Selecione um item");
		document.querySelector("#letter").disabled=true;
		document.querySelector("#sendletter").disabled=true;
		return;
	}else{
		
		for(var counter = 0; counter < categoryList.length; counter++){
			if (comboitem == categoryList[counter].toLowerCase()){
				selectedItem = optionsInGame[counter];
				category =  categoryList[counter];
				break;
			}
		}

		if (selectedItem == undefined){
			alert("Categoria " + category + " não tem opções para jogo. " + 
			"Selecione outra categoria ou informe termos para a categoria em questão.");
			return;
		}

		word = removeChars(getWord(selectedItem),false,false,true);
		drawWordFields(word);
		allLetters = [];
		wrongLetters = [];
		lettersOK = [];


		if (mistakes == 2){
			hard();
		}else if (mistakes == 4){
			veryHard();
		}else if (mistakes == 6){
			extreme();
		}

		disableNewGameButton(false);
		disableLetterButton(false);
		disableLetterField(false);
		document.querySelector("#gameoptions").disabled = true;
		document.querySelector("#difficulty").disabled = true;
		disableStartButton(true);

		document.querySelector("#letter").focus();
		
	}
	
}

function getDificulty(){

	var difficulty = document.querySelector("#difficulty").value.toLowerCase();

	if (difficulty == "normal"){
		mistakes = 0;
	}else if(difficulty == "dificil"){
		mistakes = 2;
	}else if(difficulty == "muitodificil"){
		mistakes = 4;
	}else{
		mistakes = 6;
	}

	return difficulty;
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

		if (line == 0){
			substring = word.substring(index,lines[line]);
			index+= lines[line];
		}else if(line == lines.length - 1){
			substring = word.substring(index);
		}else{
			substring = word.substring(index,lines[line]+index);
			index += lines[line];
		}

		for (var charIndex = 0; charIndex < substring.length; charIndex++){
	
			var result = foundLetter(substring.toLowerCase().charAt(charIndex),letter.toLowerCase());

			if (result[0]){
				context.font = "20px Arial";
				context.fillStyle = "black";
				if (result[1] == "i" || result[1] == "í" || result[1] == "î" || result[1] == "ì"){
					context.fillText(result[1].toUpperCase(), x + 7, y);
				}else{
					context.fillText(result[1].toUpperCase(), x + 4, y);
				}
				
				context.fillRect(x,y+15,21,5);
				lettersOK++;
			}

			x += 26;

		}

		y += 50;
		x = newX;
	}

}

function validateNotAcceptableChar(letter){
	var notAcceptable = [" ", "-","_","!","=","+","§",")","(","*","&","¨",
				"%","$","#","@","´","`","{","[","^","~",";",":",".",">","<","]","}",")"];

	return notAcceptable.includes(letter);
}

function validateLetter(){
	var gameWord = removeChars(word, true, false,true);
	
	var input = document.querySelector("#letter");
	var letter = input.value.toLowerCase();

	if(input.value.length == 0){
		document.querySelector("section > span").style["display"] = "block";
		document.querySelector("section > span").style["margin"] = "0.4% 0 0.4% 33.4%";
		canvas.style["margin-top"] = "0";
		input.style["border-color"] = "#f00";
		return;
	}

	if (validateNotAcceptableChar(letter)){
		alert("Caracter informado não é válido");
	}else{
		var playedLetterBefore = false;

		document.querySelector("section > span").style["display"] = "none";
		canvas.style["margin-top"] = "2%";
		input.style["border-color"] = "";

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
		
		if (wrongLetters[arrayIndex].toLowerCase() == "i" || wrongLetters[arrayIndex].toLowerCase() == "í" 
		|| wrongLetters[arrayIndex].toLowerCase() == "î" || wrongLetters[arrayIndex].toLowerCase() == "ì"){
			context.fillText(wrongLetters[arrayIndex].toUpperCase(), x + 7, y);
		}else{
			context.fillText(wrongLetters[arrayIndex].toUpperCase(), x + 4, y);
		}
		context.fillRect(x,y+15,21,3);
		x += 26;
	}
}

function foundLetter(gameLetter, userLetter){

	var result = [false, ""];

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
	disableCombo(false, "#gameoptions");
	disableCombo(false, "#difficulty");
	disableStartButton(false);
	disableLetterField(true);
	disableLetterButton(true);
	disableNewGameButton(true);
}

function disableCombo(disable, combo){
	var combo = document.querySelector(combo);
	combo.style["background-color"] = "#fff";
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