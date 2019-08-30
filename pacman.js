class pacman {

    constructor(cxt,x,y,radius,speed){

        this.cxt = cxt;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;

        this.currentDirection = 'right';
        this.faceAngles = {
            up : {
                startAngle : 1.65 * Math.PI,
                endAngle : 1.35 * Math.PI
            },
            down : {
                startAngle : 0.65 * Math.PI,
                endAngle : 0.35 * Math.PI
            },
            right : {
                startAngle : 0.15 * Math.PI,
                endAngle : 1.85 * Math.PI
            },
            left : {
                startAngle : 1.15 * Math.PI,
                endAngle : 0.85 * Math.PI
            }
        }
    }

    createPacman(direction,scale){

        this.currentDirection = direction;
        let startAngle=this.faceAngles[direction].startAngle;
        let endAngle=this.faceAngles[direction].endAngle;
        let cordinate_x = (this.x * scale) + scale/2;
        let cordinate_y = (this.y * scale) + scale/2;

        this.cxt.fillStyle = '#00ff6a';
        this.cxt.strokeStyle = '#00ff6a';

        this.cxt.beginPath();
        this.cxt.arc(cordinate_x,cordinate_y,this.radius,startAngle,endAngle)
        this.cxt.lineTo(cordinate_x,cordinate_y);
        this.cxt.stroke();
        this.cxt.closePath();
        this.cxt.fill();

        return this;

    }

    deletePacman(scale){

        let cordinate_x = (this.x * scale) + scale/2;
        let cordinate_y = (this.y * scale) + scale/2;

        this.cxt.fillStyle = '#ffffff';
        this.cxt.strokeStyle = '#ffffff';

        this.cxt.beginPath();
        this.cxt.arc(cordinate_x,cordinate_y,this.radius + 1,0,2 * Math.PI)
        this.cxt.stroke();
        this.cxt.closePath();
        this.cxt.fill();
    }

}
