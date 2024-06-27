function gameBoard(){
  const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return {gameboard}
}

function player(name, symbol){
  const playersCombination = [];
  let winner = false;
  let active = false;

  return {name, playersCombination,  winner, active, symbol}
}

function interface(){
  const sections = [...document.querySelectorAll('.section')];
  const output = document.querySelector('.output');
  sections.forEach(section => section.innerHTML = "");

  const game = gameFlow();

  sections.forEach(section => section.addEventListener('click', (event) => {
      if(!game.player1.winner && !game.player2.winner){
          const activeSection = +event.currentTarget.dataset.number;
          [game.player1, game.player2].forEach(person =>{
              if(person.active){
                  const reply = () => game.check(activeSection, person);
                  if(reply()){
                      {event.currentTarget.innerHTML = person.symbol };
                      if(game.checkTie()) {output.innerText = "It is a draw" };
                      const isWinner = () => game.checkWinCombination(person);
                      winnerDisplay(isWinner());
                  }
              }
              person.active = !person.active;
          });
      }
  }));

  function winnerDisplay(isWinner){
      if(isWinner) {output.innerText = game.player1.winner ? `${game.player1.name} won` : `${game.player2.name} won`};
  }
}

function gameFlow(){
  const player1 = player(prompt("Set the name of the first player"), "X");
  const player2 = player(prompt("Set the name of the second player"), "0");
  player1.active = true;
  const available = gameBoard();
  const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const check = (choice, player) => {
      if(available.gameboard.includes(choice)){
          const index = available.gameboard.indexOf(choice);
          available.gameboard.splice(index, 1);
          player.playersCombination.push(choice);
          return true
      } else {
          return false;
      }
 }

  const checkWinCombination = (player) => {
      if(player.playersCombination.length > 2 && winningCombination.some(subarray => subarray.every(el => player.playersCombination.includes(el)))) {
          player.winner = true;
          return true;
      } else {
          return false
      }
  }

  const checkTie = (player) => {
      return available.gameboard.length === 0;
  }

  return{player1, player2, check, checkWinCombination, checkTie}
}
