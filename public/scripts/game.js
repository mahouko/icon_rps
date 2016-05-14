var aiChoice;
$(document).ready(function() {
  function makeAiChoice(){
    $(".ai-hand").addClass("is-hidden");

    aiChoice = Math.floor(Math.random() * 3);
    if (aiChoice==0) {
      $("#ai-rock").toggleClass("is-hidden");
    } else if (aiChoice==1) {
      $("#ai-paper").toggleClass("is-hidden");
    } else if (aiChoice==2) {
      $("#ai-scissors").toggleClass("is-hidden");
    }
  }

  $(".player-hand").click(function(){
    // $("#game").html("<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand is-hidden\" aria-hidden=\"true\"></i>")
    makeAiChoice();
  });
});
