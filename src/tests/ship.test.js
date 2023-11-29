import Ship from '../classes/ship'

test('Test if hit working properly', () => {
  const ship = new Ship(4)
  ship.hit()
  ship.hit()
  expect(ship.hits).toBe(2)
})

test('Test if ship sunk when ships hit match ships length', () => {
  const ship = new Ship(4)
  ship.hit()
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.sunk).toBe(true)
})
