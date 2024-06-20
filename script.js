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
  const game = gameFlow();
  const sections = [...document.querySelectorAll('.section')];

  let activeSection = null;

  sections.forEach(section => section.addEventListener('click', (event) => {
      activeSection = +event.currentTarget.dataset.number;
      [game.player1, game.player2].forEach(person =>{
          if(person.active){
              const reply = () => game.check(activeSection, person);
              if(reply()){
                  {event.currentTarget.innerText = person.symbol };
                  game.checkWinCombination(person);
              }
          }
          person.active = !person.active;
      });
  }));
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
          console.log('wrong number');
          return false;
      }
 }

  const checkWinCombination = (player) => {
      if(player.playersCombination.length > 2 && winningCombination.some(subarray => subarray.every(el => player.playersCombination.includes(el)))) {
          console.log('win');
          player.winner = true;
          return true;
      } else {
          return false
      }
  }
  return{player1, player2, check, checkWinCombination}
}

interface();

// 1. make move
// 2. check available
// 3. add to players combination
// 4. check the combination
