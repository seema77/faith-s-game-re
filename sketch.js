var bkImg;
var boyImg;
var rocksImg,logImg;
var PLAY=1
var END=0
var gameState=PLAY
var obstaclesGroup;

function preload(){
bkImg=loadImage("bk.jpg");
boyImg=loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png","b9.png")
rocksImg=loadImage("rocks.png");
log=loadImage("log.png");
groundImg=loadImage("ground2.png");
boyCollided=loadAnimation("b6.png");
}

function setup(){
createCanvas(1200,550)
boy = createSprite(150,420,20,20);
boy.addAnimation("running",boyImg);
boy.addAnimation("collided",boyCollided);
boy.scale=0.3

ground=createSprite(600,540,1200,20);
ground.addImage(groundImg);
ground.scale=2.5
ground.velocityX=-10

boy.setCollider("rectangle",0,0,250,450);
boy.debug=true

obstaclesGroup= new Group()
}

function draw(){
background(bkImg);

if (gameState===PLAY){
    if(ground.x<0){
        ground.x=ground.width/2
    }
    if(keyDown("space")){
        boy.velocityY=-10
    }
    boy.velocityY=boy.velocityY+0.5
    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
        gameState=END;
    }
}

else if(gameState===END){
    boy.velocityY=0;
obstaclesGroup.setVelocityXEach(0);
ground.velocityX=0;
boy.changeAnimation("collided",boyCollided)
}
boy.collide(ground);


drawSprites();

}

function spawnObstacles(){
    if(frameCount%150===0){
    obstacle = createSprite(800,515,20,20);
    obstacle.velocityX=-8
var rand=Math.round(random(1,2));
switch(rand){
    case 1:obstacle.addImage(rocksImg);
    break
    case 2:obstacle.addImage(log);
    break
}

obstacle.scale=0.2;
obstaclesGroup.add(obstacle);
    }
}