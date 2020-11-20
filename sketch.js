var trex; var ground, invisibleg, cloud, cactus, gameState='play', cacti, cloudg, score=0, restart, gameover, jump, die, checkpoint, touches= [];
function preload() {
  trex1= loadAnimation('trex1.png','trex3.png','trex4.png');
  trex2= loadAnimation('trex_collided.png');
  ground1= loadAnimation('ground2.png');
  cloud1= loadAnimation('cloud.png');
  cactus1= loadAnimation('obstacle1.png');
  cactus2= loadAnimation('obstacle2.png');
  cactus3= loadAnimation('obstacle3.png');
  cactus4= loadAnimation('obstacle4.png');
  cactus5= loadAnimation('obstacle5.png');
  cactus6= loadAnimation('obstacle6.png');
  restart1= loadImage('restart.png');
 gameover1= loadImage('gameOver.png');
  jump=loadSound("jump.mp3");
  die=loadSound('die.mp3');
  checkpoint=loadSound('checkPoint.mp3');
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  trex= createSprite(width/4,height/2,30,50);
  trex.addAnimation("trex",trex1);
  trex.addAnimation("trex2",trex2);
  trex.scale=0.5;
  //trex.debug=true;
  //trex.setCollider("circle",0,0,20)
  trex.setCollider("rectangle",0,0,30,80,30)
 ground = createSprite(width/2,height/2+50,800,5); 
 ground.addAnimation("ground",ground1);
 ground.velocityX=-5;
  
  invisibleg = createSprite(width/2,height/2+55,width,5);
  invisibleg.visible= false;
  cacti=new Group();
  cloudg=new Group();
  
restart= createSprite(width/2,height/4+50);
  restart.addImage(restart1);
  restart.scale = 0.5;
  
  gameover= createSprite(width/2,height/4);
  gameover.addImage(gameover1);
  gameover.scale = 0.5;
}

function draw() {
  background('white');
  if(gameState=='play'){
  trex.changeAnimation("trex",trex1);
    if ((touches.length>0 || keyDown('space'))&&(trex.y>=height/2+29)){
 trex.velocityY=-10;
 jump.play(); 
 touches = [];     
  }
 restart.visible=false;   
 gameover.visible=false;   
  trex.velocityY= trex.velocityY+0.5;
  score= score+1;
  if(ground.x<0){
  ground.x=width/2;
  }//end of ground re positioning
    if(frameCount %90 == 0){
   var r= Math.round(random(height/4-10,height/4+50));
cloud = createSprite(width,r,20,20);
  cloud.addAnimation("cloud",cloud1);
  cloud.scale = 0.5 
  cloud.velocityX= -2
    cloud.depth = 0.5;
    cloud.lifetime= 230;
    console.log("c",cloud.depth);
    cloudg.add(cloud); 
  }//end of if (cloud)
  
  if(frameCount %100 == 0){
  cactus = createSprite(width,height/2+35,10,10);
    //cactus.addAnimation("obstacle",cactus1);
    cactus.velocityX= -5;
    cactus.scale = 0.5;
    cactus.lifetime = 230;
    r =Math.round( random(1,6))
    
    switch(r){
    case 1: cactus.addAnimation("obstacle",cactus1);
        break;
    case 2: cactus.addAnimation("obstacle2",cactus2);
        break;
    case 3: cactus.addAnimation("obstacle3",cactus3);
        break;
    case 4: cactus.addAnimation("obstacle4",cactus4);
        break;
   case 5: cactus.addAnimation("obstacle5",cactus5);
        break;
   case 6: cactus.addAnimation("obstacle6",cactus6);
        break;
        default: break;
    }//end of switch
    cacti.add(cactus);
  }//end of obstacle
    if(trex.isTouching(cacti)){
    gameState='end';
     die.play(); 
    }
     if(score%100==0){
checkpoint.play();
ground.velocityX = ground.velocityX -1;
cactus.velocityX= ground.velocityX;
console.log(cactus.velocityX);       
  }
  }// end of gamestate play
text("score;"+zero()+score,width/2,height/8); 
 //checkpoint.play(); 
 
  
  if(gameState== 'end'){
    trex.changeAnimation("trex2",trex2);
   ground.velocityX=0; 
    cacti.setVelocityXEach(0);
    cloudg.setVelocityXEach(0);
    cacti.setLifetimeEach(-1);
    cloudg.setLifetimeEach(-1);
    restart.visible=true;
    gameover.visible=true;
    trex.velocityY= 0;
    if(mousePressedOver(restart) || touches.length>0){
     ground.velocityX= -5; 
    cacti.destroyEach();
    cloudg.destroyEach();  
    score= 0;  
    gameState='play'; 
    touches = [];  
    }
  }// end of gamestate end
 console.log(ground.velocityX); 
   trex.collide(invisibleg);
 // console.log(Math.round(random(1,10)));
  //%(modulus) 15%4=3 30%5=0
  drawSprites();
}
function zero(){
if(score>0 && score<=9){
 return "0000";
} 
 if(score>9 && score<=99){
   return "000";
 } 
  if(score>99 && score<=999){
    return "00";
  }
  if(score>999 && score<=9999){
    return "0";
  }
}