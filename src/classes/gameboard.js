import Ship from './ship'

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(undefined))
    this.shipsPlaced = []
    this.placeShips()
  }


  placeShip(ship, mainAxis) {
   
    //check if no axi is specified to generate random axi
    if (mainAxis === undefined) {
      Math.floor(Math.random() * 2) == 0 ? mainAxis = 'y' : mainAxis = 'x'
    }

    let yAxis =   Math.floor(Math.random() * 10)
    let xAxis =   Math.floor(Math.random() * 10)
    let shipPlaced = false
    let shipCoords = []
    
    if(mainAxis === 'y') {
      while(shipPlaced === false) {
        do { 
          xAxis = Math.floor(Math.random() * (10 - ship.length + 1))
        } while(xAxis > 0 && this.board[yAxis][xAxis - 1] !== undefined) //check if there is a ship behind

        for (let i = 0; i < ship.length; i++) {
          if (
            this.board[yAxis][xAxis + i] === undefined //check current cell
            && ((xAxis + i) == 9 || this.board[yAxis][xAxis + i + 1] === undefined)
            && (yAxis == 0 || yAxis > 0 && this.board[yAxis - 1][xAxis + i] === undefined )
            && (yAxis == 9 || yAxis < 9 && this.board[yAxis + 1][xAxis + i] === undefined )
            ) {
            shipCoords.push(yAxis + ',' + (xAxis + i))
            shipPlaced = true
          } else {
            shipPlaced = false
            shipCoords = []
            break
          }
        }

      yAxis = Math.floor(Math.random() * 10)

      }
    }

    if(mainAxis ==='x') {
      while(shipPlaced === false) {

        do { 
          yAxis = Math.floor(Math.random() * (10 - ship.length + 1))
        } while(yAxis > 0 && this.board[yAxis - 1][xAxis] !== undefined) //check if there is a ship behind


        for (let i = 0; i < ship.length; i++) {
          if (
            this.board[yAxis + i][xAxis] === undefined  //check current cell
            && ((yAxis + i ) == 9 || this.board[yAxis + i + 1][xAxis] === undefined)
            && (xAxis == 0 || xAxis > 0 && this.board[yAxis + i][xAxis - 1] === undefined )
            && (xAxis == 9|| xAxis < 9 && this.board[yAxis + i][xAxis + 1] === undefined )
            ) {
            shipCoords.push((yAxis + i) + ',' + xAxis + i)
            shipPlaced = true
          } else {
            shipPlaced = false
            shipCoords = []
            break
          }
        }

      xAxis = Math.floor(Math.random() * 10)
      }
    }

    for (let i = 0; i < shipCoords.length; i++) {
      this.board[shipCoords[i][0]][shipCoords[i][2]] = ship
    }

    this.shipsPlaced.push(ship)
  }


  placeShips() {
    this.placeShip(new Ship(5))
    this.placeShip(new Ship(4))
    this.placeShip(new Ship(3))
    this.placeShip(new Ship(3))
    this.placeShip(new Ship(2))
  }

  // placeShips() {
  //   const ship = new Ship(5)
  //   this.board[0][4] = ship
  //   this.board[0][5] = ship
  //   this.board[0][6] = ship
  //   this.board[0][7] = ship
  //   this.board[0][8] = ship

  //   const ship2 = new Ship(4)
  //   this.board[2][1] = ship2
  //   this.board[2][2] = ship2
  //   this.board[2][3] = ship2
  //   this.board[2][4] = ship2

  //   const ship3 = new Ship(3)
  //   this.board[6][3] = ship3
  //   this.board[7][3] = ship3
  //   this.board[8][3] = ship3

  //   const ship4 = new Ship(2)
  //   this.board[7][7] = ship4
  //   this.board[8][7] = ship4

  //   const ship5 = new Ship(3)
  //   this.board[4][5] = ship5
  //   this.board[4][6] = ship5
  //   this.board[4][7] = ship5

  //   this.shipsPlaced.push(ship, ship2, ship3, ship4, ship5)
  // }


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
