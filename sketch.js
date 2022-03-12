var player, enemy;
var right, left;
var rightImg,leftImg;
var groundImg, ground;
var missile,missileImg;
var plane, planeImg;
var score = 0;
var q,w;
var time = 500;
var gameOver, gameOverImg;
var gameState = 'play';
var resetButton, resetButtonImg;
var line;
var death, checkPoint;

function preload(){
  groundImg = loadImage('ground2.png');
  planeImg = loadImage('plane.png');
  gameOverImg = loadImage('GameOver.png');
  missileImg = loadImage('Missile.png');
  resetButtonImg = loadImage('ResetButton.jpg');
  death = loadSound('Death.m4a');
  checkPoint = loadSound('checkPoint.mp3')
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width/2-125,height-10);
  ground.addImage(groundImg);
  ground.scale = 0.75;

  player = createSprite(25, height-17.5, 20, 20);
  player.shapeColor = 'green';
  // player.stroke = 'black';
  // player.strokeWeight = 100;

  q = createSprite(0,height/2,1,height);
  w = createSprite(width,height/2,1,height)
  q.visible = false;
  w.visible = false;

  gameOver = createSprite(width/2, height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
 
  missiles = new Group();

  missile = createSprite(random(1,width));
  missile.addImage(missileImg);
  missile.velocityY = 5;
  missiles.add(missile);

  resetButton = createSprite(width/2, height/2 + height/5);
  resetButton.addImage(resetButtonImg);
  resetButton.scale = 0.275

  line = createSprite(width/2, height, width, 1);

  // resetButton = createImage('ResetButton.jpg');
  // resetButton.size(50, 15);
  // resetButton.position(25, 25);
  // resetButton.mouseClicked(reset);
}


function draw(){
  
  if(time >= 50){
    time = time-25;
  }

  player.collide(q);
  player.collide(w);

  //player
  //player movement
  if(gameState == 'play'){
    background(255);
    
    score += 0.25
    fill(75)
    textSize(15);
    text('Score: '+ Math.round(score), 15, 25);

    player.visible= true;
    gameOver.visible = false;
    resetButton.visible = false;

    if (keyDown(RIGHT_ARROW)){
      player.x += 5;
    }
    else if (keyDown(LEFT_ARROW)){
      player.x -= 5;
    }

    if(score%50 == 0){
      checkPoint.play();
    }

    //death
    if (player.isTouching(missiles)){
      gameState = 'end';
      death.play();
    }
    spawn();
    missiles.setRotationSpeedEach(5);
  }
  if(gameState == 'end'){
    player.visible = false;
    gameOver.visible = true;
    resetButton.visible = true;

    

    if(mousePressedOver(resetButton)){
      reset();
    }

    background(30);

    fill('white');
    textSize(15);
    text('Score: '+ Math.round(score), 15, 25);
    missiles.destroyEach()
  }
  drawSprites();
}

function reset(){
  score = 0;
  gameState = 'play';
}

function spawn(){
  if(frameCount%time == 0){
    missile = createSprite(random(1,width));
    missile.addImage(missileImg);
    missile.velocityY = 5+(score/10);
    missiles.add(missile);
    missiles.setColliderEach('circle');
  }
}

// function spawn(){
//   if(frameCount%time == 0){
//     plane = createSprite(width+25,70);
//     plane.addImage(planeImg);
//     plane.scale = 0.35;
//     plane.velocityX = -5;
//     if(plane.x <= -50){
//       plane.destroy;
//     }
//     planes.add(plane);
//     num1 = Math.round(random(1,width));
//     num2 = Math.round(random(1,width));
//     num3 = Math.round(random(1,width));
//     console.log(num1);
//    
//     if(plane.x == num1){
//       console.log('drop');
//     }
//   }
// }

// var face = 0
//     if(isTouching(q) || isTouching(w)){
//       if(face == 0){
//         plane.rotate(180);
//         face = 1;
//         plane.velocityX = 5;
//       }
//       if(face == 1){
//         plane.rotate(180);
//         face = 0;
//         plane.velocityX = -5;
//       }
//     }