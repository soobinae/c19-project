var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

var backgroundImg


function preload(){
 boyImage = loadImage("boyrunning.png")
  
  groundImage = loadImage("ground2.png");
  
  backGroundImage = loadImage("forest.jpg");
  
  cloudImage = loadImage("cloud1.png");
  
  obstacle1 = loadImage("rock1.png");
  obstacle2 = loadImage("rock2.png");
  obstacle3 = loadImage("rock3.jpg");
  obstacle4 = loadImage("rock4.png");
  obstacle5 = loadImage("rock5.png");
  obstacle6 = loadImage("rock6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameover.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  boy = createSprite(50,180,20,50);
  boy.addImage("running", boyImage);
  boy.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(250,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,100);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  boy.setCollider("circle",0,0,40);
  
  
  score = 0;
  
}

function draw() {
  
  background(backGroundImage);
  
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
    
    boy.velocityY = boy.velocityY + 0.8
  
    spawnClouds();
  
    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
   else if (gameState === END) {
    
    reset();

      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  
  boy.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   obstacle.scale = 0.1;
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
             
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 200;
    cloud.depth = boy.depth;
    boy.depth = boy.depth + 1;
   cloudsGroup.add(cloud);
    }
}

function reset(){
  if(mousePressedOver(restart)){
  gameState = PLAY;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  restart.visible = false;
  gameOver.visible = false;

  score = 0;

  }

}



