var select = document.querySelector("#gameoptions");

for(var position = 0; position < categoryList.length; position++){
    var opt = document.createElement("option");

    opt.appendChild(document.createTextNode(categoryList[position]));

    opt.value = categoryList[position];

    opt.id = removeChars(categoryList[position]).toLowerCase();

    select.appendChild(opt);

}

function removeChars(word){
	var totalItens = 0;
	for(var x = 0; x < word.length; x++){
		//console.log("Achou item");
		if ((word.charAt(x) == " ") || (word.charAt(x) == "-") || (word.charAt(x) == ",")){
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