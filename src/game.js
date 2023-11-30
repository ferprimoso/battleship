import Player from './classes/player'
import { fillGameboard, updateTurn, updateBoard, gameOverScreen, startGameboard, clickOnPlayerRandomCell } from './domModule';


const player1 = new Player()
const player2 = new Player()
let currentPlayer = 1
let gameOver = false


export function cellClicked(cell) {
    if (gameOver === true) return

    console.log(cell.parentNode.parentNode.id)
    let cellCoord = cell.getAttribute("coord")

    if(currentPlayer == 1 && cell.parentNode.parentNode.id == 'player2-box') {
        let cellContent = player1.takeTurn(player2, cellCoord)
        updateBoard(2, cellCoord, cellContent)

        if(cellContent === 'M') {
            updateTurn()
            currentPlayer = 2
            computerTurn()
         }

         if (player2.gameboard.checkIsAllSinked()) endGame(1)

    } else if(currentPlayer == 2 && cell.parentNode.parentNode.id == 'player1-box') {
        let cellContent = player2.takeTurn(player1, cellCoord)
        updateBoard(1, cellCoord, cellContent)

         if(cellContent === 'M') {
            updateTurn()
            currentPlayer = 1
         }

         if (player1.gameboard.checkIsAllSinked()) endGame(2)
         else computerTurn()
    }
}

export function computerTurn() {
    setTimeout(function() {
        clickOnPlayerRandomCell()
        console.log("Waited for 3 seconds");
    }, 1000);
}




export function endGame(playerN) {
    gameOver = true
    gameOverScreen(playerN)
    console.log('Game ended')
}

export function startGame() {
    startGameboard()
    fillGameboard(player1.gameboard.board)
    updateTurn();
}