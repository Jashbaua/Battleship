import Gameboard from './Gameboard'

class Player{
    constructor(name) {
        this.name = name
        this.board=new Gameboard
    }
}

export default Player