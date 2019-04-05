

var opcoes = ["Bandas", "Filmes", "Livros"];

var select = document.querySelector("#gameoptions");

for(var position = 0; position < opcoes.length; position++){
    var opt = document.createElement("option");

    opt.appendChild(document.createTextNode(opcoes[position]));

    opt.value = opcoes[position];

    opt.id = removeChars(opcoes[position]).toLowerCase();

    select.appendChild(opt);

}


var bands = ["Metallica", "Iron Maiden", "Arctic Monkeys"];
var movies = ["Se beber não case", "Pulp Fiction", "Clube da Luta"];
var books = ["O iluminado", "A batalha do apocalipse", "Dança da morte"];
var optionInGame = [bands,movies,books];

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