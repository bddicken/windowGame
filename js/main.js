/* WTF should I do when the window loads??? Here is your answer. */
window.onload = init;

Enemy.prototype  = new Unit(0, 0, 32, "#0ff800");
Player.prototype = new Unit(0, 0, 32, "#0ff800");
var mainPlayer = new Player(    ((screen.width/2) - window.screenX),
                                ((screen.height/2) - window.screenY),
                                32,
                                "#FF0000");
var enemies = new Array();
var gameState = 0;
var c;
var ctx;
var animationHasStarted = false;

/* Keep track of the window dimention */
var winSize = [600,400];

function init() {
    //window.resizeTo(winSize[0],winSize[1]);
    $("body").css("overflow", "hidden");

    c=document.getElementById("myCanvas");
    ctx=c.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    var w = $(window).width(),
        h = $(window).height();
    c.width = w; c.height = h;
    ctx.font="24px Georgia";
    ctx.clearRect (0,0,winSize[0],winSize[1]);

    ctx.fillStyle="#FF0000";
    ctx.fillRect(   ((screen.width/2) - window.screenX),
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
        var rpl = document.getElementById("button-replay");
        rpl.style.display = "none";
        rpl = document.getElementById("button-start");
        rpl.style.display = "inline";
        rpl = document.getElementById("button-menu");
        rpl.style.display = "none";
        rpl = document.getElementById("button-htp");
        rpl.style.display = "inline";
    }
    // Playing the game
    else if(gameState == 1) {
        var rpl = document.getElementById("button-replay");
        rpl.style.display = "none";
        var mm = document.getElementById("button-menu");
        mm.style.display = "none";
        rpl = document.getElementById("button-htp");
        rpl.style.display = "none";
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
        var rpl = document.getElementById("button-replay");
        rpl.style.display = "inline";
        rpl = document.getElementById("button-start");
        rpl.style.display = "none";
        rpl = document.getElementById("button-menu");
        rpl.style.display = "inline";
        rpl = document.getElementById("button-htp");
        rpl.style.display = "none";
    }
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

