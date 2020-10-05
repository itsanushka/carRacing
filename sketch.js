var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var C1, C2, C3, C4, track 

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function preload(){
  C1= loadImage("images/car1.png")
  C2= loadImage("images/car2.png")
  C3= loadImage("images/car3.png")
  C4= loadImage("images/car4.png")
  track = loadImage("images/track.jpg")
  

}

function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end()
  }
}
// 0= start, 1= play, 2= end 