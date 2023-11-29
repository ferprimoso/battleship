import Player from './classes/player'
import { generateGameboard, fillGameboard, updateTurn, updateBoard } from './domModule';


const player1 = new Player()
const player2 = new Player()
let currentPlayer = 1


export function cellClicked(cell) {
    console.log(cell.parentNode.parentNode.id)
    let cellCoord = cell.getAttribute("coord")

    if(currentPlayer == 1 && cell.parentNode.parentNode.id == 'player2-box') {
        let cellContent = player1.takeTurn(player2, cellCoord)
        currentPlayer = 2
        updateBoard(2, cellCoord, cellContent)
        updateTurn()
    } else if(currentPlayer == 2 && cell.parentNode.parentNode.id == 'player1-box') {
        let cellContent = player2.takeTurn(player1, cellCoord)
        currentPlayer = 1
        updateBoard(1, cellCoord, cellContent)
        updateTurn()
    }
}

export function startGame() {
    // const player1 = new Player();
    // const player2 = new Player();

    // create dom gamebox
    const player1Box = document.querySelector("#player1-box")
    const player2Box = document.querySelector("#player2-box")
    const playerHeader = document.createElement('h1')
    playerHeader.textContent = "Player"
    player1Box.appendChild(playerHeader)
    player2Box.appendChild(playerHeader.cloneNode(true))
    player1Box.appendChild(generateGameboard())
    player2Box.appendChild(generateGameboard())
    fillGameboard(player1Box.lastChild, player1.gameboard.board)
    updateTurn();

    // loop while both players still has ships
    while(player1.gameboard.checkIsAllSinked() && player1.gameboard.checkIsAllSinked()){


    }
    
}