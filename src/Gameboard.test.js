import Gameboard from "./Gameboard";
import Ship from "./Ship";

test("Ship placement", () => {
    let gameboard = new Gameboard()
    gameboard.placeShip(1, 1, 4)
    let result = []
    for (let i = 0; i < 10; i++){
        result.push([])
        for (let j = 0; j < 10; j++){
            result[i].push(0)
        }
    }
    for (let i = 0; i < 4; i++) {
        result[1][1+i]=new Ship
    }
    expect(gameboard.getBoard()).toStrictEqual(result)
});

test("Receive attack", () => {
    let gameboard = new Gameboard()
    gameboard.placeShip(1, 1, 4)
    gameboard.receiveAttack(0,0)
    gameboard.receiveAttack(3,1)
    let result = []
    for (let i = 0; i < 10; i++){
        result.push([])
        for (let j = 0; j < 10; j++){
            result[i].push(0)
        }
    }
    for (let i = 0; i < 4; i++) {
        result[1][1+i]=new Ship
    }
    result[0][0] = -1
    result[1][3] = 1
    expect(gameboard.getBoard()).toStrictEqual(result)
});
