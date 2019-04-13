var select = document.querySelector("#gameoptions");

for(var position = 0; position < categoryList.length; position++){
    var opt = document.createElement("option");

    opt.appendChild(document.createTextNode(categoryList[position]));

    opt.value = categoryList[position];

    opt.id = removeChars(categoryList[position].toLowerCase(),true, false).toLowerCase();
    select.appendChild(opt);

}

function removeChars(word, removeSpace, replaceChar){
	
	var tempWord = word;
	var charsToRemove = ["á","à","à","ã","é","è","ê","í","ì","ì","õ","ó","ò","ô","ú","ù","û","ü"," ","-","_",":",",","!","?","1",".",";",
					"%","$","#","@","´","`","{","[","^","~",";",":",".",">","<","]","}",")"];
	/*for(var x = 0; x < word.length; x++){
		//console.log("Achou item");
		if ((word.charAt(x) == " ") || (word.charAt(x) == "-") || (word.charAt(x) == ",") || 
			(word.charAt(x) == " ") || (word.charAt(x) == "-") || (word.charAt(x) == ",")){
			totalItens++;
		}

		var count = 0;
		while(count < totalItens){
			tempWord = tempWord.replace(" ","").replace("-","",).replace("_","");
			count++;
		}
	}*/



	for(var arrayIndex = 0; arrayIndex < charsToRemove.length; arrayIndex++){
	
		//console.log(charsToRemove[arrayIndex]);
		var char = charsToRemove[arrayIndex];
		var totalItens = 0;
	
		for(var charIndex = 0; charIndex < tempWord.length; charIndex++){
			if(tempWord.charAt(charIndex) == char){
				totalItens++;
			}
		}

		var count = 0;
		while(count < totalItens){
			console.log("Char " + charsToRemove[arrayIndex]);
			
			count++;

			if(char == "á" || char == "à" || char == "â" || char == "ã"){
				tempWord = tempWord.replace(char,"a");
			}else if(char == "é" || char == "ê" || char == "è"){
				tempWord = tempWord.replace(char,"e");
			}else if(char == "í" || char == "ì" || char == "î"){
				tempWord = tempWord.replace(char,"i");
			}else if(char == "ó" || char == "ò" || char == "ô" || char == "õ"){
				tempWord = tempWord.replace(char,"o");
			}else if(char == "ú" || char == "ù" || char == "ü" || char == "û"){
				tempWord = tempWord.replace(char,"u");
			}else if(char == " "){
				if(removeSpace){
					tempWord = tempWord.replace(char,"");
				}
			}else{
				if(replaceChar){
					tempWord = tempWord.replace(char," ");
				}else{
					tempWord = tempWord.replace(char,"");
				}
				
			}

		}

	}

	//console.log(tempWord + "asdfghjk");

	return tempWord;
}