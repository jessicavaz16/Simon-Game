
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;

//to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started= false;// var started=0;

//to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){

    if(!started){//if(started==0){

        $("#level-title").text("Level "+level);

        nextSequence();

        started = true;//started=1;}
        // if not false(i.e if true) carry out thr function, if not true(i.e false) then come out of loop
       
    }
});
$(".btn").click(function () {
    
    var userChosenColor= $(this).attr("id");
    // ALTERNATE METHOD
   //var userChosenColor= event.target.id;  --- .click(function(event) {

    userClickedPattern.push(userChosenColor);

    // var clickAudio = new Audio("sounds/" + userChosenColor + ".mp3");
    // clickAudio.play();

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel)
{
//to check if the most recent user answer is the same as the game pattern.
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
 console.log("success");

  //If the user got the most recent answer right, then check that they have finished their sequence
 if(userClickedPattern.length===gamePattern.length){
  
    // Call nextSequence() after a 1000 millisecond delay. 
    setTimeout(function (){
        nextSequence();},1000);
 }
}
 else{
     console.log("Fail");

     playSound("wrong");

     $("body").addClass("game-over");

     setTimeout(function(){
        $("body").removeClass("game-over");
     },200);

     $("#level-title").html("Game Over, Press Any Key To Restart.");

     startOver();
 }
}
   
function nextSequence()

{ //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
      userClickedPattern=[];

    level++;//increase the level by 1 every time nextSequence() is called.

    $("#level-title").text("Level "+level);

  var randomNumber=Math.floor( Math.random()*4);

  var randomChosenColor= buttonColors[randomNumber];

   gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

//   var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
//   audio.play()

playSound(randomChosenColor);

animatePress(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  
    audio.play();
}

function animatePress(currentColor) 
{    
$("#" + currentColor).addClass("pressed");

setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");},100);
}

 function startOver(){
   level=0;

   gamePattern=[];

   started=false;
 }


