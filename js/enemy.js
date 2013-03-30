/**
 * @description Represents an enemy in the game.
 * @author Benjamin Dicken (bddicken@gmail.com)
 */
function Enemy(startX, startY, dimention, color)
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
    
    /* Determine if moving to new position has completed */
    function isDoneMoving() {
        return (this.x==this.xNew && this.y==this.yNew);
    }

    /* Used to call isDoneMoving() */
    this.isDM=isDoneMoving;

    /* Re-animate enemy */
    function doAnimate(ctx) {
        ctx.clearRect (this.x-1,this.y-1,dimention+2,dimention+2);
        if( Math.abs(this.yNew-this.y) < 1 || 
            Math.abs(this.xNew-this.x) < 1 ) {
            this.xNew = (Math.random()*600)-(dimention/2);
            this.yNew = (Math.random()*400)-(dimention/2);
        }
        var yIncrement = 0;
        var xIncrement = 0;

        if(this.yNew<this.y)
            yIncrement=Math.max(-1,this.yNew-this.y);
        else 
            var yIncrement = Math.min(1,this.yNew-this.y);
        if(this.xNew<this.x)
            xIncrement=Math.max(-1,this.xNew-this.x);
        else
            var xIncrement=Math.min(1,this.xNew-this.x);
        
        this.x+=xIncrement;
        this.y+=yIncrement;

        ctx.fillStyle=color;
        ctx.fillRect(this.x,this.y,dimention,dimention);
    }

    this.animate=doAnimate;
}

