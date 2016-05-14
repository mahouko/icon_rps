var aiChoice;
$(document).ready(function() {
  function makeAiChoice(){
    $(".ai-hand").addClass("is-hidden");

    aiChoice = Math.floor(Math.random() * 3);
    var rock ="<i id=\"ai-rock\" class=\"fa fa-hand-rock-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
    var paper ="<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
    var scissors ="<i id=\"ai-scissors\" class=\"fa fa-hand-scissors-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
    if (aiChoice==0) {
      $("#ai-choice").html(rock);
    } else if (aiChoice==1) {
      $("#ai-choice").html(paper);
    } else if (aiChoice==2) {
      $("#ai-choice").html(scissors);
    }
  }

  $(".player-hand").click(function(){
    // $("#game").html("<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand is-hidden\" aria-hidden=\"true\"></i>")
    makeAiChoice();
  });
});
