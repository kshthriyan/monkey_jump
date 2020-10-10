var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var ground, gameState = PLAY;
var score = 0
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backImage = loadImage("jungle.jpg")

}



function setup() {
  createCanvas(500, 400);
  ground = createSprite(0, 0, 800, 600);
  ground.addImage(backImage);
  ground.velocityX = -3

  invisibleGround = createSprite(400, 300, 900, 20);
  invisibleGround.visible = false;

  monkey = createSprite(60, 250, 20, 50);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;

  bananasGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("green");


  if (ground.x < 0) {
    ground.x = 400
  }
  drawSprites();

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 180) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if ((monkey.isTouching(bananasGroup))) {
      score = score + 1
      banana.destroy();
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    stroke("white");
    textSize("20");
    fill("white");
    survivalTime = Math.ceil(frameCount / frameRate())
    text("SURVIVAL TIME =" + survivalTime, 100, 50);

    stroke("red")
    textSize("20")
    fill("red");
    text("score :" + score, 300, 50)

    bananas();
    obstacles();
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
      monkey.scale=0.0
    }

  } else if (gameState === END) {

    ground.velocityX = 0;
    stroke("black");
    textSize("28");
    fill("black")
    text("GAME OVER !!", 200, 200)
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
  }

  monkey.collide(invisibleGround)

  switch (score) {

    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18

  }




}

function obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(430, 245, 60, 60);
    obstacle.velocityX = -3
    obstacle.lifetime = 590;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 140)
    obstaclesGroup.add(obstacle)
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(430, 320, 20, 20)
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3
    bananasGroup.add(banana);
    banana.y = Math.round(random(100, 180));
  }
}