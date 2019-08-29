class pacman {

    constructor(cxt,x,y,radius,speed){

        this.this.cxt = cxt;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;

        this.currentDirection = 'right';
        this.faceAngles = {
            'up' : {
                startAngle : 1.65 * Math.PI,
                endAngle : 1.35 * Math.PI
            },
            down : {
                startAngle : 0.65 * Math.PI,
                endAngle : 0.35 * Math.PI
            },
            'right' : {
                startAngle : 0.15 * Math.PI,
                endAngle : 1.85 * Math.PI
            },
            left : {
                startAngle : 1.15 * Math.PI,
                endAngle : 0.85 * Math.PI
            }
        }
    }

    createPacman(direction,cordinate_x,cordinate_y){

        this.currentDirection = direction;

        let startAngle=this.faceAngles[direction].startAngle;
        let endAngle=this.faceAngles[direction].endAngle;

        console.log(startAngle,endAngle, cordinate_x, cordinate_y)

        this.cxt.fillStyle = '#00ff6a';
        this.cxt.beginPath();
        this.cxt.arc(cordinate_x,cordinate_y,this.radius,startAngle,endAngle)
        this.cxt.lineTo(cordinate_x,cordinate_y);
        this.cxt.stroke();
        this.cxt.closePath();
        this.cxt.fill();

        return this;

    }

    deletePacman(cxt,cordinate_x,cordinate_y){

        this.cxt.fillStyle = '#ffffff';
        this.cxt.strokeStyle = '#ffffff';

        this.cxt.beginPath();
        this.cxt.arc(cordinate_x,cordinate_y,this.radius,0,2 * Math.PI)
        this.cxt.stroke();
        this.cxt.closePath();
        this.cxt.fill();
    }

}
