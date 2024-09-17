import Gameboard from "./Gameboard";

class Player {
	constructor(name) {
		this.name = name;
		this.board = new Gameboard();
	}
	computerMove() {
		return [parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
	}
}

export default Player;
