var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
var colors = {
    background: color(148, 148, 247),
    body: color(198, 49, 49),
    darkPurple: color(99, 0, 49),
    lightPurple: color(148, 0, 49),
    black: color(0, 0, 0),
    white: color(247, 247, 247),
    collar: color(99, 49, 148),
    button: color(247, 148, 47)
};

var Dog = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.eye_offset = 0;
    this.vx = config.vx || 4.5;
    
    this.timer = 0;
    this.timerDelay = 20;
    this.cos = 0;
    this.sin = 0;
    this.cos2 = 0;
    this.sin2 = 0;
    this.speed = 2;
    this.legLeft = {
        x: 0,
        y: 0,
        x1: 0,
        x2: 0
    };
    this.legRight = {
        x: 0,
        y: 0,
        x1: 0,
        x2: 0
    };
    this.blink = false;
    this.blinkTimer = 0;

    this.update = function() {
        this.x-= this.vx;
        
        if(this.x < 250) {
            this.eye_offset = lerp(this.eye_offset, 9, 0.15);
        }
        
        if(this.x < -400) {
            this.x = 750;
            this.eye_offset = 0;
            this.blink = false;
            this.blinkTimer = 0;
        }
        
        this.timer++;
        this.cos = cos(radians(this.timer * this.speed * 5)) * 15;
        this.cos2 = cos(radians((this.timer + this.timerDelay) * this.speed * 5)) * 15;
        this.sin = sin(radians(this.timer * this.speed * 5)) * 35;
        this.sin2 = sin(radians((this.timer + this.timerDelay) * this.speed * 5)) * 35;
        
        this.legLeft.x = this.cos * 1.75;
        this.legLeft.x1 = map(this.legLeft.x, -15, 15, 0, 18);
        this.legLeft.x2 = map(this.legLeft.x, -15, 15, -10, 18);
        
        this.legRight.x = this.cos2 * 1.75;
        this.legRight.x1 = map(this.legRight.x, -15, 15, 0, 18);
        this.legRight.x2 = map(this.legRight.x, -15, 15, -10, 18);
        
        if(this.sin > 0) { //leg on the ground
            this.legLeft.y = 0;
        }
        else { //lift the leg
            this.legLeft.y = abs(this.sin);
        }
        
        if(this.sin2 > 0) { //leg on the ground
            this.legRight.y = 0;
        }
        else { //lift the leg
            this.legRight.y = abs(this.sin2);
        }
    };
    this.draw = function() {
        noStroke();
        
        //shadow
        fill(40, 30);
        ellipse(this.x + 125, this.y + 210, 500, 10 + sin(radians(this.timer * this.vx * 4.5)) * 2);
        
        pushStyle();
            noFill();
            stroke(colors.lightPurple);
            strokeWeight(18);

            //left front leg
            bezier( this.x + 125, 420, 
                this.x + 125 - this.legRight.x1, 450 - this.legRight.y, 
                this.x + 125 - this.legRight.x2, 485 - this.legRight.y, 
                this.x + 125 - this.legRight.x, 500 - this.legRight.y);
            //left back leg
            bezier( this.x + 320, 420, 
                this.x + 320 - this.legLeft.x1, 450 - this.legLeft.y, 
                this.x + 320 - this.legLeft.x2, 485 - this.legLeft.y, 
                this.x + 320 - this.legLeft.x, 500 - this.legLeft.y);
        popStyle();
        
        pushMatrix();
            translate(this.x, this.y + sin(radians(frameCount * this.vx * 4.5)) * 7);
            
            //behind body
            //buttons on collar
            fill(colors.button);
            ellipse(95, 0, 15, 15);
            ellipse(95, 140, 15, 15);
            
            //ear (behind)
            fill(colors.darkPurple);
            rect(-28, 45, 50, 140 + sin(radians(frameCount * this.vx * 4.5)) * 7, 100);
            
            //tail
            pushStyle();
                noFill();
                stroke(colors.darkPurple);
                strokeWeight(40);
                arc(315, -30, 100, 100, 0, radians(80));
            popStyle();
            
            //body
            fill(colors.body);
            rect(0, 0, 320, 140);
            arc(1, 70, 120, 140, radians(91), radians(270));
            arc(319, 70, 120, 140, radians(271), radians(450));
            //nose
            rect(-110, 40, 110, 100);
            fill(colors.black);
            ellipse(-110, 90, 100, 100);
            //eyes
            fill(colors.white);
            ellipse(0, 40, 30, 30);
            ellipse(-22, 40, 30, 30);
            fill(colors.black);
            ellipse(-3 + this.eye_offset, 40, 15, 15);
            ellipse(-25 + this.eye_offset, 40, 15, 15);
            
            //blinking
            if(this.x > 200 && this.x < 250) {
                this.blinkTimer++;
                fill(colors.body);
                rect(-38, 20, 55, 5 + abs(sin(radians(this.blinkTimer * 10)) * 15));
                rect(-38, 50 - abs(sin(radians(this.blinkTimer * 10)) * 15), 55, 5 + abs(sin(radians(this.blinkTimer * 10)) * 15));
            }
            
            //mouth
            fill(colors.black);
            ellipse(-11, 100, 12, 12);
            //ear (front)
            fill(colors.lightPurple);
            rect(25, 45, 50, 140 + sin(radians(frameCount * this.vx * 4.5)) * 7, 100);
            //collar
            fill(colors.collar);
            rect(75, 0, 40, 140);
            fill(colors.button);
            ellipse(95, 30, 15, 15);
            ellipse(95, 70, 15, 15);
            ellipse(95, 110, 15, 15);
            //spots
            fill(colors.darkPurple);
            arc(220, 0, 100, 90, 0, radians(180));
            ellipse(275, 60, 45, 45);
        popMatrix();
        
        pushStyle();
            noFill();
            stroke(colors.body);
            strokeWeight(18);
            
            //right front leg
            bezier( this.x + 125, 420, 
                this.x + 125 - this.legLeft.x1, 450 - this.legLeft.y, 
                this.x + 125 - this.legLeft.x2, 485 - this.legLeft.y, 
                this.x + 125 - this.legLeft.x, 500 - this.legLeft.y);
            //right back leg
            bezier( this.x + 320, 420, 
                this.x + 320 - this.legRight.x1, 450 - this.legRight.y, 
                this.x + 320 - this.legRight.x2, 485 - this.legRight.y, 
                this.x + 320 - this.legRight.x, 500 - this.legRight.y);
        popStyle();
    };
    this.run = function() {
        this.draw();
        this.update();
    };
};

var dog = new Dog({
    x: 190,
    y: 300
});

var dog2 = new Dog({
    x: 770,
    y: 300
});

draw = function() {
    background(148, 148, 247);
    
    pushMatrix();
        scale(width / 600);
    
        fill(204, 202, 202);
        rect(0, 490, 600, 200);
        
        dog.run();
        dog2.run();
    
    popMatrix();
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);