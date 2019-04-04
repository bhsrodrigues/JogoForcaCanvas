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
	
	context.beginPath();
	context.arc(x-10,y-10,1,0,2 * Math.PI);
	context.stroke();
	
	context.beginPath();
	context.arc(x+10,y-10,1,0,2 * Math.PI);
	context.stroke();
	
}

/*
function drawBody(){
	
	context.fillStyle = "black";
	context.fillRect(206,135,5,100);
}
*/