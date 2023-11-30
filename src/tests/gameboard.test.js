import Gameboard from '../classes/gameboard'
import Ship from '../classes/ship'

test('Test board size working properly', () => {
  const gameboard = new Gameboard()
  expect(gameboard.board[9].length).toEqual(10)
})

// test('Test ship is correctly placed', () => {
//   const gameboard = new Gameboard()
//   expect(gameboard.board[7][7]).toEqual(new Ship(2))
// })

test('Test if receive attack display M ( Miss) if attack is received in empty coordinate', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([4, 9])
  expect(gameboard.board[4][9]).toBe('M')
})

test.only('Test if receive attack increases the hitcount of the ship hitted', () => {
  const gameboard = new Gameboard()
  gameboard.shipsPlaced[0].
  gameboard.receiveAttack([7, 7])

  const mockShip = new Ship(2)
  mockShip.hit()
  expect(gameboard.board[7][7]).toEqual(mockShip)
})

test('Test if receive attack increases the hitcount of the ship hitted in another coordinate of the ship', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([7, 7])

  const mockShip = new Ship(2)
  mockShip.hit()
  expect(gameboard.board[8][7]).toEqual(mockShip)
})

test('Test if receive attack sinks the ship if hitcount matches shiplength', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([7, 7])

  gameboard.receiveAttack([7, 7])

  //mocks sinked ship
  const mockShip = new Ship(2)
  mockShip.hit()
  mockShip.hit()

  expect(gameboard.board[8][7].sunk).toEqual(true)
})

test('Test if receive attack deals with invalid coordinates', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([9, 7])

  expect(gameboard.receiveAttack([9, 7])).toEqual(undefined)
})

test('Test if check sinked ships work', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([9, 7])
  gameboard.checkIsAllSinked()

  expect(gameboard.checkIsAllSinked()).toEqual(false)
})

test('Test if check sinked ships work if all ships sinks', () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([9, 7])

  for (const ship of gameboard.shipsPlaced) {
    ship.sunk = true
  }

  gameboard.checkIsAllSinked()

  expect(gameboard.checkIsAllSinked()).toEqual(true)
})
