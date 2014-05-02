/**
 * @description Represents an player in the game.
 * @author Benjamin Dicken (bddicken@gmail.com)
 */
function Player(startX, startY, dimention, color)
{
    /* The x coordinate of enemy */
    this.x=startX;
    
    /* The y coordinate of enemy */
    this.y=startY;

    /* The color of The enemy */
    this.color=color;

    /* The new x destination */
    this.xNew=10;

    /* The new y destination */
    this.yNew=10;
    
    /* total width/height */
    this.dimention=dimention;

    /* first rount of animation */
    this.firstAnimation=true;

    /* Re-animate player */
    function doAnimate(ctx) {
        ctx.clearRect (this.x-1,this.y-1,dimention+2,dimention+2);
        this.xNew = ((screen.width/2) - window.screenX);
        this.xNew = Math.max(0, this.xNew);
        this.xNew = Math.min(600-dimention, this.xNew);
        this.yNew = ((screen.height/2) - window.screenY);
        this.yNew = Math.max(0, this.yNew);
        this.yNew = Math.min(400-dimention, this.yNew);
        var yIncrement = 0;
        var xIncrement = 0;

        if(this.firstAnimation == true) {
            this.x = this.xNew;
            this.y = this.yNew;
            this.firstAnimation = false;
        }

        if(this.yNew<this.y)
            yIncrement=Math.max(-8,this.yNew-this.y);
        else 
            var yIncrement = Math.min(8,this.yNew-this.y);
        if(this.xNew<this.x)
            xIncrement=Math.max(-8,this.xNew-this.x);
        else
            var xIncrement=Math.min(8,this.xNew-this.x);
        
        this.x+=xIncrement;
        this.y+=yIncrement;

        ctx.fillStyle=color;
        ctx.fillRect(this.x,this.y,dimention,dimention);
    }

    this.animate=doAnimate;
}

