//Dom Cache
const board1 = document.querySelector("#board1");
const b1name = document.querySelector("#board1-name");
const board2 = document.querySelector("#board2");
const b2name = document.querySelector("#board2-name");
const instruction=document.querySelector('#instruction')

export default function renderUi(player1, player2) {
	b1name.textContent = player1.name;
	b2name.textContent = player2.name;

	board1.textContent = "";
	player1.board.getBoard().forEach((array,row) =>
		array.forEach((data,col) => {
			let cell = document.createElement("div");
			cell.id=`${row}${col}`
			cell.classList.add("cell");
			if (typeof data == "object") cell.classList.add("ship");
			else if (data == 1) cell.classList.add("shot");
			else if (data == -1) cell.classList.add("missed");
			board1.appendChild(cell);
		}),
	);

	board2.textContent = "";
	player2.board.getBoard().forEach((array,row) =>
		array.forEach((data,col) => {
			let cell = document.createElement("div");
			cell.id=`${row}${col}`
			cell.classList.add("cell");
			if (typeof data == "object") cell.classList.add("ship");
			else if (data == 1) cell.classList.add("shot");
			else if (data == -1) cell.classList.add("missed");
			board2.appendChild(cell);
		}),
	);
}

export function setInstruction(str) {
	instruction.textContent=str
}
