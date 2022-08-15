var symbols = ['X', 'O'];
var board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
var wins = -1;
var heads = document.getElementsByTagName("th");
var turn = 0;
var comp_enabled = 0;
var result = document.getElementById("winner");
var p1sc = document.getElementById("p1score");
var p2sc = document.getElementById("p2score");
var all = document.getElementsByClassName("box");
var mode = document.getElementById("mode");

function place_sym(id) {
	var i = id[1] - '0';
	var j = id[2] - '0';
	if(board[i][j] == '.' && wins === -1) {
		if(comp_enabled == 1) {
			document.getElementById(id).innerText = symbols[turn];
			board[i][j] = symbols[turn];
			var ans = check_game(symbols[turn]);
			var d = draw();
			if(ans === 0) {
				wins = 0;
				result.innerText = "Player Won!"
				update_score();
			} else if(d == 1) {
				result.innerText = "It's a draw!"
			} else {
				computerChance();
				ans = check_game('O');
				d = draw();
				if(ans === 1) {
					wins = 1;
					result.innerText = "Computer Won!"
					update_score();
				} else if(d === 1) {
					result.innerText = "It's a draw!"
				}
			}
		} else {
			document.getElementById(id).innerText = symbols[turn];
			board[i][j] = symbols[turn];
			var ans = check_game(symbols[turn]);
			var d = draw();
			if(ans === 0) {
				wins = 0;
				result.innerText = "Player 1 Won!"
				update_score();
			} else if(ans === 1) {
				wins = 1;
				result.innerText = "Player 2 Won!"
				update_score();
			} else if(d === 1) {
				result.innerText = "It's a draw!"
			} else {
				if(turn == 0) {
					heads[1].classList.add("chance");
					heads[0].classList.remove("chance");
				} else {
					heads[0].classList.add("chance");
					heads[1].classList.remove("chance");
				}
			}
			turn ^= 1;
		}
	}
}

function draw_winning_line(id1, id2, id3) {
	document.getElementById(id1).classList.add("won");
	document.getElementById(id2).classList.add("won");
	document.getElementById(id3).classList.add("won");
}

function who_won(sym) {
	if(sym === 'X') return 0; // player 1 won
	else return 1; // player 2 won
}

function check_game(sym) {
	var flag = 0;
	for(var i=0;i<3;i++) {
		if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === sym) {
			var id1 = "c" + i + 0, id2 = "c" + i + 1, id3 = "c" + i + 2;
			draw_winning_line(id1, id2, id3);
			flag = 1;
			break;
		}
	}
	if(flag === 1) return who_won(sym);

	for(var i=0;i<3;i++) {
		if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === sym) {
			var id1 = "c" + 0 + i, id2 = "c" + 1 + i, id3 = "c" + 2 + i;
			draw_winning_line(id1, id2, id3);
			flag = 1;
			break;
		}
	}
	if(flag === 1) return who_won(sym);

	if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === sym) {
		var id1 = "c" + 0 + 0, id2 = "c" + 1 + 1, id3 = "c" + 2 + 2;
		draw_winning_line(id1, id2, id3);
		flag = 1;
	}
	if(flag === 1) return who_won(sym);

	if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === sym) {
		var id1 = "c" + 0 + 2, id2 = "c" + 1 + 1, id3 = "c" + 2 + 0;
		draw_winning_line(id1, id2, id3);
		flag = 1;
	}
	if(flag === 1) return who_won(sym);

	return -1; // nobody won
}

function computerChance() {
	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++) {
			if(board[i][j] === '.') {
				board[i][j] = 'O';
				var id1 = "c" + i + j;
				document.getElementById(id1).innerText = 'O';
				return;
			}
		}
	}
}

function update_score() {
	var psc1, psc2, pi1, pi2;
	if(wins == 0) {
		p1sc.innerText = (p1sc.innerText - '0') + 1;
	} else if(wins == 1) {
		p2sc.innerText = (p2sc.innerText - '0') + 1;
	}
}

function reset() {
	winner.innerText = "";
	for(var i=0;i<all.length;i++) {
		all[i].innerText = '';
		all[i].classList.remove("won");
	}
	for(var i=0;i<3;i++) {
		for(var j=0;j<3;j++) {
			board[i][j] = '.';
		}
	}
	wins = -1;
	turn = 0;
	heads[0].classList.add("chance");
	heads[1].classList.remove("chance");
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

function mode_change() {
	if(mode.innerText == "MULTIPLAYER?") {
		mode.innerText = "PLAY WITH COMPUTER?";
		heads[0].innerText = "PLAYER 1 (X)";
		heads[1].innerText = "PLAYER 2 (O)";
		comp_enabled = 0;
	} else {
		mode.innerText = "MULTIPLAYER?";
		heads[0].innerText = "PLAYER (X)";
		heads[1].innerText = "COMPUTER (O)";
		heads[0].classList.add("styl");
		heads[1].classList.remove("styl");
		comp_enabled = 1;
	}
	wins = -1;
	full_reset();
}

function full_reset() {
	reset();
	p1sc.innerText = 0;
	p2sc.innerText = 0;
}