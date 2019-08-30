class playArea {

    constructor (canvas_id) {

        this.col_count = 21;
        this.row_count = 21;
        this.canvas_id = canvas_id;
        this.setPlayAreaContext().setUnitLength(canvas_id);

        this.layout = [[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0],
              [0,-1,1,1,1,1,1,1,1,1,-1,1,1,1,1,1,1,1,1,-1,0],
              [0,-1,1,-1,-1,1,-1,-1,-1,1,-1,1,-1,-1,-1,1,-1,-1,1,-1,0],
              [0,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,0],
              [0,-1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,-1,0],
              [0,-1,1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1,1,1,-1,0],
              [0,-1,-1,-1,-1,1,-1,-1,-1,0,-1,0,-1,-1,-1,1,-1,-1,-1,-1,0],
              [0,0,0,0,-1,1,-1,0,0,0,0,0,0,0,-1,1,-1,0,0,0,0],
              [-1,-1,-1,-1,-1,1,-1,0,-1,-1,-1,-1,-1,0,-1,1,-1,-1,-1,-1,-1],
              [0,0,0,0,0,1,0,0,-1,0,0,0,-1,0,0,1,0,0,0,0,0],
              [-1,-1,-1,-1,-1,1,-1,0,-1,-1,-1,-1,-1,0,-1,1,-1,-1,-1,-1,-1],
              [0,0,0,0,-1,1,-1,0,0,0,0,0,0,0,-1,1,-1,0,0,0,0],
              [0,-1,-1,-1,-1,1,-1,0,-1,-1,-1,-1,-1,0,-1,1,-1,-1,-1,-1,0],
              [0,-1,1,1,1,1,1,1,1,1,-1,1,1,1,1,1,1,1,1,-1,0],
              [0,-1,1,-1,-1,1,-1,-1,-1,1,-1,1,-1,-1,-1,1,-1,-1,1,-1,0],
              [0,-1,1,1,-1,1,1,1,1,1,1,1,1,1,1,1,-1,1,1,-1,0],
              [0,-1,-1,1,-1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,-1,1,-1,-1,0],
              [0,-1,1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1,1,1,-1,0],
              [0,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,0],
              [0,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,0],
              [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0]]

    }

    setPlayAreaContext(){
        var canvas = document.getElementById(this.canvas_id);
        this.cxt = canvas.getContext("2d");
        return this;
    }

    setUnitLength(){
        var canvas = document.getElementById(this.canvas_id);
        this.unitLength = Math.round(canvas.width/this.col_count);
        return this;
    }


    buildLayout(){

        this.cxt.fillStyle = 'rgb(0,0,0)';

        this.layout.forEach(function(row,row_index){
            row.forEach(function(cellValue,col_index){

                let x = col_index * this.unitLength;
                let y = row_index * this.unitLength;

                if(cellValue===-1){
                  this.cxt.strokeRect(x,y,this.unitLength,this.unitLength,false);
                  this.cxt.fillRect(x,y,this.unitLength,this.unitLength,false);
                }else if(cellValue === 1){
                  let x_circle = x + this.unitLength/2;
                  let y_circle = y + this.unitLength/2;
                  this.cxt.beginPath();
                  this.cxt.arc(x_circle,y_circle,this.unitLength/8,0,2* Math.PI)
                  this.cxt.stroke();
                  this.cxt.fill();
                  this.cxt.closePath();
                }
            }.bind(this))
        }.bind(this))

        return this;
    }

    initialisePacman(){

        let pacman_x = Math.floor(this.col_count/2);
        let pacman_y = this.row_count - 2;

        this.pacman = new pacman(this.cxt, pacman_x, pacman_y, this.unitLength*0.4, 0.5);
        this.pacman.createPacman('right', this.unitLength);

        return this;
    }

    navigate(direction) {

        if(!this.isNavigatable(direction))
            return this;

        this.pacman.deletePacman(this.unitLength);

        if(direction.toLowerCase()=='up'){
            this.pacman.y -= this.pacman.speed;
        }
        if(direction.toLowerCase()=='down'){
            this.pacman.y += this.pacman.speed;
        }
        if(direction.toLowerCase()=='right'){
            if (this.pacman.x == this.col_count-1)
                this.pacman.x = 0;
            else
                this.pacman.x += this.pacman.speed;
        }
        if(direction.toLowerCase()=='left'){
            if (this.pacman.x == 0)
                this.pacman.x = this.col_count-1;
            else
                this.pacman.x -= this.pacman.speed;
        }

        this.pacman.createPacman(direction,this.unitLength);

    }

    isNavigatable(direction) {

        let new_x = this.pacman.x;
        let new_y = this.pacman.y;

        if(direction.toLowerCase()=='up'){
            if (!Number.isInteger(new_x))
                return false
            new_y = Math.ceil(new_y-1);
        }
        else if(direction.toLowerCase()=='down'){
            if (!Number.isInteger(new_x))
                return false
            new_y = Math.floor(new_y+1);
        }
        else if(direction.toLowerCase()=='right'){
            if (!Number.isInteger(new_y))
                return false
            if (new_x == this.col_count-1)
                new_x = 0;
            else
                new_x = Math.floor(new_x+1);
        }
        else if(direction.toLowerCase()=='left'){
            if (!Number.isInteger(new_y))
                return false
            if (new_x == 0)
                new_x = this.col_count-1;
            else
                new_x = Math.ceil(new_x-1);
        }

        return this.layout[new_y][new_x]>=0
    }
}
