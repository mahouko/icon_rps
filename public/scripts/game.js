var aiChoice;
$(document) .ready(function() {
  aiChoice = Math.floor(Math.random() * 3);
  if (aiChoice==0) {
    $(".fa-hand-rock-o").toggleClass("is-hidden");
  } else if (aiChoice==1) {
    $(".fa-hand-paper-o").toggleClass("is-hidden");
  } else if (aiChoice==2) {
    $(".fa-hand-scissors-o").toggleClass("is-hidden");
  }
});
