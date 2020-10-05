class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1",C1)
    car2 = createSprite(300,200);
    car2.addImage("c1",C2)
    //car3 = createSprite(500,200);
    //car4 = createSprite(700,200);
    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank()
    if(allPlayers !== undefined){
     background("brown") 
     image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
     
       
        cars[index-1].x = x;
        cars[index-1].y = y;
        textSize(24)
        fill("white")
        text(allPlayers[plr].name,x-30,y+80)
        if (index === player.index){
          fill("yellow")
        ellipse(x,y,60,60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<3600){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null ){
      player.distance -=30
      player.update();
    }
    if(player.distance>3550 ){
      gameState=2
      player.rank+=1
      Player.updateRank(player.rank)
    
    }

    drawSprites();
  }
  end(){
    console.log("Game ended")
    console.log(player.rank)
  }
}
