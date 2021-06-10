class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
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
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }

        return found
    }
    mul() {
        this.multiplay++
        let found = this.chooseCell(0)
        let exact = random(found)
        if (exact && this.multiplay > 3) {
            let x = exact[0]
            let y = exact[1]
            let grass1 = new Grass(x, y)
            matrix[y][x] = 1
            grassArr.push(grass1)
            this.multiplay = 0
        }
    }

}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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

class AllEater{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 21;
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
class Poisoner{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.kef = 0
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
        let exact = random(found)
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
        let exact = random(found)
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
        let exact = random(found)
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
        let exact = random(found)
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