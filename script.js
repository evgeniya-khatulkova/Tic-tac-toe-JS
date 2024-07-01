function interface(){
  const sections = [...document.querySelectorAll('.section')];
  const {player1, player2, check, checkWinCombination, checkTie} = gameFlow();
  gameboardReset();

  sections.forEach(section => section.addEventListener('click', (event) => {
      if(!player1.winner && !player2.winner){
          [player1, player2].forEach(person =>{
              if(person.active){
                  handleMove(person, event)
              }
              person.active = !person.active;
          });
      }
  }));

  function handleMove(person, event){
      const activeSection = +event.currentTarget.dataset.number;
      const reply = check(activeSection, person);
      if(reply){
          {event.currentTarget.innerHTML = person.symbol };
          person.symbol === "X" ? playerDisplay(player2.name) : playerDisplay(player1.name);
          if(checkTie()) {output.innerText = "It is a draw" };
          winnerDisplay(checkWinCombination(person));
      }
  }

  function gameboardReset(){
      sections.forEach(section => section.innerHTML = "");
      playerDisplay(player1.name);
  }

  function playerDisplay(name){
      output.innerText = `Next turn is for: ${name}`;
  }

  function winnerDisplay(isWinner){
      if(isWinner) {output.innerText = player1.winner ? `${player1.name} won` : `${player2.name} won`};
  }
}

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

function gameFlow(){
  const player1 = player(prompt("Set the name of the first player"), "X");
  const player2 = player(prompt("Set the name of the second player"), "0");
  player1.active = true;
  const { gameboard } = gameBoard();

  const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const check = (choice, player) => {
      if(gameboard.includes(choice)){
          const index = gameboard.indexOf(choice);
          gameboard.splice(index, 1);
          player.playersCombination.push(choice);
          return true
      }
      return false;
 }

  const checkWinCombination = (player) => {
      if(player.playersCombination.length > 2 && winningCombination.some(subarray => subarray.every(el => player.playersCombination.includes(el)))) {
          player.winner = true;
          return true;
      }
      return false
  }

  const checkTie = () => {
      return gameboard.length === 0;
  }

  return{player1, player2, check, checkWinCombination, checkTie}
}
