class GrassEater extends Main{
   
    constructor(x, y) {
        super(x,y)
        this.energy = 20;
    }
    
    chooseCell(character, character2,character3) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    mul() {
        let found = this.chooseCell(0)
        let exact = random(found)
        if (exact && this.energy > 12) {
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] == 2
            let eater = new GrassEater(x, y)
            grassEaterArr.push(eater)
            this.energy = 20
        }
    }
    eat(){
        let found = this.chooseCell(1,5,7)
        let exact = random(found)
        if(exact){
            this.energy += 6
            let x = exact[0]
            let y = exact[1]
            if(matrix[y][x] == 1){
            for (var i  = 0;i  < grassArr.length; i++) {
                if(x == grassArr[i].x && y == grassArr[i].y){
                    grassArr.splice(i, 1)
                    break
                }
                
            }
        }
        else if(matrix[y][x] == 5){
          this.energy -= 5
        }
         else if(matrix[y][x] == 7 ){
                    this.die()
                }
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy > 30){
                this.mul();
            }
        
        }
        else{
            this.move()
        }
    }
    move(){
        let found = this.chooseCell(0)
        let exact = random(found)
        if(exact){
            this.energy -= 5
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy < 0){
                this.die();
            }
        
        }
        else{
            this.energy--
            if(this.energy < 0){
                this.die()
            }
        }
    }
    die(){
        for(var i = 0; i < grassEaterArr.length; i++){
            if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
                grassEaterArr.splice(i, 1)

            }
        }
        matrix[this.y][this.x] = 0
    }
}
