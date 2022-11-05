const buttonSquares = document.querySelectorAll(".board__square");
const title = document.querySelector(".board__title");

let currentPlayer = "X";
let gameOver = false;
let board = new Array(9);

buttonSquares.forEach((square, i) => {
    square.addEventListener("click", () => {
        // keep changing x/o if we keep clicking. Checks if its empty, if not then return(exit) 
        //to not run the rest of code
        if (square.innerHTML || gameOver) {
            return;
        }
        // sets the innerHTML in the square to be current player
        square.innerHTML = currentPlayer;
        // sets the element in the arr to the currplayer
        board[i] = currentPlayer;

        if (checkWin()) {
            title.innerHTML = `${currentPlayer} Won the Game!`;
            return gameOver = true;
        }

        if (checkDraw()) {
            title.innerHTML = "Draw!";
            return gameOver = true;
        }

        // current player, if its X then switch to an O for next player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        title.innerHTML = `${currentPlayer}'s Turn`;
    })
});


function checkDraw() {
    // Method 2
    // returns true if every symbol in the board exists
    // .EVERY does NOT loop through every element bc 'new Array()' contains empty elements. fix by filling array with 'new Array().fill(undefined) 
    // return board.every(symbol => {
    //     if (symbol) {
    //         return true;
    //     }
    // })

    // Method 1
    for (let i = 0; i < board.length; i++) {
        // if any element in this board does not exist then false 
        if (!board[i]) {
            return false;
        }
    }
    return true;
}

// dubs
// Horizontal
// 0 1 2
// 3 4 5
// 6 7 8

// vertical
// 0 3 6
// 1 4 7
// 2 5 8

// diagonal
// 0 4 8
// 2 4 6

function checkWin() {
    const winningIndices = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]

    // winningIndices.forEach((indices, i) => {
    //     console.log(indices);
    // })

    // checks winning indices compared to the symbol on the board
    for (let i = 0; i < winningIndices.length; i++) {
        const matchingIndices = winningIndices[i];
        let symbol1 = board[matchingIndices[0]];
        let symbol2 = board[matchingIndices[1]];
        let symbol3 = board[matchingIndices[2]];

        // if any are empty, no winning state then continue
        if (!symbol1 || !symbol2 || !symbol3) {
            continue;
        }

        if (symbol1 === symbol2 && symbol2 === symbol3) {
            console.log("winner at ", matchingIndices);
            return true;
        }
    }
}

function restartGame() {
    gameOver = false;
    // reset the title
    title.innerHTML = `${currentPlayer}'s Turn`;
    // reset the dom
    buttonSquares.forEach(square => {
        square.innerHTML = "";
    })
    // reset board
    board = new Array(9);
}