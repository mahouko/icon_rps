$(document).ready(function() {
  var aiChoice;
  var playerChoice
  var resultCode
  var resetTime = 800 // Time until throws reset and you can choose again
  var rock ="<i id=\"ai-rock\" class=\"fa fa-hand-rock-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var paper ="<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var scissors ="<i id=\"ai-scissors\" class=\"fa fa-hand-scissors-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
  var lizard ="<i id=\"ai-lizard\" class=\"fa fa-hand-lizard-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
  var spock ="<i id=\"ai-spock\" class=\"fa fa-hand-spock-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
  var playerRock ="<i id=\"input-rock\" class=\"fa fa-hand-rock-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerPaper ="<i id=\"input-paper\" class=\"fa fa-hand-paper-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerScissors ="<i id=\"input-scissors\" class=\"fa fa-hand-scissors-o fa-5x rotate-180-flip player-hand\" aria-hidden=\"true\"></i>"
  var playerLizard ="<i id=\"input-lizard\" class=\"fa fa-hand-lizard-o fa-5x rotate-180-flip player-hand\" aria-hidden=\"true\"></i>"
  var playerSpock ="<i id=\"input-spock\" class=\"fa fa-hand-spock-o fa-5x rotate-180-flip player-hand\" aria-hidden=\"true\"></i>"
  var winSymbol = "<i class=\"fa fa-check win\" fa-3x aria-hidden=\"true\"></i>"
  var loseSymbol = "<i class=\"fa fa-times lose\" aria-hidden=\"true\"></i>"
  var tieSymbol = "<i class=\"fa fa-undo tie\" aria-hidden=\"true\"></i>"
  var canThrow = true;

  var playerScore = 0
  var aiScore = 0
  var check = "<i class=\"fa fa-check\" fa-3x aria-hidden=\"true\"></i>"
  var star = "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
  var diamond = "<i class=\"fa fa-diamond\" aria-hidden=\"true\"></i>"
  var firstOrder = "<i class=\"fa fa-first-order\" aria-hidden=\"true\"></i>"
  var spaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

  function makeAiChoice(){
    aiChoice = Math.floor(Math.random() * 5);
    if (aiChoice==0) {
      $("#ai-choice").html(rock);
    } else if (aiChoice==1) {
      $("#ai-choice").html(paper);
    } else if (aiChoice==2) {
      $("#ai-choice").html(scissors);
    } else if (aiChoice==3) {
      $("#ai-choice").html(spock);
    } else if (aiChoice==4) {
      $("#ai-choice").html(lizard);
    }
  }

  function displayPlayerChoice(){
    if (playerChoice==0) {
      $("#player-choice").html(playerRock);
    } else if (playerChoice==1) {
      $("#player-choice").html(playerPaper);
    } else if (playerChoice==2) {
      $("#player-choice").html(playerScissors);
    } else if (playerChoice==3) {
      $("#player-choice").html(playerSpock);
    } else if (playerChoice==4) {
      $("#player-choice").html(playerLizard);
    }
  }

  function doThrows(){
    canThrow = false;
    $("#player-choice").addClass("player-throw");
    $("#player-choice").removeClass("player-return")
    $("#player-choice .fa").removeClass("player-wiggle")
    $("#ai-choice .fa").removeClass("ai-wiggle")
    $("#ai-choice").addClass("ai-throw");
    $("#ai-choice").removeClass("ai-return")
    var throwReset = setTimeout(function(){
      $("#player-choice").removeClass("player-throw")
      $("#player-choice").addClass("player-return")
      $("#ai-choice").removeClass("ai-throw");
      $("#ai-choice").addClass("ai-return")
    }, resetTime);
    var canThrowReset = setTimeout(function(){
      canThrow = true;
      $("#player-choice").html(playerRock);
      $("#ai-choice").html(rock);
      $("#player-choice .fa").addClass("player-wiggle")
      $("#ai-choice .fa").addClass("ai-wiggle")
    }, 1300);
  }

  function determineResult(){
    resultCode=(5+playerChoice - aiChoice) % 5
    if (resultCode==0) {
      $("#result-row").html(tieSymbol + spaces + tieSymbol)
    } else if (resultCode%2==1) {
      $("#result-row").html(winSymbol + spaces + loseSymbol)
      playerScore++
    } else if (resultCode%2==0) {
      $("#result-row").html(loseSymbol + spaces + winSymbol)
      aiScore++
    }
    $("#player-score").html(booty(playerScore, true))
    $("#ai-score").html(booty(aiScore, false))
  }

  function booty(score, forward) {
    var n100 = groups(score, 100)
    score -= n100*100
    var n25 = groups(score, 25)
    score -= n25*25
    var n5 = groups(score, 5)
    var n1 = score - n5*5
    var syms = [
      firstOrder.repeat(n100),
      diamond.repeat(n25),
      star.repeat(n5),
      check.repeat(n1)
    ]
    if (!forward) {
      syms = syms.reverse()
    }
    return syms
  }

  function groups(x, n) {
    return Math.floor((x - (x % n))/n)
  }

  $(".player-input").click(function(e){
    if(canThrow) {
      playerChoice=$(e.target).data("throw-id")
      displayPlayerChoice()
      makeAiChoice();
      doThrows();
      determineResult();
    }
  });
});
