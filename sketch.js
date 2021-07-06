var path,mainCyclist;
var pathImg,mainRacerImg1,racer_falling;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var bellSound;

var oppPink1Img,pinkGroup,player2;

  var oppYellow_falling,yellowGroup,oppYellow2Img;

var oppRed1Img, redGroup

var obstaclesGroup1, obstacle1Img,obstacleGroup2, obstacle2Img, obstacleGroup3, obstacle3Img

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  racer_falling= loadAnimation("playerFalling.png");
 
  bellSound=loadSound("sound/bell.mp3")

  oppPink1Img=
  loadAnimation("opponent1.png","opponent2.png")
  
  oppYellow1Img= loadAnimation("opponent4.png","opponent5.png")
  
  oppYellow_falling= loadAnimation("opponent5.png")
  
 oppRed1Img=loadAnimation("opponent7.png","opponent8.png") 
 
obstacle1Img= loadImage("obstacle1.png")
obstacle2Img= loadImage("obstacle2.png") 
obstacle3Img= loadImage("obstacle3.png")  
  
}

function setup(){
  
createCanvas(displayWidth - 20, displayHeight-30);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
 
yellowGroup= createGroup();
pinkGroup= createGroup();  
redGroup= createGroup();
obstacleGroup1= createGroup();  
obstacleGroup2= createGroup();
obstacleGroup3= createGroup();  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
   camera.position.x = displayWidth/2;
    edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
   distance= distance + Math.round(getFrameRate()/50)
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  if(keyDown("space")){
    bellSound.play();
  }  
 
  path.velocityX=-(6+2*distance/150)
    
 var select_oppPlayer=Math.round(random(1,3));   
    
 if (World.frameCount%150==0){
   if (select_oppPlayer==1){
     pinkCyclists();
   } else if (select_oppPlayer==2){
     yellowCyclists();
   } else{
     redCyclists();
   } 
   }
    
 var select_obstacle= Math.round(random(1,3)) 
 
 if (World.frameCount%80==0){
   if(select_obstacle==1){
     spawnObstacles1();
   } else if (select_obstacle==2) {
     spawnObstacles2();
   }else{
     spawnObstacles3();
   }
 }
 
if(mainCyclist.isTouching(yellowGroup)){
  gameState=END;
}

if (mainCyclist.isTouching(redGroup)){
  gameState= END;
}    
 
if(mainCyclist.isTouching(pinkGroup)){
  gameState=END;
}    
 
if(mainCyclist.isTouching(obstacleGroup1)){
  gameState=END;
}    
    
if(mainCyclist.isTouching(obstacleGroup2)){
  gameState=END;
}    
    
if(mainCyclist.isTouching(obstacleGroup3)){
  gameState=END;
}    
    
}  
    
 if (gameState===END){
  
  yellowGroup.setVelocityXEach(0);
  path.velocityX=0
  yellowGroup.setLifetimeEach(-1);
  mainCyclist.velocity=0;
  
  redGroup.setVelocityXEach(0);
  redGroup.setLifetimeEach(-1);
  
  pinkGroup.setVelocityXEach(0);
  pinkGroup.setLifetimeEach(-1);
  
  obstacleGroup1.setVelocityXEach(0);
  obstacleGroup1.setLifetimeEach(-1)
  
  obstacleGroup2.setVelocityXEach(0);
  obstacleGroup2.setLifetimeEach(-1);
  
  obstacleGroup3.setVelocityXEach(0);
  obstacleGroup3.setLifetimeEach(-1);
 
  mainCyclist.addAnimation(racer_falling); 
  



} 

 mainCyclist.debug= false
 mainCyclist.setCollider("circle",0,0,50); 
  
}

function pinkCyclists(){
var player1= createSprite(1100,Math.round(random(50,250)),20,20);
player1.scale=0.06;
player1.velocityX=-(6+2*distance/150)  
player1.addAnimation("opponentPlayer1",oppPink1Img);
player1.lifetime=170;  
pinkGroup.add(player1)  
}

function yellowCyclists(){
var player2= createSprite(1100,Math.round(random(45,200)),20,20);
player2.scale=0.06;
 player2.velocityX=-(6+2*distance/150) 
player2.addAnimation("opponentPlayer2",oppYellow1Img);
player2.lifetime=190;  
yellowGroup .add(player2)  
}

function redCyclists(){
var player3= 
createSprite(1100, Math.round(random(60,300)),20,20);
player3.scale=0.06;
player3.velocityX=-(6+2*distance/150);
player3.addAnimation("opponentPlayer3",oppRed1Img);  
player3.lifetime=200;
redGroup.add(player3)  
}

function spawnObstacles1(){
 var obstacle1= createSprite(1100, Math.round(random(55,250)),20,20)
obstacle1.scale=0.1;
obstacle1.velocityX=-(6+2*distance/150)  
obstacle1.addImage(obstacle1Img)
 obstacle1.lifetime=200; 
 obstacleGroup1.add(obstacle1)
}

function spawnObstacles2(){
 var obstacle2= createSprite(1100, Math.round(random(70,350)),20,20)
obstacle2.scale=0.1;
obstacle2.velocityX=-(6+2*distance/150)  
obstacle2.addImage(obstacle2Img)
 obstacle2.lifetime=200; 
 obstacleGroup2.add(obstacle2)
}

function spawnObstacles3(){
 var obstacle3= createSprite(1100, Math.round(random(20,150)),20,20)
obstacle3.scale=0.1;
obstacle3.velocityX=-(6+2*distance/150)  
obstacle3.addImage(obstacle3Img)
 obstacle3.lifetime=200; 
 obstacleGroup3.add(obstacle3)
}



