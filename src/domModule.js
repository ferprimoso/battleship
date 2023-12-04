import { cellClicked } from "./game";


const player1box = document.querySelector('#player1-box')
const player2box = document.querySelector('#player2-box')
const clickHandler = (e) => cellClicked(e.target);

export function startGameboard() {
    const player1Header = document.createElement('h1')
    const player2Header = document.createElement('h1')
    player1Header.textContent = "Player 1"
    player2Header.textContent = "Computer"
    player1box.appendChild(player1Header)
    player2box.appendChild(player2Header)


    player1box.appendChild(generateGameboard())
    player2box.appendChild(generateGameboard())
}

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

export function fillGameboard(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== undefined &&  board[i][j] !== 'M') {
                let child = player1box.lastChild.children[(i * 10) + j]
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

    if (cellContent === 'M') {
        cellToUpdate.classList.add('is-missed')
        cellToUpdate.textContent = '-'
    }
    else {
        cellToUpdate.classList.add('is-hitted')
        cellToUpdate.textContent = 'x'
    }

    cellToUpdate.removeEventListener('click', clickHandler);

    // check if ships sink
    if (cellContent.sunk === true) {
        console.log(cellContent)
    }
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
        h1.textContent = 'Computer turn'
        player2box.classList.add('active-player')
        player1box.classList.remove('active-player')
        turnState = 0
    }

}


export function gameOverScreen(playerN) {
    const h1 = document.querySelector('.current-turn')
    const h2 = document.querySelector('.winner')

    h1.textContent = "Game Over " 
    h2.textContent = playerN == 2? 'Computer Wins' : 'Player 1 Wins' 
}


//computer logic 

export function clickOnPlayerRandomCell() {
    let yAxis =   Math.floor(Math.random() * 10)
    let xAxis =   Math.floor(Math.random() * 10)


    const player1Box = player1box.lastChild
    const randomCell = player1Box.children[(yAxis * 10 )+ xAxis]

    if (randomCell.classList.contains('is-missed') || randomCell.classList.contains('is-hitted')) {
        return clickOnPlayerRandomCell()
    } else {
        randomCell.click()
        return randomCell
    }
}

export function clickOnPlayerShipCells(cellStack) {

    let cardinalSet = new Set()

    if(cellStack.length > 1) {
        let yFactor = parseInt(cellStack[0].getAttribute('coord')[0]) - parseInt(cellStack[1].getAttribute('coord')[0])
        let xFactor = parseInt(cellStack[0].getAttribute('coord')[2]) - parseInt(cellStack[1].getAttribute('coord')[2])

        if(yFactor === -1) cardinalSet.add(3)
        if(yFactor ===  1) cardinalSet.add(1)
        if(xFactor === -1) cardinalSet.add(2)
        if(xFactor ===  1) cardinalSet.add(0)

    } else {
        while(cardinalSet.size < 4) {
            cardinalSet.add(Math.floor(Math.random() * 4))
        }
    }

    //click on last cell
    let cell = cellStack[cellStack.length - 1]

    for(const cardinal of cardinalSet){

        // if 0 try left, if 1 try top, if 2 try right, if 3 try bottom
        console.log('looping', cardinal);

        // try left
        if (cardinal === 0) {
            if (cell.getAttribute('coord')[2] !== 0 && cell.previousSibling != undefined && !cell.previousSibling.classList.contains('is-missed') && !cell.previousSibling.classList.contains('is-hitted')) {
                cell.previousSibling.click()
                return cell.previousSibling
            } 

            cardinalSet.add(2)
        }

        // try top
        else if (cardinal === 1) {
            const parentNode = cell.parentNode
            const topCellIndex = parseInt(cell.getAttribute("coord")[0] + cell.getAttribute("coord")[2]) - 10
            const topCellNode = parentNode.childNodes[topCellIndex] 

            if( topCellNode !== undefined && !topCellNode.classList.contains('is-missed') && !topCellNode.classList.contains('is-hitted')) {
                topCellNode.click()
                return topCellNode
            }

            cardinalSet.add(3)
        }

        //try right
        else if (cardinal === 2) {
            if (cell.getAttribute('coord')[2] !== 9 && cell.nextSibling != undefined && !cell.nextSibling.classList.contains('is-missed') && !cell.nextSibling.classList.contains('is-hitted')) {
                cell.nextSibling.click()
                return cell.nextSibling
            } 

            cardinalSet.add(0)
        }

        //try bottom
        else if (cardinal === 3) {
                const parentNode = cell.parentNode
                const bottomCellIndex = parseInt(cell.getAttribute("coord")[0] + cell.getAttribute("coord")[2]) + 10
                const bottomCellNode = parentNode.childNodes[bottomCellIndex] 

                if( bottomCellNode !== undefined && !bottomCellNode.classList.contains('is-missed') && !bottomCellNode.classList.contains('is-hitted') ) {
                    bottomCellNode.click()
                    return bottomCellNode
                }

                cardinalSet.add(1)
        }

    }

    return null
}