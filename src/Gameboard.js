import Ship from "./Ship";

class Gameboard {
	#board;
	#isHidden;
	#shipCount;
	constructor() {
		this.#board = [];
		this.#isHidden = false;
		this.#shipCount = 0;
		for (let i = 0; i < 10; i++) {
			this.#board.push([]);
			for (let j = 0; j < 10; j++) {
				this.#board[i].push(0);
			}
		}
	}
	get shipCount() {
		return this.#shipCount;
	}
	autoPlaceShip() {
		for (let i = 5; i > 0; i--) {
			let x = parseInt(Math.random() * 10),
				y = parseInt(Math.random() * 10);
			while (!this.placeShip(x, y, i)) {
				x = parseInt(Math.random() * 10);
				y = parseInt(Math.random() * 10);
			}
		}
	}
	getBoard() {
		if (this.#isHidden) {
			let hiddenboard = [];
			for (let i = 0; i < 10; i++) {
				hiddenboard.push([]);
				for (let j = 0; j < 10; j++) {
					if (typeof this.#board[i][j] == "object") {
						hiddenboard[i].push(0);
					} else hiddenboard[i].push(this.#board[i][j]);
				}
			}
			return hiddenboard;
		}
		return [...this.#board];
	}
	isPlacable(x, y, length) {
		if (y + length - 1 >= 10) return false;
		for (let i = -1; i < length + 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (y + i >= 0 && y + i < 10 && x + j >= 0 && x + j < 10) {
					if (typeof this.#board[y + i][x + j] == "object") {
						return false;
					}
				}
			}
		}
		return true;
	}
	placeShip(x, y, length) {
		if (this.isPlacable(x, y, length)) {
			let ship = new Ship(length);
			this.#shipCount++;
			for (let i = 0; i < length; i++) {
				this.#board[y + i][x] = ship;
			}
			return true;
        }
		return false;
	}
	receiveAttack(x, y) {
		if (typeof this.#board[y][x] == "object") {
			this.#board[y][x].hit();
			this.#board[y][x] = 1;
		} else if (this.#board[y][x] == 1 || this.#board[y][x] == -1) {
			return false;
		} else {
			this.#board[y][x] = -1;
		}
		return true;
	}
	areAllSunk() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (typeof this.#board[i][j] == "object") return false;
			}
		}
		return true;
	}
	hide() {
		this.#isHidden = true;
	}
	unhide() {
		this.#isHidden = false;
	}
}

export default Gameboard;
