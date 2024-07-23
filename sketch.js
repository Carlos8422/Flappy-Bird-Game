let backgroundImage;
let bird;
let pipes;
let score = 0;

let birdXPos = 100;
let birdYPos = 250;

let pipeTop1;
let pipeBottom1;

let pipes1_X = 200;
let pipeTop1_Y = 125;
let pipeBottom1_Y = 550;


let pipeTop2;
let pipeBottom2;

let pipes2_X = 475 ;
let pipeTop2_Y = 125;
let pipeBottom2_Y = 550;


let pipes1TopRandomHeight;
let pipes1BottomRandomHeight;

let pipes2TopRandomHeight;
let pipes2BottomRandomHeight;

let baseX = 0;

let birdAlive = true;

let myBottom;
let myLeft;
let myRight;
let myTop;

let bottomPipe1Left;
let bottomPipe1Right;
let bottomPipe1Top;
let bottomPipe1Bottom;

let topPipe1Left;
let topPipe1Right;
let topPipe1Top;
let topPipe1Bottom;

let bottomPipe2Left;
let bottomPipe2Right;
let bottomPipe2Top;
let bottomPipe2Bottom;

let topPipe2Left;
let topPipe2Right;
let topPipe2Top;
let topPipe2Bottom;

let state = "game";
let keyPressedNum = 0;
let drawnNumber = 0;
function preload(){
    backgroundImage = loadImage("images/bg.png")
    bird = loadImage("images/bird.png");
    pipesTop1 = loadImage("images/pipedown.png");
    pipesBottom1 = loadImage("images/pipe.png");
    pipesTop2 = loadImage("images/pipedown.png");
    pipesBottom2 = loadImage("images/pipe.png");
    base = loadImage("images/base.png");
}

function setup(){
    rectMode(CENTER);
    imageMode(CENTER);
    createCanvas(500, 800)
    background(0);
    image(backgroundImage, 250, 400, 500, 800);
    pipeTop1_Y = pipes1TopRandomHeight;
    pipeBottom1_Y = pipes1BottomRandomHeight;
    pipeTop2_Y = pipes2TopRandomHeight;
    pipeBottom2_Y = pipes2BottomRandomHeight;
}

function draw(){
    state = "game"
    if(state==="game"){
    image(backgroundImage, 250, 400, 500, 800);  
    image(base, baseX, 750, 700, 100);

    image(pipesBottom1, pipes1_X, pipes1BottomRandomHeight, 50, 300);
    image(pipesTop1, pipes1_X,   pipes1TopRandomHeight, 50, 300);

    image(pipesTop2, pipes2_X, pipes2TopRandomHeight, 50, 300);
    image(pipesBottom2, pipes2_X, pipes2BottomRandomHeight, 50, 300);
    
    image(bird, birdXPos, birdYPos, 50, 50);
    image(base, baseX, 750, 700, 100);

    fill(0);
    text(22);
    textSize(30);
    text("Score: " + score, 20, 50);   

    baseX -= 5;
    pipes1_X-=5;
    pipes2_X -=5;

    //make pipes reappear on the other side of the screen and makes the pipes set to a random height
    if(pipes1_X<=-25){
        pipes1_X = 525;
        pipes1TopRandomHeight = random(0,125);
        pipes1BottomRandomHeight = random(550, 675);
        pipeTop1_Y = pipes1TopRandomHeight;
        pipeBottom1_Y = pipes1BottomRandomHeight;
    }
    if(pipes2_X<=-25){
        pipes2_X = 525;
        pipes2TopRandomHeight = random(0,125);
        pipes2BottomRandomHeight = random(550, 675);
        pipeTop2_Y = pipes2TopRandomHeight;
        pipeBottom2_Y = pipes2BottomRandomHeight;
    }

    //collision detection


    if (baseX <= 250){
        baseX = 350;
    }
    if(keyIsDown(32) == true){
        keyPressedNum++;
        if (birdYPos <= 25){
            birdYPos = 25;
        }
        else{
            birdYPos -=15;
        }
    }
    else {
        if (birdYPos >= 675){
            birdYPos = 675;
            birdAlive = false;
        }
        else{
            birdYPos +=5;
        }
    }

    //collision detection
    myLeft = birdXPos - 25;
    myRight = birdXPos + 25;
    myTop = birdYPos - 25;
    myBottom = birdYPos + 25;
    //pipe1 bottom
    bottomPipe1Left = pipes1_X - 25;
    bottomPipe1Right = pipes1_X + 25;
    bottomPipe1Top = pipeBottom1_Y - 150;
    bottomPipe1Bottom = pipeBottom1_Y + 150;
    //pipe1 top
    topPipe1Left = pipes1_X - 25;
    topPipe1Right = pipes1_X + 25;
    topPipe1Top = pipeTop1_Y - 150;
    topPipe1Bottom = pipeTop1_Y + 150;
    //pipe 2 bottom
    bottomPipe2Left = pipes2_X - 25;
    bottomPipe2Right = pipes2_X + 25;
    bottomPipe2Top = pipeBottom2_Y - 150;
    bottomPipe2Bottom = pipeBottom2_Y + 150;
    //pipe1 top
    topPipe2Left = pipes2_X - 25;
    topPipe2Right = pipes2_X + 25;
    topPipe2Top = pipeTop2_Y - 150;
    topPipe2Bottom = pipeTop2_Y + 150;

    console.log(`Bird: Left=${myLeft}, Right=${myRight}, Top=${myTop}, Bottom=${myBottom}`);
        console.log(`Pipe1 Bottom: Left=${bottomPipe1Left}, Right=${bottomPipe1Right}, Top=${bottomPipe1Top}, Bottom=${bottomPipe1Bottom}`);
        console.log(`Pipe1 Top: Left=${topPipe1Left}, Right=${topPipe1Right}, Top=${topPipe1Top}, Bottom=${topPipe1Bottom}`);
        console.log(`Pipe2 Bottom: Left=${bottomPipe2Left}, Right=${bottomPipe2Right}, Top=${bottomPipe2Top}, Bottom=${bottomPipe2Bottom}`);
        console.log(`Pipe2 Top: Left=${topPipe2Left}, Right=${topPipe2Right}, Top=${topPipe2Top}, Bottom=${topPipe2Bottom}`);



    //code based of off collision theory lesson and state lesson
    if(((myRight > bottomPipe1Left && myLeft < bottomPipe1Right && myBottom > bottomPipe1Top && myTop < bottomPipe1Bottom ||
    myRight > topPipe1Left && myLeft < topPipe1Right && myBottom > topPipe1Top && myTop < topPipe1Bottom) ||
    (myRight > bottomPipe2Left && myLeft < bottomPipe2Right && myBottom > bottomPipe2Top && myTop < bottomPipe2Bottom ||
    myRight > topPipe2Left && myLeft < topPipe2Right && myBottom > topPipe2Top && myTop < topPipe2Bottom))&& keyPressedNum>1){
            birdAlive = false;
        }else{
            if((birdXPos==pipes1_X||birdXPos==pipes2_X)&&drawnNumber>=100){
                score++;
                fill(0);
                text(22);
                textSize(30);
                text("Score: " + score, 20, 50);  
            }  
        }

        if(birdAlive==false){
            state = "gameOver";
            if(state = "gameOver"){
                background(255, 0, 0);
                fill(0);
                text(22);
                textSize(50);
                text("Game Over", 125, 400);
                fill(255);
                rect(250, 450, 100, 50);
                textSize(20);
                fill(0);
                text("Try Again", 207, 455);
            }
        }
    }
        drawnNumber++;
    }

    function mouseClicked(){
        if(mouseX>=200 && mouseX<=300 && mouseY>=425 && mouseY<=475 && state=="gameOver"){
            tryAgain();
        }
    }
    

function tryAgain(){
    score = 0;
    birdXPos = 100;
    birdYPos = 250;
    pipes1_X = 200+500;
    pipes2_X = 475+500;
    baseX = 0;
    birdAlive = true;
    keyPressedNum = 0;
    drawnNumber = 0;
    state = "game";
}