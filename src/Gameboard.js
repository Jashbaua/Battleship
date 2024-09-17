import Ship from './Ship'

class Gameboard{
    #board
    constructor() {
        this.#board = []
        for (let i = 0; i < 10; i++){
            this.#board.push([])
            for (let j = 0; j < 10; j++){
                this.#board[i].push(0)
            }
        }
    }
    getBoard() {
        return [...this.#board]
    }
    placeShip(x, y, length) {
        let ship=new Ship(length)
        if (x + length - 1 < 10) {
            for (let i = 0; i < length; i++) {
                this.#board[y][x+i]=ship
            }
        }
    }
    receiveAttack(x, y) {
        if (typeof(this.#board[y][x])=='object') {
            this.#board[y][x].hit()
            this.#board[y][x]=1
        }
        else {
            this.#board[y][x]=-1
        }
    }
    areAllSunk() {
        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
                if (typeof (this.#board[i][j]) == 'object')return false
            }
        }
        return true
    }
}

export default Gameboard