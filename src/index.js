import "./style.css";
import Player from "./Player";
import renderUi, {
	setInstruction,
	toggleActiveBoard,
	showPassDevice,
	hidePassDevice,
	showShip,
} from "./Ui";

//Dom cache
const onePlayer = document.querySelector("#one-player");
const twoPlayer = document.querySelector("#two-player");
const board1 = document.querySelector("#board1");
const board2 = document.querySelector("#board2");
const passDevice = document.querySelector("#pass-device>button");

//Binding events
onePlayer.addEventListener("click", initOnePlayer);
twoPlayer.addEventListener("click", initTwoPlayer);
passDevice.addEventListener("click", passDeviceHandler);

let player1, player2, activePlayer, gameMode;

//Initialzing logic
initOnePlayer();

function initOnePlayer() {
	gameMode = 1;
	player1 = new Player("You");
	player2 = new Player("Computer");
	player2.board.hide();
	player2.board.autoPlaceShip();
	toggleActiveBoard("board1");
	showShip(5);
	board1.addEventListener("click", placeShipHandler1);
	hidePassDevice();
	board2.removeEventListener("click", twoPlayerBoard2ClickHandler);
	board1.removeEventListener("click", twoPlayerBoard1ClickHandler);
	renderUi(player1, player2);
}

function initTwoPlayer() {
	gameMode = 2;
	player1 = new Player("Player1");
	player2 = new Player("Player2");
	hidePassDevice();
	board2.removeEventListener("click", onePlayerBoardClickHandler);
	board1.addEventListener("click", placeShipHandler1);
	toggleActiveBoard("board1");
	showShip(5);
	renderUi(player1, player2);
}

//Running logic
function placeShipHandler1(e) {
	if (!e.target.classList.contains("cell")) {
		return;
	}
	let y = parseInt(e.target.id[0]),
		x = parseInt(e.target.id[1]);
	switch (player1.board.shipCount) {
		case 0:
			if (player1.board.placeShip(x, y, 5)) {
				showShip(4);
			}
			break;
		case 1:
			if (player1.board.placeShip(x, y, 4)) {
				showShip(3);
			}
			break;
		case 2:
			if (player1.board.placeShip(x, y, 3)) {
				showShip(2);
			}
			break;
		case 3:
			if (player1.board.placeShip(x, y, 2)) {
				showShip(1);
			}
			break;
		default: {
			if (player1.board.placeShip(x, y, 1)) {
				showShip(0);
				if (gameMode == 1) {
					toggleActiveBoard("board2");
					board1.removeEventListener("click", placeShipHandler1);
					board2.addEventListener("click", onePlayerBoardClickHandler);
					setInstruction("Your turn");
				} else {
					showPassDevice();
					board1.removeEventListener("click", placeShipHandler1);
					passDevice.removeEventListener("click", passDeviceHandler);
					passDevice.addEventListener("click", passDevicePlacementHandler);
				}
			}
		}
	}
	renderUi(player1, player2);
}

function placeShipHandler2(e) {
	if (!e.target.classList.contains("cell")) {
		return;
	}
	let y = parseInt(e.target.id[0]),
		x = parseInt(e.target.id[1]);
	switch (player2.board.shipCount) {
		case 0:
			if (player2.board.placeShip(x, y, 5)) {
				showShip(4);
			}
			break;
		case 1:
			if (player2.board.placeShip(x, y, 4)) {
				showShip(3);
			}
			break;
		case 2:
			if (player2.board.placeShip(x, y, 3)) {
				showShip(2);
			}
			break;
		case 3:
			if (player2.board.placeShip(x, y, 2)) {
				showShip(1);
			}
			break;
		default: {
			if (player2.board.placeShip(x, y, 1)) {
				showShip(0);
				player1.board.hide();
				player2.board.hide();
				renderUi(player1, player2);
				showPassDevice();
				board2.removeEventListener("click", placeShipHandler2);
			}
		}
	}
	renderUi(player1, player2);
}

function onePlayerBoardClickHandler(e) {
	if (!e.target.classList.contains("cell")) {
		return;
	}
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player2.board.receiveAttack(x, y)) {
		if (player2.board.areAllSunk()) {
			setInstruction("Player1 won!");
			board2.removeEventListener("click", onePlayerBoardClickHandler);
		} else {
			[x, y] = player2.computerMove();
			while (!player1.board.receiveAttack(x, y)) {
				[x, y] = player2.computerMove();
			}
			if (player1.board.areAllSunk()) {
				setInstruction("Computer won!");
				board2.removeEventListener("click", onePlayerBoardClickHandler);
			}
		}
		renderUi(player1, player2);
	}
}

function twoPlayerBoard1ClickHandler(e) {
	if (!e.target.classList.contains("cell")) {
		return;
	}
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player1.board.receiveAttack(x, y)) {
		if (player1.board.areAllSunk()) {
			setInstruction("Player2 won!");
		} else {
			player1.board.hide();
			player2.board.hide();
			renderUi(player1, player2);
			showPassDevice();
		}
		board1.removeEventListener("click", twoPlayerBoard1ClickHandler);
		renderUi(player1, player2);
	}
}

function passDevicePlacementHandler() {
	passDevice.removeEventListener("click", passDevicePlacementHandler);
	passDevice.addEventListener("click", passDeviceHandler);
	hidePassDevice();
	player2.board.unhide();
	toggleActiveBoard("board2");
	player1.board.hide();
	board2.addEventListener("click", placeShipHandler2);
	showShip(5);
	renderUi(player1, player2);
}

function passDeviceHandler() {
	hidePassDevice();
	if (activePlayer == player1) {
		activePlayer = player2;
		player1.board.hide();
		player2.board.unhide();
		board1.addEventListener("click", twoPlayerBoard1ClickHandler);
		board2.removeEventListener("click", twoPlayerBoard2ClickHandler);
		toggleActiveBoard("board1");
		setInstruction("Player2's turn");
	} else {
		activePlayer = player1;
		player2.board.hide();
		player1.board.unhide();
		board2.addEventListener("click", twoPlayerBoard2ClickHandler);
		board1.removeEventListener("click", twoPlayerBoard1ClickHandler);
		toggleActiveBoard("board2");
		setInstruction("Player1's turn");
	}
	renderUi(player1, player2);
}

function twoPlayerBoard2ClickHandler(e) {
	if (!e.target.classList.contains("cell")) {
		return;
	}
	let y = e.target.id[0],
		x = e.target.id[1];
	if (player2.board.receiveAttack(x, y)) {
		if (player2.board.areAllSunk()) {
			setInstruction("Player1 won!");
		} else {
			player1.board.hide();
			player2.board.hide();
			renderUi(player1, player2);
			showPassDevice();
		}
		board2.removeEventListener("click", twoPlayerBoard2ClickHandler);
		renderUi(player1, player2);
	}
}
