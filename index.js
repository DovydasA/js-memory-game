const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan', 'magenta', 'lime', 'pink', 'teal', 'brown', 'maroon'];
const gridSize = 4;
const gridArr = [];

function selectRandomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const makeGrid = (gridArr, gridSize) => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			gridArr.push({
				column: j,
				row: i,
				id: `${j}${i}`,
				color: 'grey',
			});
		}
	}
};

makeGrid(gridArr, gridSize);
shuffleArray(colors);
let newColors = colors.slice(0, gridSize * 2);

newColors.forEach((color) => {
	for (let i = 0; i < 2; i++) {
		let card;
		do {
			card = selectRandomItem(gridArr);
		} while (card.color != 'grey');
		card.color = color;
	}
});

console.table(gridArr);

const turnedCards = [];
let points = 0;
let cardsLeft = 16;

const grid = document.createElement('div');
grid.className = 'grid';
grid.addEventListener('click', (e) => {
	if (e.target.style.backgroundColor !== 'black') return;
	let id = e.target.id;
	let index = gridArr.findIndex((obj) => obj.id === id);

	e.target.style.backgroundColor = gridArr[index].color;

	turnedCards.push(index);
	console.log(turnedCards);
	if (turnedCards.length === 2) {
		if (gridArr[turnedCards[0]].color === gridArr[turnedCards[1]].color) {
			console.log('same color');
			points += 10;
			cardsLeft -= 2;
			console.log(cardsLeft);
			if (cardsLeft === 0) alert('game ended' + points);
		} else {
			console.log('different color');
			points -= 1;
			turnedCards.forEach((card) => {
				setTimeout(() => {
					document.getElementById(gridArr[card].id).style.backgroundColor = 'black';
				}, 500);
			});
		}
		turnedCards.length = 0;
	}
	console.log(points);
});

gridArr.forEach((cell) => {
	const card = document.createElement('div');
	card.className = 'card';
	card.id = cell.id;
	card.style.backgroundColor = 'black';
	grid.appendChild(card);
});
document.body.append(grid);

const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.className = 'reset-btn';
resetBtn.addEventListener('click', (e) => {
	console.log('reset button');
	points = 0;
	cardsLeft = 16;
	turnedCards.length = 0;
	gridArr.forEach((card) => {
		card.color = 'grey';
		document.getElementById(card.id).style.backgroundColor = 'black';
	});

	shuffleArray(colors);
	newColors = colors.slice(0, gridSize * 2);

	newColors.forEach((color) => {
		for (let i = 0; i < 2; i++) {
			let card;
			do {
				card = selectRandomItem(gridArr);
			} while (card.color != 'grey');
			card.color = color;
		}
	});
	console.table(gridArr);
});
document.body.append(resetBtn);
