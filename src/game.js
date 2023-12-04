import Player from './classes/player'
import { fillGameboard, updateTurn, updateBoard, gameOverScreen, startGameboard, clickOnPlayerRandomCell, clickOnPlayerShipCells } from './domModule';


const player1 = new Player()
const player2 = new Player()
let currentPlayer = 1
let gameOver = false
let currentShipSunk = false


export function cellClicked(cell) {
    if (gameOver === true) return

    let cellCoord = cell.getAttribute("coord")

    if(currentPlayer == 1 && cell.parentNode.parentNode.id == 'player2-box') {
        let cellContent = player1.takeTurn(player2, cellCoord)
        updateBoard(2, cellCoord, cellContent)

        if(cellContent === 'M') {
            updateTurn()
            currentPlayer = 2
            callNewComputerTurn()
         }

         if (player2.gameboard.checkIsAllSinked()) endGame(1)

    } else if(currentPlayer == 2 && cell.parentNode.parentNode.id == 'player1-box') {
        let cellContent = player2.takeTurn(player1, cellCoord)
        updateBoard(1, cellCoord, cellContent)

        console.log("CELL CLICKED: ", cell)

         if(cellContent === 'M') {
            updateTurn()
            currentPlayer = 1
         } else {
            if(cellContent.sunk === true) {
                console.log('sunked and reset computer cell')
                currentShipSunk = true
            }

            if (player1.gameboard.checkIsAllSinked()) endGame(2) 
            console.log('hitted')
         }
    }
}

let computerRoot = []

function callNewComputerTurn() {
    console.log('memory', computerRoot);
    computerTurn(computerRoot).then((cellStack) => {
        console.log(cellStack);
        computerRoot = cellStack;
        console.log('memory after op', computerRoot);
    })
}


export function computerTurn(cellStack = []) {
    return new Promise((resolve, reject) => {
        // TODO - refactor to be more short
        setTimeout(() => {
            if(cellStack.length === 0) {
                const temp = clickOnPlayerRandomCell()
                console.log(temp);
                if(temp.classList.contains('is-hitted')) {
                    cellStack.push(temp)
                    console.log('Hits Ship')
                    resolve(computerTurn(cellStack))
                } else {
                    resolve(cellStack)
                }
            } else {
                //click on the root cell
                const temp = clickOnPlayerShipCells(cellStack)


                if(temp.classList.contains('is-hitted')) {
                    // //reset if ship sunk
                    if (currentShipSunk) {
                        currentShipSunk = false
                        cellStack.length = 0
                        console.log(resolve(computerTurn(cellStack)))
                    } else {
                        cellStack.push(temp)
                        resolve(computerTurn(cellStack))
                    }

                } else {
                    console.log('next stack', [cellStack[0]]);
                    resolve([cellStack[0]])
                }
            }

        }, 500);
    })
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