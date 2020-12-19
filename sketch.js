//declaring the variables globally
var monkey,monkey_running;

var banana,bananaImage;
var obstacle,obstacleImage;


var bananaGroup,obstacleGroup;

var ground,groundImage;
var invisibleGround;

var bg;

var survivalTime = 0;
var score = 0;

var PLAY = 1;
var END = 0;

var gamestate = PLAY;
var gameoverText = "You Died!!"


function preload(){
  
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
bananaImage = loadImage("banana.png");  
  
obstacleImage = loadImage("obstacle.png");  
  
groundImage = loadImage("ground2.png");
  
bg = loadImage("download.jpg");
  
 
}


function setup() {
  createCanvas(600,600);
  
//creating ground
          ground=createSprite(400,350,900,10);
          ground.velocityX=-5;
          ground.x=ground.width/2;
          ground.addImage("ground",groundImage);
  
  //creating banana & obstacle group
          bananaGroup = createGroup();
          obstacleGroup = createGroup();
          invisibleGround = createSprite(400,360,900,10);
          invisibleGround.visible = false;

 //creating monkey
          monkey = createSprite(80,315,20,20);
          monkey.addAnimation("moving",monkey_running);
          monkey.scale=0.1;
  
  
}


function draw() {
  background(bg);

  //when we press space the monkey will jump upwards.
  if(keyDown("space")&& monkey.y >= 200)
     {
     monkey.velocityY=-10;
     }
   
  //adding gravity
    monkey.velocityY = monkey.velocityY+0.8;
  
  //to make infinite ground
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }

  
  bananaFood();
  stones();

  if(gamestate===PLAY){
    
        gameoverText.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
        bananaGroup.destroyEach();
        survivalTime = survivalTime+2;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
       gamestate=END
       obstacleGroup.destroyEach();
  
  } if(gamestate===END){

      monkey.destroy();
      ground.destroy();
      
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
    
      gameoverText.visible=true;
    
      stroke("white");
      textSize(30);
      fill("black");
      text(gameoverText,250,300);

    
  }
 
        stroke("white");
        textSize(20);
        fill("white");
        text("Score: "+ score,500,50);

        stroke("red");
        textSize(24);
        fill("yellow");
        text("Survival Time: " + survivalTime,50,550);
  
//the monkey will collide with the ground
  
        monkey.collide( invisibleGround);
  
// to draw all sprites
        drawSprites();
   
}

     
function bananaFood(){
  
   if(World.frameCount%120==0){

        banana = createSprite(600,130,20,20);
        banana.addImage(bananaImage); 
        banana.scale=0.1;
        banana.y = Math.round(random(120,200));
        banana.velocityX=-5;
        banana.lifetime=150;

        bananaGroup.add(banana);  
      
  }
}
function stones(){
  
  if(World.frameCount%300==0){
    
        obstacle = createSprite(600,330,10,40);
        obstacle.addImage(obstacleImage);
        obstacle.scale=0.1;
        obstacle.velocityX= -5;
        obstacle.lifetime=150;
        obstacleGroup.add(obstacle);

  }
}
