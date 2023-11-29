import Ship from './ship'

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(undefined))
    this.shipsPlaced = []
    this.placeShips()
  }

  placeShips() {
    const ship = new Ship(5)
    this.board[0][4] = ship
    this.board[0][5] = ship
    this.board[0][6] = ship
    this.board[0][7] = ship
    this.board[0][8] = ship

    const ship2 = new Ship(4)
    this.board[2][1] = ship2
    this.board[2][2] = ship2
    this.board[2][3] = ship2
    this.board[2][4] = ship2

    const ship3 = new Ship(3)
    this.board[6][3] = ship3
    this.board[7][3] = ship3
    this.board[8][3] = ship3

    const ship4 = new Ship(2)
    this.board[7][7] = ship4
    this.board[8][7] = ship4

    const ship5 = new Ship(3)
    this.board[4][5] = ship5
    this.board[4][6] = ship5
    this.board[4][7] = ship5

    this.shipsPlaced.push(ship, ship2, ship3, ship4, ship5)
  }

  receiveAttack(coordinates) {
    //check if hits ship
    if (this.board[coordinates[0]][coordinates[1]] instanceof Ship) {
      this.board[coordinates[0]][coordinates[1]].hit()
    }

    //check if hits water
    if (this.board[coordinates[0]][coordinates[1]] === undefined) {
      this.board[coordinates[0]][coordinates[1]] = 'M'
    }

    return this.board[coordinates[0]][coordinates[1]]
    // this.checkSinkedShips()
  }

  checkIsAllSinked() {
    for (const ship of this.shipsPlaced) {
      if (ship.sunk == false) return false
    }

    return true
  }
}
