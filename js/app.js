
/*-------------------------------- Constants --------------------------------*/
const board = document.querySelectorAll("#board>*")
let winner=false
let gameOver = false

const columns=8
const rows = 8


/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init(){
    gameBoard=[
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ];
    const boardElement = document.getElementById("board");
    // for (let i=0;i<gameBoard.length;i++){
    //     for (let j=0; j<gameBoard[i].length ;j++){
    //         const box = document.createElement("div");
    //         box.className = "box";
    //         box.textContent = gameBoard[i][j];
    //         boardElement.appendChild(box);
    // }}
    const board = document.querySelectorAll("#board>*")
    winner = false
    gameOver = false
    // render()
    addMines(gameBoard,board)
}
init()


function addMines(gameBoard,board) {
    const mineCount = 10
    let mineAdded = 0
    while (mineAdded < mineCount){
        const randomRow = Math.floor(Math.random()*rows);
        const randomColumn = Math.floor(Math.random()*columns);
        if (randomRow!=0 && randomRow!=7 && randomColumn!=0 && randomColumn!=7 && gameBoard[randomRow][randomColumn]=== ""){
            gameBoard[randomRow][randomColumn]="X";
            mineAdded ++;
            const boxEl = document.getElementById(`${randomRow}-${randomColumn}`)
            boxEl.innerText = "X"
            // for (let i = randomRow -1; i <= randomRow + 1 ; i++){
            //     for (let j = randomColumn-1 ; j<=randomColumn+1; j++) {
            //         if (gameBoard[i][j] === ""){
            //             gameBoard[i][j] = 1;
            //         }else{
            //             gameBoard[i][j]++
            //         }
            //     }
            // }
        }
    }
}


// function checkIfBomb(event) {
//     if (event.target.id.includes("bomb")){
        
//     }else{
//         console.log("you ok");
//     }
// }

// placeAMine()=>{
//     -if the box contains a mine{
//         return
//     -else if the box = Number{
//         erase the number
//         put a mine, -1mine
//         adjacentBlock ++}
//     -elseif the box is empty && minecount>0 {
//         put a mine, -1mine
//         adjacentBlock ++}
    




// revealBox()=>{
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
// squares.forEach(square=>{
//     square.addEventListener('click',checkIfBomb)
// });

