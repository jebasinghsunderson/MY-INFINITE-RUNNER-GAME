var ninja,ninjaimage;
var stone,stoneimage,stoneGroup;
var galaxy,galaxyimage;
var ground,ground2,ground3,ground4,endscreen,introscreen;
var survived_score=0
var goldscore=0;
var PLAY=3;
var END=0;
var INTRO=2;
var gameState=INTRO;
var sound;
var background,backgroundimage;
var gold,goldGroup,goldimage;

function preload(){
   ninjaimage = loadImage("images (1)-1.png");
  stoneimage = loadImage("images.png");
   
  sound=loadSound("mixkit-sad-game-over-trombone-471.wav");
  backgroundimage=loadImage("d45046e41834c800c2392f2c2a4425e6.jpg");
  
  goldimage=loadImage("download (2)-1.jpg");
}

function setup() {
  createCanvas(800,500);
  
  background= createSprite(0,0,800,500);
  background.addImage("spaceImage",backgroundimage)
  background.velocityX=-(5+survived_score/100);
  background.scale=2
  
  endscreen=createSprite(0,0,8000,5000);
  endscreen.shapeColor="black";
  endscreen.visible=false;
  
  introscreen=createSprite(0,0,8000,5000);
  introscreen.shapeColor="black";
  introscreen.visible=false;
  
   ninja=createSprite(50,150,10,10);
   ninja.addImage("superman_moving",ninjaimage);
   ninja.scale=0.8;
   visible=false;
   ground=createSprite(350,500,200,1000);
   ground.visible=false;
  
   ground2=createSprite(30,20,2000,10);
   ground2.visible=false;
  
   ground3=createSprite(20,20,0.01,1000);
   ground3.visible=false;
  
  ground4=createSprite(20,490,10000,10);
   ground4.visible=false;
  
  stoneGroup=new Group();
  goldGroup=new Group();
}

function draw() {
  if(gameState===INTRO){
    
     introscreen.visible=true 
    ninja.visible=true;
    ninja.x=280
    ninja.y=320
    background.visible=false;
   survived_score=0;
    goldscore=0
    if(keyDown("space")){
      gameState=PLAY;
     
    }
  }
 
  if(gameState===PLAY){
    if(background.x<-250){
      background.x=background.width/2
    }
    console.log(ninja.depth)
    
   background.visible=true;
    introscreen.visible=false;
       ninja.visble=true
   
     if(keyDown("LEFT_ARROW")){
    ninja.x=ninja.x-8;
  }
 
  if(keyDown("RIGHT_ARROW")){
    ninja.x=ninja.x+8;
  }
  
  if(keyDown("UP_ARROW")){
    ninja.y=ninja.y-8;
  }
  
  if(keyDown("DOWN_ARROW")){
    ninja.y=ninja.y+8;
  }
  
  if(ninja.isTouching(ground)){
    ninja.bounceOff(ground);
  }
   if(ninja.isTouching(ground2)){
    ninja.bounceOff(ground2);
  }
    if(ninja.isTouching(ground3)){
    ninja.bounceOff(ground3);
  }
     if(ninja.isTouching(ground4)){
    ninja.bounceOff(ground4);
  }
     
    if(ninja.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      sound.play();
      gameState=END;
    }
    if(ninja.isTouching(goldGroup)){
      goldscore=goldscore+1
      goldGroup.destroyEach();
    }
  survived_score=survived_score+Math.round(getFrameRate()/60);
    
  if(frameCount % 80 == 0 ){
     spawnstone();
    spawnstone()
    
      }
  if(frameCount % 120 == 0){
     spawngold();
      }
  }
  
  if(gameState===END){
   ninja.visible=false;
   goldGroup.destroyEach();
     endscreen.visible=true;
  
    if(keyDown("r")){
      gameState=INTRO;
      score=0
      ninja.visible=true;
      ninja.x=100;
     ninja.y=150;
      endscreen.visible=false;
    }
  }
   
   
  
 
 drawSprites();
  if(gameState===END){
   
     stroke("red");
    fill("red")
    textSize(40);
    text("Game over",200,250);
    text("Press 'r' to restart",150,300);
     textSize(20);
    text("High score:"+survived_score,400,40);
    text("gold score:"+goldscore,400,60);
  }
  if(gameState===PLAY){
  stroke("yellow");
  fill("yellow");
  textSize(20);
 
  text("survived score :"+survived_score,500,50);
  text("gold score :"+goldscore,500,80);   
  }
   if(gameState===INTRO){
       stroke("yellow");
  fill("yellow");
  textSize(20);
     text("Help the astronaut to escape from the meteoroids ",170,200);
     text("And also collect the gold coin",250,220);
    text("Press  'space'  to start",380,280);
   }
}
function spawnstone(){
 
    stone=createSprite(800,Math.round(random(50,500)));
    stone.addImage("rock",stoneimage);
    stone.scale=0.3;
  stone.lifetime=130
    stone.velocityX=-(9+survived_score/100);
  if(stone.isTouching(stone)){
       stone.bounceOff(stone)
     }
    stoneGroup.add(stone);
}
function spawngold(){
    gold=createSprite(800,Math.round(random(50,500)),10,10);
    gold.addImage("gold",goldimage);
    gold.lifetime=160;
    gold.velocityX=-(9+survived_score/100);
   gold.scale=0.3
    goldGroup.add(gold);
}