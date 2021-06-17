let Main = require('./main')
module.exports = class AllEater extends Main{
    constructor(x, y) {
        super(x,y)
        this.energy = 21;
       

    }
   
    chooseCell(character1, character2, character3, character4, character5) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4 || matrix[y][x] == character5) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    eat(){
        let found = this.chooseCell(1, 2, 4, 5, 7)
        let exact = random(found)
        if(exact){
            this.energy += 4
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
            else if(matrix[y][x] == 2 ){
                for (var i  = 0;i  < grassEaterArr.length; i++) {
                    if(x == grassEaterArr[i].x && y == grassEaterArr[i].y){
                        grassEaterArr.splice(i, 1)
                        break
                    }
                    
                }
            }
            else if(matrix[y][x] == 4){
                for (var i  = 0;i  < spiderArr.length; i++) {
                    if(x == spiderArr[i].x && y == spiderArr[i].y){
                        spiderArr.splice(i, 1)
                        break
                    }
                    
                }
            }
            else if(matrix[y][x] == 4){
                this.die()
            }
             else if(matrix[y][x] == 7 ){
                    this.energy -= 15
                }
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy > 40){
                this.mul();
            }
        
        }
        else{
            this.move()
        }
    }
    mul() {
        let found = this.chooseCell(0)
        let exact = random(found)
        if (exact && this.energy > 16 ) {
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] == 3       
            let allEater = new AllEater(x, y)
            allEaterArr.push(allEater)
            this.energy = 25
        }
    }
    move(){
        let found = this.chooseCell(0)
        let exact = random(found)
        if(exact){
            this.energy -= 10
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 3
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
        for(var i = 0; i < allEaterArr.length; i++){
            if(this.x == allEaterArr[i].x && this.y == allEaterArr[i].y){
                allEaterArr.splice(i, 1)

            }
        }
        matrix[this.y][this.x] = 0
    }
}