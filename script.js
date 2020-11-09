var board;
const playerX = 'X';
const playerO = 'O';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7 ,8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5 ,8]
]
const cells = document.querySelectorAll('.cell');
var currentPlayer = playerX;
var px = [];
var po = [];


startGame();

function startGame() {
    board = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', squareClick, false);
    }
}

function squareClick(square) {
    if(currentPlayer == playerX){
        turn(square.target.id, playerX);
        px.push(square.target.id);
        currentPlayer = playerO;
    } else {
        turn(square.target.id, playerO);
        po.push(square.target.id);
        currentPlayer = playerX;
    }
    console.log(square.target.id);
}

function turn(squareId, player) {
	board[squareId] = player;
    document.getElementById(squareId).innerText = player;
}

function checkWin(player) {
    player.sort()
}