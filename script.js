var board;
const playerX = 'X';
const playerO = 'O';
const winCombos = [ //combinações de posições vencedoras
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7" ,"8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5" ,"8"]
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
    if((px.includes(square.target.id)) || (po.includes(square.target.id))){
        //Não faz nada se o espaço já estiver ocupado
    } else {
        if(currentPlayer == playerX){
            mark(square.target.id, playerX);
            px.push(square.target.id);
            document.getElementById('turn').innerHTML = "Próximo a jogar: O";
            if(checkWin(px)){
                document.getElementById('turn').innerHTML = "Jogador X é o vencedor!";
                blockBoard(playerX);
            }
            if(isFull()){
                document.getElementById('turn').innerHTML = "O jogo empatou!";
                setTimeout(function () { alert("Empate!") }, 1);
            }
            currentPlayer = playerO;
        } else {
            mark(square.target.id, playerO);
            po.push(square.target.id);
            document.getElementById('turn').innerHTML = "Próximo a jogar: X";
            if(checkWin(po)){
                document.getElementById('turn').innerHTML = "Jogador O é o vencedor!";
                blockBoard(playerO);
            }
            if(isFull()){
                document.getElementById('turn').innerHTML = "O jogo empatou!";
                setTimeout(function () { alert("Empate!") }, 1);
            }
            currentPlayer = playerX;
        }
    }
}

function mark(squareId, player) { //marca o espaço com o simbolo do jogador
	board[squareId] = player;
    document.getElementById(squareId).innerText = player;
    document.getElementById(squareId).style.cursor = "not-allowed";
}

function checkWin(player) { //verifica se o player ganhou
    player.sort();
    let win = false;

    for(var i in winCombos){
        win = isEqual(player,winCombos[i]);
        if(win==true){
            break;
        }
    }
    return win;
}

function isEqual (player, win){ //verifica se a combinação do player é igual a necessária para vencer
    let count = 0;
    var combo;

    for(let i = 0; i < player.length; i++){
        if((player.includes(win[i]))){
            combo = win;
            count++;
        } else {
            continue;
        }
    }

    if(count==3){
        for(let i = 0; i < combo.length; i++){
            document.getElementById(combo[i]).style.backgroundColor = "rgb(55, 224, 83)";
        }
        return true;
    } else {
        return false;
    }
}

function blockBoard(player){ //bloqueia o tabuleiro após o fim do jogo
    px.push("0", "1", "2", "3", "4", "5", "6", "7", "8");
    for(let i = 0; i < board.length; i++){
        document.getElementById(i).style.cursor = "not-allowed";
    }
    setTimeout(function () { alert("O jogador " + player + " venceu!") }, 1);
}

function isFull(){
    var sum = px.concat(po);
    if(sum.length==9){
        return true;
    } else {
        return false;
    }
}