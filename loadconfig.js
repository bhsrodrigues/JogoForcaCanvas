var select = document.querySelector("#gameoptions");

for(var position = 0; position < categoryList.length; position++){
    var opt = document.createElement("option");

    opt.appendChild(document.createTextNode(categoryList[position]));

    opt.value = categoryList[position];

    opt.id = removeChars(categoryList[position].toLowerCase(),true, true, true).toLowerCase();
    select.appendChild(opt);

}

function removeChars(word, removeSpace, removeAccent, replaceChar){
	
	var tempWord = word;
	var specialChars = ["-","_",":",",","!","?",".",";",
					"%","$","#","@","´","`","{","[","^","~",";",":",".",">","<","]","}",")"];

	var charAccent = ["á","à","à","ã","é","è","ê","í","ì","ì","õ","ó","ò","ô","ú","ù","û","ü"];

	if (removeAccent) {
		tempWord = validateCharArrays(charAccent, true,tempWord);

	}

	if (replaceChar){
		
		tempWord = validateCharArrays(specialChars, false,tempWord);

	}

	if (removeSpace){
		tempWord = validateCharArrays([" "], false, tempWord);
	}
	
	return tempWord;
}

function validateCharArrays(array, accent, tempWord){
	
	for(var arrayIndex = 0; arrayIndex < array.length; arrayIndex++){
	
		var char = array[arrayIndex];
		var totalItens = 0;
	
		for(var charIndex = 0; charIndex < tempWord.length; charIndex++){
			if(tempWord.charAt(charIndex) == char){
				totalItens++;
			}
		}

		var count = 0;
		while(count < totalItens){
		
			if (accent){
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
				}
			}else{
				if(array.length == 1){
					tempWord = tempWord.replace(char,"");
				}else{
					tempWord = tempWord.replace(char," ");
				}
			}

			count++;
		}
	}

	return tempWord;
}