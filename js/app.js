
/*-------------------------------- Constants --------------------------------*/
const boardEl = document.querySelectorAll("#board>*")
const messageEl = document.querySelector("#message")
let winner = false
let gameOver = false

const columns = 8
const rows = 8

/*---------------------------- Variables (state) ----------------------------*/

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
    // render()
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

function checkIfBomb(event) {
    if (event.target.classList.contains("boxBomb")) {
        gameOver = true
        messageEl.innerText = "GAME OVER"
        console.log("bomb!");
        boardEl.forEach(square => {
            square.removeEventListener('click', checkIfBomb)
        });
    }
}


function revealBox(event) {
    checkIfBomb(event)
    const rowIndex = (event.target.id).split("-")[0]
    const columnIndex = (event.target.id).split("-")[1]
    if (event.target.classList.contains("revealBox")) {
        console.log(`REVEAL${event.target.id}`);
        return
    } else if ((event.target.innerText) >= 1) {
        event.target.classList.add("revealBox")
        console.log(`this is a number${event.target.id}`);
        return
    } else {
        event.target.classList.add("revealBox")
        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < columns) {
                    const nextBox = document.getElementById(`${i}-${j}`)

                    console.log(`empty box added class${event.target.id}`);
                    revealBox(nextBox)
                    // console.log("adding class");
                }
            }
        }
    }
}
//     -check <class reveald>
//         return
//     -check for Bomb = true
//         game over, return
//     -check for number > 0
//         add class reveald
//         add class number
//         return
//     -if number = 0
//    // checkAdjacentBloc= (x,y)
//         if (x>0 && x<rows-1) && (x>0 && x<columns-1)
//             for (i=x-1, i <= x + 1 , i++){
//                 for (J=y-1, J=y+1, J++){
//                     revealBox()

// /*----------------------------- Event Listeners -----------------------------*/
boardEl.forEach(square => {
    square.addEventListener('click', revealBox)
});

