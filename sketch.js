var tower, towerimg;

var door, doorimg, doorsGroup;

var climber, climberimg, climbersGroup;

var ghost, ghostimg;

var block, blockGroup;

var gameState="play";

var score=0;

var spookySound;

function preload(){
  towerimg=loadImage("tower.png"); 
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  ghostimg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300,10,10);
  tower.addImage(towerimg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,10,1);
  ghost.addImage(ghostimg);
  ghost.scale=0.4;
  
  
  
  doorsGroup=new Group();
  
  climbersGroup=new Group();
  
  blockGroup= new Group();
}

function draw(){
  if (gameState==="play"){
    text("score: "+score,500,50);
    score=score+Math.round(getFrameRate()/60);
  if (tower.y>500){
    tower.y=300;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;    
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (keyDown("left")){
    ghost.x=ghost.x-3;    
  }

  if (keyDown("right")){
    ghost.x=ghost.x+3;    
  }
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
     spawnDoors();
  
  if (blockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  drawSprites();
}
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!",230,250);
  }
}

function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite(200,-50,10,10);
    door.x=Math.round(random(120,400));
    door.addImage(doorimg);
    door.velocityY=1;
    door.lifetime=700;
    doorsGroup.add(door);
    
    climber=createSprite(200,10,10,10);
    climber.addImage(climberimg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=700;
    climbersGroup.add(climber);
    
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    climber.depth=door.depth;
    
    var block = createSprite(200,15,1,2);
    block.width=climber.width;
    block.x=door.x;
    block.velocityY=1;
    blockGroup.add(block);
    block.debug=true;
  }
  
}