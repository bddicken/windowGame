/* WTF should I do when the window loads??? Here is your answer. */
window.onload = init;

var mainPlayer;
var enemies = new Array();
var gameState = 0;
var c;
var ctx;
var animationHasStarted = false;

/* Keep track of the window dimention */
var winSize = [600,400];

function init() {
    $("body").css("overflow", "hidden");
    mainPlayer = new Player(    
            ((screen.width/2) - window.screenX),
            ((screen.height/2) - window.screenY),
            32,
            "#FF0000");

    c=document.getElementById("myCanvas");
    ctx=c.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    var w = $(window).width(),
        h = $(window).height();
    c.width = w; c.height = h;
    ctx.font="26px Arial";
    ctx.clearRect (0,0,winSize[0],winSize[1]);

    ctx.fillStyle="#618494";
    ctx.fillRect(   
            ((screen.width/2) - window.screenX),
            ((screen.height/2) - window.screenY),
            32,
            32);
    enemies[1]=new Enemy(0, 0, 16, "#00ff00");
    enemies[2]=new Enemy(0, 0, 32, "#000000");
    enemies[3]=new Enemy(0, 0, 64, "#0Fa0fa");
    
    if(!animationHasStarted) {
        animationHasStarted = true;
        setInterval(animationLoop,20);
    }
}

function playerHasBeenHit() {
    for(var i=1; i < enemies.length; i++) {
        if( pis(enemies[i].x, 
                enemies[i].y, 
                mainPlayer))
            return true;
        else if( pis(enemies[i].x+enemies[i].dimention, 
                enemies[i].y, 
                mainPlayer))
            return true;
        else if( pis(enemies[i].x+enemies[i].dimention, 
                enemies[i].y+enemies[i].dimention, 
                mainPlayer))
            return true;
        else if( pis(enemies[i].x, 
                enemies[i].y+enemies[i].dimention, 
                mainPlayer)) 
            return true
    }
    return false;
}

var pis = function pointInSquare(x, y, en) {
    if(en.x < x && x < en.x+en.dimention) {
        if(en.y < y && y < en.y+en.dimention)
            return true;
    }
    return false;
}

function animationLoop() {
    // Main menu
    if(gameState == 0) {
        ctx.clearRect (0,0,winSize[0],winSize[1]);
        makeTagVisible("button-start");
        makeTagVisible("button-htp");
        makeTagInvisible("button-replay");
        makeTagInvisible("button-menu");
    }
    // Playing the game
    else if(gameState == 1) {
        makeTagInvisible("button-start");
        makeTagInvisible("button-htp");
        makeTagInvisible("button-replay");
        makeTagInvisible("button-menu");
        
        mainPlayer.animate(ctx);
        enemies[1].animate(ctx);
        enemies[2].animate(ctx);
        enemies[3].animate(ctx);
        
        // Pass the baton to gameState == 2
        if(playerHasBeenHit()) {
            ctx.fillStyle="#000000";
            ctx.fillText("You Lose!", 50, 50);
            gameState = 2;
        } 
    }
    // Lost the game
    else if(gameState == 2) {
        makeTagVisible("button-replay");
        makeTagVisible("button-menu");
    }
}

function makeTagVisible(tagName) {
    document.getElementById(tagName).style.display = "inline";
}

function makeTagInvisible(tagName) {
    document.getElementById(tagName).style.display = "none";
}

function toggleVisible(v) {
    if(v.style.display.indexOf("none") != -1) {
        v.style.display = "inline";
    }
    else {
        v.style.display = "none";
    }
}

$(window).resize(function(){
    window.resizeTo(winSize[0],winSize[1]);
});

