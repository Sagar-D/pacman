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
        this.unitLength = canvas.width/this.col_count;
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

        let pacman_y = this.row_count - 2;
        let pacman_x = Math.floor(this.col_count/2);
        this.pacman = new pacman(this.cxt, pacman_x, pacman_y, this.unitLength*0.4, 0.5);

        let coordinate_x = (this.pacman.x * this.unitLength) + this.unitLength/2;
        let coordinate_y = (this.pacman.y * this.unitLength) + this.unitLength/2;
        this.pacman.createPacman('right', coordinate_x, coordinate_y)

        return this;
    }


}
