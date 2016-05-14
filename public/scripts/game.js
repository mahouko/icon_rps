var aiChoice;
$(document).ready(function() {
  var rock ="<i id=\"ai-rock\" class=\"fa fa-hand-rock-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var paper ="<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var scissors ="<i id=\"ai-scissors\" class=\"fa fa-hand-scissors-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
  var playerRock ="<i id=\"input-rock\" class=\"fa fa-hand-rock-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerPaper ="<i id=\"input-paper\" class=\"fa fa-hand-paper-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerScissors ="<i id=\"input-scissors\" class=\"fa fa-hand-scissors-o fa-5x rotate-180-flip player-hand\" aria-hidden=\"true\"></i>"

  function makeAiChoice(){
    aiChoice = Math.floor(Math.random() * 3);
    if (aiChoice==0) {
      $("#ai-choice").html(rock);
    } else if (aiChoice==1) {
      $("#ai-choice").html(paper);
    } else if (aiChoice==2) {
      $("#ai-choice").html(scissors);
    }
  }

  function displayPlayerChoice(playerChoice){
    if (playerChoice==0) {
      $("#player-choice").html(playerRock);
    } else if (playerChoice==1) {
      $("#player-choice").html(playerPaper);
    } else if (playerChoice==2) {
      $("#player-choice").html(playerScissors);
    }
  }

  $("#input-rock").click(function(){
    displayPlayerChoice(0)
    makeAiChoice();
  });
  $("#input-paper").click(function(){
    displayPlayerChoice(1)
    makeAiChoice();
  });
  $("#input-scissors").click(function(){
    displayPlayerChoice(2)
    makeAiChoice();
  });
});
