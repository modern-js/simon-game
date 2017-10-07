let gameOn = false;
let strictOn = false;
let allowClick = false;
let count = 0;
let sequence = [];


const start = function(){
  console.log("started");

  gameOn = true;

  $("#stop").one("click",stop);
}

const stop = function(){
  console.log("stopped");

  allowClick = false;
  gameOn = false;
  sequence = randomSequence();

  $("#start").one("click",start);
}

$(document).ready(stop);


$("#strict").on("click", function(){
  if ( gameOn ) return;
  strictOn=!strictOn;
  $(this).blur();
  if ( !strictOn ) $(this).css("background","linear-gradient(white,green)");
              else $(this).css("background","");
});

$("#start").on("click",function() {
  $("#start").blur();
  $("#start").css("background","linear-gradient(gray,yellow)");
  setTimeout(function(){$("#start").css("background","");},200);
});

$("#stop").on("click",function() {
  $("#stop").blur();
  $("#stop").css("background","linear-gradient(gray,lightblue)");
  setTimeout(function(){ $("#stop").css("background","");},200);
//  initializeDesign();
});

const randomSequence = function() {
  let sequence=[];
  for (let i = 0; i < 100; i++ )
    sequence[i]=Math.floor(4*Math.random());
  return sequence;
}
