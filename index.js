let rounds = 30;
let randomSpots = 0;
let array = [];
let x = 0, y = 0, r = 0;
let erase=0;
let n=0;
let t1=0;

document.getElementById("roundsNumber").innerHTML = rounds;

let c = document.getElementById("canvas");
let ctx = c.getContext('2d');
c.width = window.innerWidth*0.48;
c.height = window.innerHeight*0.60;

window.addEventListener('load', function(){
 	let parent = document.getElementById('numbers');
    let count = 0;
    document.getElementById('count').innerHTML = count;
    for (let i = 1; i <= 20; i++){
        var button = document.createElement('button');
		button.innerHTML = i;
		button.setAttribute("data", i);
		button.onclick = function( e ){
			count++;
			document.getElementById('count').innerHTML = count;
			checkSpots(this.getAttribute( "data" )); 
		};
		button.classList += "numbersBtn";
		parent.appendChild(button);
	}
});
    
randomSpots = Math.floor(Math.random()*6 +1); 

function checkSpots(n){
 	if (n == randomSpots){
        t1 = setTimeout(correctText, 1);
 		rounds -= 1;
 		if (rounds == 0)
 			alert('Game Over!!');
 		document.getElementById("roundsNumber").innerHTML = rounds;
 		for (let w = 0; w < randomSpots; w++){
			array[w].r = 12;
		}
 		randomSpots = Math.floor(Math.random()*6 +1);
 		erase = setTimeout(remove, 500); 
 	} else 
 		t1 = setTimeout(wrong, 1);
 	
}
	
let check = document.getElementById('check');

function wrong(){
	console.log('wrong');
	check.innerHTML = 'WRONG!';
	t1 = setTimeout(clear, 200);

}

function correctText(){
	console.log('correct');
	check.innerHTML = 'CORRECT!';
	t1 = setTimeout(clear, 200);
}

function clear(){
	check.innerHTML = '';
}

function Ball(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;

	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
	}
}

let x1 = 0, y1 = 0, y2 = 0, x2 = 0, xD = 0, yD = 0;

function getDistance(x1, x2, y1, y2){
	xD = x2 - x1;
	yD = y2 - y1;
	return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
}

for (let i = 0; i < 20; i++){
	x = (Math.random()*(c.width-40))+20;
	y = (Math.random()*(c.height-40))+20;
	r = 12;
	array.push(new Ball(x, y, r));
	for (let p = 0; p < i; p++){
		if (array[p].x == array[i].x || array[p].y == array[i].y){
			x = (Math.random()*(c.width-40))+20;
			y = (Math.random()*(c.height-40))+20;
			p = -1;
		}
    }
}

animate();

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let j = 0; j < randomSpots; j++){
		array[j].draw();
	}
}

erase = setTimeout(remove, 500);
   
function remove(){
	for (let q = 0; q < randomSpots; q++){
		array[q].r = 0;
	}
}