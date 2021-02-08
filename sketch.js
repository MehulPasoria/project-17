
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,background,backgroundImg
var FoodGroup, obstacleGroup
var score

var survivalTime=0;

function preload(){
  
  backgroundImg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
}



function setup() {
createCanvas(800,400); 
background=createSprite(0,0,800,400); background.addImage(backgroundImg); background.scale=1.5; background.x=backgr.width/2; background.velocityX=-4; 
  
monkey = createSprite(80,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1; 
  
ground = createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false;
  
score=0;  
   
var rand = Math.round(random(1,100))
console.log(rand)
  
obstacleGroup=createGroup();
FoodGroup=createGroup();  
  
}


function draw() {
background("backgroundImg");
spawnFood(); 
spawnObstace();  
drawSprites();  
  
if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
  monkey.collide(ground);  

stroke("white");
textSize(20);
fill("white");
text("score :"+score,500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("survival Time :"+survivalTime,300,50); 
  
  switch(score)
  { case 10: monkey.scale=0.12;
      break; case 20:
      monkey.scale=0.14; break; case 30:
      monkey.scale=0.16; break; case 40:
      monkey.scale=0.18; break; default: break; }

  if(keyDown("space")){
  monkey.velocityY=-10;
}


monkey.velocityY=monkey.velocityY+0.8;

if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
  score=score+1;
}

if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
     }  
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.addImage("banana",bananaImage);  
    banana.y = random(120,200); 
    banana.velocityX=-2;
    banana.scale=0.1;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstace(){
  if(frameCount % 300 === 0){
    var obstace = createSprite(800,320,10,40);
    obstace.addImage("obstace",obstaceImage);
    obstace.velocityX=-2
    obstace.scale=0.1;
    obnstace.lifetime = 500;
    obstacleGroup.add(obstace); 
  }
}

