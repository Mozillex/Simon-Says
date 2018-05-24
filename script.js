const pads = document.querySelectorAll('.pad');
const showLevel = n => (document.getElementById('counter').textContent = n);
let level;
let playerIndex;
let gameOver = true;
let playerTurn;
let sequence = [];

const strictIndicator = document.getElementById('indicator');
const strictMode = document.getElementById('strictMode');
let strictRules = true;

function strictToggle() {
	if (strictRules) {
		strictIndicator.style.backgroundColor = '#232323';
		strictRules = false;
	} else {
		strictIndicator.style.backgroundColor = 'yellow';
		strictRules = true;
	}
}
strictMode.onclick = strictToggle;

const start = document.getElementById('start');
const reset = document.getElementById('reset');

const getRandom = () => {
	let color = '';
	let r = Math.floor(Math.random() * 4) + 1;
	color = r === 1 ? 'green' : r === 2 ? 'red' : r === 3 ? 'blue' : 'yellow';
	return color;
};

function newGame() {
	gameOver = false;
	level = 0;
	playerIndex = 0;
	playerTurn = false;
	sequence = [];
	showLevel(level);
	let go = () => simonSays(sequence);
	setTimeout(go, 1000);
}

pads.forEach(p =>
	p.addEventListener('click', () => {
		if (!playerTurn) return;

		if (p.id !== sequence[playerIndex]) {
			let buzz = document.getElementById('buzzer');
			buzz.currentTime = 0;
			buzz.play();
			newGame();
			return;
		}
		if (p.id === sequence[playerIndex]) {
			padEvent(p.id);
			let dim = () => document.getElementById(p.id).classList.remove('lit');
			setTimeout(dim, 200);
			playerIndex++;
			if (playerIndex === sequence.length) {
				playerIndex = 0;
				showLevel(level);
				let go = () => simonSays(sequence);
				setTimeout(go, 1000);
			}
		}
	})
);

function correctResponse(level, color) {
	return sequence[level] === color;
}

function padEvent(padID) {
	document.getElementById(padID).classList.add('lit');
	const audio = document.getElementById(padID + '-audio');
	audio.preload = 'auto';
	audio.currentTime = 0;
	audio.play();
}

function simonSays(padArr) {
	playerTurn = false;

	if (padArr.length === 20) {
		gameWon();
		return;
	}
	sequence.push(getRandom());
	level++;
	let index = 0;
	let int = setInterval(speak, 500);

	function speak() {
		pads.forEach(ea => ea.classList.remove('lit'));
		let i = index;
		let id = sequence[i];
		if (index === sequence.length) playerTurn = true;

		if (index >= sequence.length) {
			clearInterval(int);
		} else {
			padEvent(id);
			index++;
		}
	}
}

function gameWon() {
	playerTurn = false;
	let int = setInterval('winFlash', 500);
	let count = 0;
	let on = false;
	function winFlash() {
		on = on ? false : true;
		if (count < 10) {
			pads.forEach(
				ea => (!on ? ea.classList.add('lit') : ea.classList.remove('lit'))
			);
		}
		if (count >= 10) {
			clearInterval(int);
			newGame();
		}
	}
}

start.onclick = newGame;
reset.onclick = newGame;
