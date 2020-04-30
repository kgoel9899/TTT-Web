var symbols = ['X', 'O'];
var board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
var wins = -1;
var heads = document.getElementsByTagName("th");
var prevturn = 0;
var turn = prevturn;
function func(idd) {
	// console.log(idd[1]);
	var i = idd[1] - '0';
	var j = idd[2] - '0';
	if(board[i][j] == '.') {
		// console.log(turn);
		document.getElementById(idd).innerText = symbols[turn];
		// document.getElementById(idd).setAttribute("class", "styl");
		console.log(heads[0]);
		if(turn == 0) {
			heads[1].setAttribute("class", "styl");
			heads[0].classList.remove("styl");
		} else {
			heads[0].setAttribute("class", "styl");
			heads[1].classList.remove("styl");
		}
		board[i][j] = symbols[turn];
		var ans = check(symbols[turn]);
		var d = draw();
		turn ^= 1;
		if(ans === 0) { //player 1 wins
			wins = 0;
			heads[0].classList.remove("styl");
			heads[1].classList.remove("styl");
			setTimeout(function() {
			  	alert("Congratulations, Player 1" + " won.");
			}, 10);
			setTimeout(reset, 100);
		} else if(ans === 1) { //player 2 wins
			heads[0].classList.remove("styl");
			heads[1].classList.remove("styl");
			wins = 1;
			setTimeout(function() {
			  	alert("Congratulations, Player 2 " + " won.");
			}, 10);
			setTimeout(reset, 100);
		} else if(d === 1) {
			heads[0].classList.remove("styl");
			heads[1].classList.remove("styl");
			setTimeout(function() {
			  	alert("It's a Draw.");
			}, 10);
			setTimeout(reset, 100);
		}
	}
}

function check(p) {
	// console.log(p);
	var flag = 0;
	for(var i=0;i<3;i++) {
		if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === p) {
			var id1 = "c" + i + 0, id2 = "c" + i + 1, id3 = "c" + i + 2;
			document.getElementById(id1).setAttribute("class", "styl");
			document.getElementById(id2).setAttribute("class", "styl");
			document.getElementById(id3).setAttribute("class", "styl");
			flag = 1;
			break;
		}
	}
	for(var i=0;i<3;i++) {
		if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === p) {
			var id1 = "c" + 0 + i, id2 = "c" + 1 + i, id3 = "c" + 2 + i;
			document.getElementById(id1).setAttribute("class", "styl");
			document.getElementById(id2).setAttribute("class", "styl");
			document.getElementById(id3).setAttribute("class", "styl");
			flag = 1;
			break;
		}
	}
	if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === p) {
		var id1 = "c" + 0 + 0, id2 = "c" + 1 + 1, id3 = "c" + 2 + 2;
		document.getElementById(id1).setAttribute("class", "styl");
		document.getElementById(id2).setAttribute("class", "styl");
		document.getElementById(id3).setAttribute("class", "styl");
		flag = 1;
	}
	if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === p) {
		var id1 = "c" + 0 + 2, id2 = "c" + 1 + 1, id3 = "c" + 2 + 0;
		document.getElementById(id1).setAttribute("class", "styl");
		document.getElementById(id2).setAttribute("class", "styl");
		document.getElementById(id3).setAttribute("class", "styl");
		flag = 1;
	}
	if(flag === 1) {
		if(p === 'X') {
			return 0;
		} else {
			return 1;
		}
	}
}

function reset() {
	var psc1, psc2, pi1, pi2;
	if(wins == 0) {
		psc1 = document.getElementById("p1score");
		psc2 = document.getElementById("p2score");
		pi1 = psc1.innerText;
		pi2 = psc2.innerText;
	} else if(wins == 1) {
		psc1 = document.getElementById("p2score");
		psc2 = document.getElementById("p1score");
		pi1 = psc1.innerText;
		pi2 = psc2.innerText;
	} else {
		psc1 = document.getElementById("p1score");
		psc2 = document.getElementById("p2score");
		pi1 = psc1.innerText;
		pi2 = psc2.innerText;
	}
	var all = document.getElementsByTagName("td");
	for(var i=0;i<all.length;i++) {
		all[i].innerText = '';
		all[i].classList.remove("styl");
	}
	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++) {
			board[i][j] = '.';
		}
	}
	if(wins != -1) {
		psc1.innerText = (pi1 - '0') + 1;
		psc2.innerText = pi2;
	} else {
		psc1.innerText = pi1;
		psc2.innerText = pi2;
	}
	wins = -1;
	prevturn ^= 1;
	turn = prevturn;
	if(turn == 0) {
		heads[0].setAttribute("class", "styl");
		heads[1].classList.remove("styl");
	} else {
		heads[1].setAttribute("class", "styl");
		heads[0].classList.remove("styl");
	}
}

function draw() {
	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++) {
			if(board[i][j] == '.') {
				return 0;
			}
		}
	}
	return 1;
}

function fullrst() {
	var all = document.getElementsByTagName("td");
	for(var i=0;i<all.length;i++) {
		all[i].innerText = '';
		all[i].classList.remove("styl");
	}
	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++) {
			board[i][j] = '.';
		}
	}
	heads[0].classList.remove("styl");
	heads[1].classList.remove("styl");
	var psc1 = document.getElementById("p1score");
	var psc2 = document.getElementById("p2score");
	psc1.innerText = 0;
	psc2.innerText = 0;
	prevturn = 0;
	turn = prevturn;
	heads[0].setAttribute("class", "styl");
}