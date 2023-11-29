import { cellClicked } from "./game";


const player1box = document.querySelector('#player1-box')
const player2box = document.querySelector('#player2-box')
const clickHandler = (e) => cellClicked(e.target);


export function generateGameboard() {
    const gridContainer = document.createElement("div")
    gridContainer.classList.add("game-grid")
    const numRows = 10;
    const numCols = 10;
    
    // Create and append cells to the grid container
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.setAttribute("coord", (row + ',' + col))

        cell.addEventListener('click', clickHandler);

        gridContainer.appendChild(cell);
      }
    }
    
    return gridContainer
}

export function fillGameboard(playerBox, board) {
    console.log(playerBox)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== undefined &&  board[i][j] !== 'M') {
                let child = playerBox.children[(i * 10) + j]
                child.classList.add("is-ship")
            }
        }

    }
}

export function updateBoard(boxN, coord, cellContent) {
    let boxToUpdate = null
    if(boxN == 1) boxToUpdate = player1box.lastChild
    else boxToUpdate = player2box.lastChild

    let cellToUpdate = boxToUpdate.children[parseInt(coord[0]) * 10 + parseInt(coord[2])]

    if (cellContent === 'M') cellToUpdate.classList.add('is-missed')
    else cellToUpdate.classList.add('is-hitted')

    cellToUpdate.removeEventListener('click', clickHandler);
}








let turnState = 0

export function updateTurn() {
    const h1 = document.querySelector('.current-turn')

    if(turnState == 0) {
        h1.textContent = 'Player 1 turn'
        player1box.classList.add('active-player')
        player2box.classList.remove('active-player')
        turnState = 1
    } else {
        h1.textContent = 'Player 2 turn'
        player2box.classList.add('active-player')
        player1box.classList.remove('active-player')
        turnState = 0
    }

}
