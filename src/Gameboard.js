import Ship from "./Ship";

class Gameboard {
	#board;
	#isHidden;
	constructor() {
		this.#board = [];
		this.#isHidden = false;
		for (let i = 0; i < 10; i++) {
			this.#board.push([]);
			for (let j = 0; j < 10; j++) {
				this.#board[i].push(0);
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
	placeShip(x, y, length) {
		let ship = new Ship(length);
		if (x + length - 1 < 10) {
			for (let i = 0; i < length; i++) {
				this.#board[y][x + i] = ship;
			}
		}
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
        return true
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
