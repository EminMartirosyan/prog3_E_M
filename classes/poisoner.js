let Main = require('./main')
module.exports =class Poisoner extends Main{
    constructor(x, y) {
        super(x,y)
        this.energy = 20;
        this.kef = 0
       

    }
    
    chooseCell(character1, character2, character3, character4) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    collect(){
        let found = this.chooseCell(1, 2, 4, 5)
        let exact = found[Math.floor(Math.random() * found.length)]
        if(exact){
            let x = exact[0]
            let y = exact[1]
            if(matrix[y][x] == 1){
                this.energy += 5
            }
            else if(matrix[y][x] == 1){
                this.move()
            }
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy > 35){
                this.poison();
            }
        
        }
        else{
            this.move()
        }
    }
    poison() {
        let found = this.chooseCell(1)
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact ) {
            let x = exact[0]
            let y = exact[1]
            if(matrix[y][x] == 1){
                matrix[y][x] = 7
            }
            matrix[y][x] == 6       
            this.energy = 20
        }
    }
    move(){
        let found = this.chooseCell(0)
        let exact = found[Math.floor(Math.random() * found.length)]
        if(exact){
            this.energy -= 2
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy < 0){
                this.sleep();
            }
        
        }
        else{
            this.energy--
            if(this.energy < 0){
                this.sleep()
            }
        }
    }
    move_sk(){
        let found = this.chooseCell(0)
        let exact = found[Math.floor(Math.random() * found.length)]
        if(exact){
            this.energy -= 2
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            if(this.energy < 0){
                this.sleep();
            }
        
        }
        else{
            this.energy--
            if(this.energy < 0){
                this.sleep()
            }
        }
    }
    sleep(){
       this.kef+=1
       if(this.kef >= 3){
            this.poison()
       }
       else{
        this.sleep()
       }
        
    }
}