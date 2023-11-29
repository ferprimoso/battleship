import Player from '../classes/player'
import Ship from '../classes/ship'

test('Test take turns work properly', () => {
  const player = new Player()
  const player2 = new Player()

  player.takeTurn(player2, '7,7')

  const mockShip = new Ship(2)
  mockShip.hit()

  expect(player2.gameboard.board[7][7]).toEqual(mockShip)
})

test('Test if take turns works in already hitted coordinate', () => {
  const player = new Player()
  const player2 = new Player()

  player.takeTurn(player2, '7,7')

  expect(player.takeTurn(player2, '7,7')).toEqual('Invalid coordinate')
})
