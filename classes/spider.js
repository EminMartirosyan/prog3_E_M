class Spider{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 19;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character1, character2, character3) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    eat(){
        let found = this.chooseCell(1)
        let exact = random(found)
        if(exact){
            this.energy += 2
            let x = exact[0]
            let y = exact[1]
            for (var i  = 0;i  < grassArr.length; i++) {
                if(x == grassArr[i].x && y == grassArr[i].y){
                    grassArr.splice(i, 1)
                    break
                }
                
            }
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy > 33){
                this.mul();
                this.move_sl()
                this.eat_sl()
            }
        
        }
        else{
            this.move()
        }
    }
    eat_sl(){
        let found = this.chooseCell(1,2,7)
        let exact = random(found)
        if(exact){
            this.energy += 2
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
             else if(matrix[y][x] == 7 ){
                    this.energy -= 10
                }
            
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy > 33){
                this.mul();
                this.move_sl()
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
            this.energy -= 2
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy < 0){
                this.die();
            }
        
        }

    }
    move_sl(){
        let found = this.chooseCell(0)
        let exact = random(found)
        if(exact){
            this.energy -= 2
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 5
            this.x = x
            this.y = y
            if(this.energy < 0){
                this.die();
            }
        
        }

    }
    mul() {
        let found = this.chooseCell(0)
        let exact = random(found)
        if (exact && this.energy > 27 ) {
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] == 4       
            let allEater = new Spider(x, y)
            spiderArr.push(allEater)
            
        }
    }
    die(){
        for(var i = 0; i < spiderArr.length; i++){
            if(this.x == spiderArr[i].x && this.y == spiderArr[i].y){
                spiderArr.splice(i, 1)

            }
        }
        matrix[this.y][this.x] = 0
    }
}