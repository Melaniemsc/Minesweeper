
/*-------------------------------- Constants --------------------------------*/
const boardEl = document.querySelectorAll("#board>*")
const messageEl = document.querySelector("#message")
let winner = false
let gameOver = false

const columns = 8
const rows = 8

/*---------------------------- Variables (state) ----------------------------*/
let gameBoard;
/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init() {
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
    addMines(gameBoard, boardEl)

}
init()

function addMines(gameBoard, boardEl) {
    const mineCount = 10
    let mineAdded = 0
    while (mineAdded < mineCount) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomColumn = Math.floor(Math.random() * columns);
        if (gameBoard[randomRow][randomColumn] === "") {
            gameBoard[randomRow][randomColumn] = "X";
            mineAdded++;
            const boxEl = document.getElementById(`${randomRow}-${randomColumn}`)
            boxEl.classList.add("boxBomb");
            boxEl.innerText = gameBoard[randomRow][randomColumn]
            for (let i = randomRow - 1; i <= randomRow + 1; i++) {
                for (let j = randomColumn - 1; j <= randomColumn + 1; j++) {
                    if (i >= 0 && i < rows && j >= 0 && j < columns && gameBoard[i][j] !== "X") {
                        const boxElNum = document.getElementById(`${i}-${j}`)
                        if (gameBoard[i][j] === "") {
                            gameBoard[i][j] = 1;
                            boxElNum.innerText = 1
                        } else {
                            boxElNum.innerText++;
                            gameBoard[i][j]++;
                        }

                    }
                }
            }
        }
    }
}

function checkIfBomb(actualBox) {
    if (actualBox.classList.contains("boxBomb")) {
        gameOver = true
        messageEl.innerText = "GAME OVER"
        boardEl.forEach(square => {
            square.removeEventListener('click', boxClickHandler);
        });
        return gameOver;
    }
}

function revealBox(eventId) {
    // debugger
    const rowIndex = parseInt((eventId).split("-")[0])
    const columnIndex = parseInt((eventId).split("-")[1])
    const actualBox = document.getElementById(`${rowIndex}-${columnIndex}`)

    if (actualBox.classList.contains("boxBomb")) {
        return
    } else if (actualBox.classList.contains("revealBox") || actualBox.classList.contains("revealBoxNum")) {
        return
    } else if ((actualBox.innerText) >= 1) {
        actualBox.classList.add("revealBoxNum")
        return
    } else {

        actualBox.classList.add("revealBox")
        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < columns) {
                    const nextBox = document.getElementById(`${i}-${j}`)
                    revealBox(nextBox.id)

                }
            }
        }

    }

}


// /*----------------------------- Event Listeners -----------------------------*/
function boxClickHandler(event) {

    if (event.target.classList.contains("boxBomb")) {
        checkIfBomb(event.target);
    } else {
        revealBox(event.target.id);
    }
}

boardEl.forEach(square => {
    square.addEventListener('click', boxClickHandler);
});