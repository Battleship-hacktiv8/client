const generateBoard = function (num) {
  const board = []
  for (let i = 1; i < num; i++) {
    const boardTemp = []
    for (let j = 1; j < num; j++) {
      boardTemp.push('')
    }
    board.push(boardTemp)
  }
  return board
}

const generateShip = function () {
  const board = generateBoard(6)
  const maksDice = Math.round(board.length / 2)
  let randomDice = Math.floor(maksDice * Math.random()) // for start make ship
  const randomDice2 = Math.floor(maksDice * Math.random())
  const isVertikal = Math.random() >= 0.5
  if (isVertikal) {
    for (let i = 0; i < 3; i++) {
      board[randomDice][randomDice2] = 'B'
      randomDice++
    }
  } else {
    for (let i = 0; i < 3; i++) {
      board[randomDice2][randomDice] = 'B'
      randomDice++
    }
  }
  // console.log(board)
  return board
}
let ship = generateShip()
// console.log(ship)
const findShip = function (arr) {
  const find = ship[arr[0]][arr[1]]
  if (find === 'B') {
    ship[arr[0]][arr[1]] = 'W'
    this.shoot(ship)
    return true
  }
  ship[arr[0]][arr[1]] = '*'
  this.shoot(ship)
  return false
}

console.log(findShip([0, 3]))
// console.log(ship)
while (true) {
  const maksDice = ship.length
  let randomDice = Math.floor(maksDice * Math.random()) // for start make ship
  const randomDice2 = Math.floor(maksDice * Math.random())
  if (findShip([randomDice, randomDice2])) {
    console.log(ship)
    console.log([randomDice, randomDice2])
    break
  }
  console.log(ship)
}
