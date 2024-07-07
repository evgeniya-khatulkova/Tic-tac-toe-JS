/// js /////////////////////////////////////////////////////

function interface(){
  const sections = [...document.querySelectorAll('.section')];
  const {player1, player2, assignMove, checkWinCombination, checkTie} = gameFlow();
  gameboardReset();

  sections.forEach(section => section.addEventListener('click', (event) => {
      if(!player1.winner && !player2.winner && !event.currentTarget.classList.contains('selected')){
          section.classList.add('selected');
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
      assignMove(activeSection, person);
          {event.currentTarget.innerHTML = `<span>${person.symbol}</span>` };
          person.symbol === "X" ? playerDisplay(player2.name) : playerDisplay(player1.name);
          if(checkTie()) {output.innerText = "It is a draw" };
          winnerDisplay(checkWinCombination(person));
  }

  function gameboardReset(){
      sections.forEach(section => {
          section.innerHTML = "";
          section.classList.remove('selected');
  });
      playerDisplay(player1.name);
  }

  function playerDisplay(name){
      output.innerText = `It is ${name}'s turn`;
  }

  function winnerDisplay(isWinner){
      if(isWinner) {output.innerText = player1.winner ? `${player1.name} won` : `${player2.name} won`};
  }
};

function gameBoard(){
  let sectionsAvailable = 9;
  return {sectionsAvailable}
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
  let { sectionsAvailable } = gameBoard();

  const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const assignMove = (choice, player) => {
          player.playersCombination.push(choice);
          sectionsAvailable--;
 }

  const checkWinCombination = (player) => {
      if(player.playersCombination.length > 2 && winningCombination.some(subarray => subarray.every(el => player.playersCombination.includes(el)))) {
          player.winner = true;
          return true;
      }
      return false
  }

  const checkTie = () => {
      return sectionsAvailable === 0;
  }

  return{player1, player2, assignMove, checkWinCombination, checkTie}
}
