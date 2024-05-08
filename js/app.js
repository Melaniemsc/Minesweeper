
/*-------------------------------- Constants --------------------------------*/
const boardEl = document.querySelectorAll("#board>*")
const messageEl = document.querySelector("#message")
const resetButtonEl = document.querySelector("#reset");
const minesLeftEl = document.querySelector("#mines-left")
const timerEl = document.querySelector("#timer")
const mineCount = 10

const columns = 8
const rows = 8

/*---------------------------- Variables (state) ----------------------------*/
let gameBoard;
let winner = false
let gameOver = false
let squaresReveal;
let flagCount = mineCount
let timer
let seconds
let isFirstClick
/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init() {
    isFirstClick = true
    squaresReveal = 0;
    gameBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ];


    winner = false
    gameOver = false
    flagCount = mineCount
    seconds = 0
    timerEl.innerText = "00"
    clearInterval(timer)
    boardEl.forEach(square => {
        square.innerText = "";
        square.classList.remove("revealBox", "revealedBomb", "flag", "explodedBomb", "bombDefused")
        square.addEventListener("contextmenu", function (e) { e.preventDefault(); })
        square.addEventListener('click', boxClickHandler)
        square.addEventListener('contextmenu', boxClickHandler)
    })
    messageEl.innerText = "Try your luck"
    minesLeftEl.innerText = 10
    addMines(gameBoard, boardEl)

}
init()

function addMines(gameBoard,) {

    let mineAdded = 0
    while (mineAdded < mineCount) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomColumn = Math.floor(Math.random() * columns);
        if (gameBoard[randomRow][randomColumn] === "") {
            gameBoard[randomRow][randomColumn] = "X";
            mineAdded++;
            const boxEl = document.getElementById(`${randomRow}-${randomColumn}`)
            for (let i = randomRow - 1; i <= randomRow + 1; i++) {
                for (let j = randomColumn - 1; j <= randomColumn + 1; j++) {
                    if (i >= 0 && i < rows && j >= 0 && j < columns && gameBoard[i][j] !== "X") {
                        const boxElNum = document.getElementById(`${i}-${j}`)
                        if (gameBoard[i][j] === "") {
                            gameBoard[i][j] = 1;
                        } else {
                            gameBoard[i][j]++;
                        }

                    }
                }
            }
        }
    }
    console.log(gameBoard);
}



function revealBox(eventId, gameBoard) {
    const rowIndex = parseInt((eventId).split("-")[0])
    const columnIndex = parseInt((eventId).split("-")[1])
    const actualBox = document.getElementById(`${rowIndex}-${columnIndex}`)
    if (isFirstClick) {
        timer = setInterval(increaseTimer, 1000);
        isFirstClick = false;
    }
    if (gameBoard[rowIndex][columnIndex] === "X") {
        return
    } else if (actualBox.classList.contains("revealBox") || actualBox.classList.contains("flag")) {
        return
    } else if ((parseInt(gameBoard[rowIndex][columnIndex])) >= 1) {

        actualBox.innerText = gameBoard[rowIndex][columnIndex]
        actualBox.classList.add("revealBox")
        squaresReveal++
        checkForWin()
        if ((parseInt(gameBoard[rowIndex][columnIndex])) === 1) {
            actualBox.style.color = "blue"
        } else if ((parseInt(gameBoard[rowIndex][columnIndex])) === 2) {
            actualBox.style.color = "green"
        } else if ((parseInt(gameBoard[rowIndex][columnIndex])) === 3) {
            actualBox.style.color = "red"
        } if ((parseInt(gameBoard[rowIndex][columnIndex])) === 4) {
            actualBox.style.color = "navy blue"
        }
        return
    } else {
        actualBox.classList.add("revealBox")
        squaresReveal++
        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < columns) {
                    const nextBox = document.getElementById(`${i}-${j}`)

                    revealBox(nextBox.id, gameBoard)

                }
            }
        }

    }

}



function addFlags(eventId, gameBoard) {
    const rowIndex = parseInt((eventId).split("-")[0])
    const columnIndex = parseInt((eventId).split("-")[1])
    const actualBox = document.getElementById(`${rowIndex}-${columnIndex}`)
    if (actualBox.classList.contains("revealBox") || actualBox.classList.contains("revealBoxNum")) {
        return
    } else if (actualBox.classList.contains("flag")) {
        actualBox.classList.remove("flag");
        flagCount++
    } else {
        actualBox.classList.add("flag");
        flagCount--
    }
    minesLeftEl.innerText = flagCount
}




function checkForWin() {
    if (squaresReveal + mineCount === 64) {
        winner = true
        messageEl.innerText = "YOU WON, CONGRATULATIONS!"

    }
}

function boxClickHandler(event) {
    const rowIndex = parseInt((event.target.id).split("-")[0])
    const columnIndex = parseInt((event.target.id).split("-")[1])
    const actualBox = gameBoard[rowIndex][columnIndex]
    if (event.button === 2) {
        addFlags(event.target.id)
    } else {
        if (actualBox === 'X') {
            setGameOver(event);
        } else {
            revealBox(event.target.id, gameBoard);
        }

    }
}

function setGameOver(event) {
    gameOver = true
    messageEl.innerText = "GAME OVER"
    event.target.classList.add("explodedBomb")
    clearInterval(timer)
    boardEl.forEach(square => {
        square.removeEventListener('contextmenu', boxClickHandler);
        square.removeEventListener('click', boxClickHandler);
        const rowIndex = parseInt((square.id).split("-")[0])
        const columnIndex = parseInt((square.id).split("-")[1])
        const gameBoardSquare = gameBoard[rowIndex][columnIndex]
        if (gameBoardSquare === 'X') {
            if (square.classList.contains("flag")) {
                square.classList.remove("flag")
                square.classList.add("bombDefused")
            }
            square.classList.add("revealedBomb")
        }
    });
    return gameOver;
}
function increaseTimer() {
    seconds++
    timerEl.innerText = seconds
}

// /*----------------------------- Event Listeners -----------------------------*/

resetButtonEl.addEventListener('click', init)
