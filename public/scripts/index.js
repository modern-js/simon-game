const colors = ["#00b33c","#b32400","#b35900","#002db3"];
const altcolors = ["#80ffaa","#ff9980","#ffbf80","#809fff"];
let gameOn = false;
let strictOn = false;
let allowClick = false;
let needToWin = 20;
let count = 0;
let curr = 0;
let sequence = [];

let lighttime=600;
let betweentime=300;

$("b").on("click",function(){
  var id = $(this).attr("id");
  if ( id==='littleBox' ) return;

  if ( !allowClick ) return;
  allowClick=false;

  if ( id==sequence[curr] ) {
    flash(id);
    curr++;
    if ( curr>count ) {
      count++;
      if ( count==needToWin ) {
        flash_counter("<em style='font-size:15px'>WIN</em>");
        setTimeout(stop,lighttime);
      }
      else {
        $("#count").html(count);
        setTimeout(showSequence,lighttime);
        curr=0;
      }
   } else allowClick = true;
  }
  else if (!strictOn) {
    flash_counter("<em style='font-size:15px'>WRONG</em>");
    setTimeout(showSequence, lighttime);
    curr=0;
  }
  else {
    flash_counter("<em style='font-size:15px'>LOOSE</em>");
    setTimeout(stop,lighttime);
  }
});

const showSequence = function(i=0){
  if ( !gameOn ) return;
  allowClick = false;
  setTimeout(function(){flash(sequence[i]);},lighttime);
  setTimeout(function(){
   if ( i<count ) showSequence(i+1);
          else allowClick=true;
  },lighttime+betweentime);
}

const start = function(){
  gameOn = true;
  count = 0;
  curr = 0;
  showSequence();
  console.log('playing');
  $("#stop").one("click",stop);
}

const stop = function(){
  allowClick = false;
  gameOn = false;
  sequence = randomSequence();
  initDesign();
  console.log('stop');
  $("#start").one("click",start);
}

$(document).ready(stop);

$("#strict").on("click", function(){
  if ( gameOn ) return;
  strictOn=!strictOn;
  console.log('strict changed');
  $(this).blur();
  if ( strictOn ) $(this).css("background","linear-gradient(white,green)");
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
});

const flash = function(x) {
  makeSound(x);
  var selector=$("#"+x);
  selector.css("background-color",altcolors[x]);
  setTimeout(function(){selector.css("background-color",colors[x]);},lighttime);
}

const flash_counter = function(s) {
  $("#count").html(s);
  setTimeout(function(){
    $("#count").html(count);
  },600);
}

const initDesign = function() {
  for ( let i in colors ) {
    let color = colors[i];
    $("#"+i).css("background-color",color);
  }
  let w = ($("body").width()-400)/2;
  let h = ($("body").height()-400)/2;
  $("#containerbox").css("margin",h+"px "+w+"px "+h+"px "+w+"px");
}

const randomSequence = function() {
  let sequence=[];
  for (let i = 0; i < 100; i++ )
    sequence[i]=Math.floor(4*Math.random());
  return sequence;
}

const makeSound = function(x) {
  let sounds = ['do','la','si','sol'];
  let soundFile = '/sounds/'+sounds[x]+'.wav';
  let audio = new Audio(soundFile);
  audio.play();
}
