import Gameboard from './gameboard'

export default class Player {
  constructor() {
    this.gameboard = new Gameboard()
    this.hittedCoordinates = []
  }

  takeTurn(player, coordinates) {
    //check if coordinate was already hitted

    if (this.hittedCoordinates.includes(coordinates)) {
      return 'Invalid coordinate'
    }

    this.hittedCoordinates.push(coordinates)
    return player.gameboard.receiveAttack(coordinates.split(","))
  }
}

