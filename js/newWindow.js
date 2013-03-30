/**
 * @description Pop up a new fixed-size window to play the game in
 * @author Benjamin Dicken (bddicken@gmail.com)
 */
window.onload = init;
function init(){
    var leftLoc = (screen.width/2)-(600/2);
    var topLoc = (screen.height/2)-(400/2);
    window.open (   "game/",
                    "mywindow",
                    "menubar=1,resizable=1,width=600,height=400 top="+topLoc+", left="+leftLoc);
}

