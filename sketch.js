const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;
var platform;
var log6, slingshot;
var estado = "onSling"
var score = 0

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

   
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150,305,300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80,PI/2);
    slingshot = new Slingshot(bird.body,{x:200,y:50});

    
    
    //getTime();

}

function draw(){
    if(backgroundImg){ 
    background(backgroundImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Puntuacion: "+score, width-300,50);

    Engine.update(engine);
    /*console.log(box2.body.position.x);
    console.log(box2.body.position.y);
    console.log(box2.body.angle);*/
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();

    
}
function mouseDragged(){
    //if(estado !== "launched"){ 
    Matter.Body.setPosition(bird.body,{x:mouseX, y:mouseY});
    //}
}
function mouseReleased(){
    slingshot.fly();
    estado = "launched";
}
function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
    }
}
async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON = await response.json();
    console.log(responseJSON.datetime);
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);

    if(hour >= 06 && hour <= 19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}