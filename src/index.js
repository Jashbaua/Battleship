import "./style.css";
import Player from "./Player";
import renderUi, { setInstruction ,setActiveBoard,showPassDevice,hidePassDevice} from "./Ui";

//Dom cache
const onePlayer = document.querySelector("#one-player");
const twoPlayer = document.querySelector("#two-player");
const board1 = document.querySelector("#board1");
const board2 = document.querySelector("#board2");
const passDevice=document.querySelector('#pass-device>button')

//Binding events
onePlayer.addEventListener("click", initOnePlayer);
twoPlayer.addEventListener("click", initTwoPlayer);
passDevice.addEventListener("click",toggleActivePlayer)

let player1, player2, activePlayer;

initOnePlayer();

function setboards() {
	player1.board.placeShip(0, 8, 1);
	player2.board.placeShip(0, 0, 5);
	player2.board.placeShip(0, 2, 4);
	player2.board.placeShip(0, 4, 3);
	player2.board.placeShip(0, 6, 2);
	player2.board.placeShip(0, 8, 1);
}

function initOnePlayer() {
	player1 = new Player("You");
	player2 = new Player("Computer");
	player2.board.hide();
	setActiveBoard('board2')
	board2.removeEventListener("click", board2ClickHandler);
	board1.removeEventListener("click", board1ClickHandler);
	board2.addEventListener("click", onePlayerClickHandler);
	setboards();
	renderUi(player1, player2);
}

function initTwoPlayer() {
	player1 = new Player("Player1");
	player2 = new Player("Player2");
	board2.removeEventListener("click", onePlayerClickHandler);
	toggleActivePlayer();
	setboards();
	renderUi(player1, player2);
}

function toggleActivePlayer() {
	hidePassDevice()
	if (activePlayer == player1) {
		activePlayer = player2;
		player1.board.hide();
		player2.board.unhide();
		board1.addEventListener("click", board1ClickHandler);
		board2.removeEventListener("click", board2ClickHandler);
		setActiveBoard('board1')
		setInstruction("Player2's turn");
	}
	else {
		activePlayer = player1;
		player2.board.hide();
		player1.board.unhide();
		board2.addEventListener("click", board2ClickHandler);
		board1.removeEventListener("click", board1ClickHandler);
		setActiveBoard('board2')
		setInstruction("Player1's turn");
	}
	renderUi(player1,player2)
}
function board2ClickHandler(e) {
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player2.board.receiveAttack(x, y)) {
		if (player2.board.areAllSunk()) {
			setInstruction("Player1 won!");
		} else showPassDevice();
		board2.removeEventListener("click", board2ClickHandler);
		renderUi(player1,player2)
	}
}
function board1ClickHandler(e) {
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player1.board.receiveAttack(x, y)) {
		if (player1.board.areAllSunk()) {
			setInstruction("Player2 won!");
		} else showPassDevice();
		board1.removeEventListener("click", board1ClickHandler);
		renderUi(player1,player2)
	}
}

function onePlayerClickHandler(e) {
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player2.board.receiveAttack(x, y)) {
		if (player2.board.areAllSunk()) {
			setInstruction("Player1 won!");
			board2.removeEventListener("click", onePlayerClickHandler);
		} else {
			[x, y] = player2.computerMove()
			while (!player1.board.receiveAttack(x, y)) {
				[x, y] = player2.computerMove()
			}
			if (player1.board.areAllSunk()) {
				setInstruction("Computer won!");
				board2.removeEventListener("click", onePlayerClickHandler);
			}
		}
		renderUi(player1, player2);
	}
}
