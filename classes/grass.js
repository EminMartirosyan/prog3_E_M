let Main = require('./main')
module.exports =class Grass extends Main {
    constructor(x, y) {
        super(x,y)
        this.multiplay = 0;
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

}