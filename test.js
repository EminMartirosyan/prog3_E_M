
function a(m, n) {
    var arr = [];
    for (var i = 0; i < m; i++) {
        arr[i] = [];
        for (var j = 0; j < n; j++) {
            arr[i][j] = Math.floor(Math.random() * 2);
        }
    }
    arr[m-2][n-4] = 2
    arr[m-12][n-23] = 3
    arr[m-38][n-27] = 2
    arr[m-5][n-35] = 4
    arr[m-10][n-10] = 6
    arr[m-35][n-5] = 4
    arr[m-22][n-2] = 4
    arr[m-30][n-30] = 6
    return arr
}
 var matrix = a(40,40)
//     [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
//     [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//     [1, 2, 0, 0, 0, 0, 0, 1, 0, 3, 1],
//     [0, 1, 0, 0, 0, 0, 1, 3, 0, 0, 0]
// ];


var side = 20;
var grassArr = []
var grassEaterArr = [];
var allEaterArr = [];
var spiderArr = []
var poisonArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var great = new GrassEater(x, y)
                grassEaterArr.push(great)
            }
            else if (matrix[y][x] == 3) {
                var all_eater = new AllEater(x, y)
                allEaterArr.push(all_eater)
            }
            else if (matrix[y][x] == 4) {
                var spider = new Spider(x, y)
                spiderArr.push(spider)
            }
            else if (matrix[y][x] == 6) {
                var poisoner = new Poisoner(x, y)
                poisonArr.push(poisoner)
            }
            

        }

    }


}
function draw() {
frameRate(4)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
             else if (matrix[y][x] == 6) {
                fill("deepskyblue");
            }
             else if (matrix[y][x] == 7) {
                fill("purple");
            }

            rect(x * side, y * side, side, side);


            fill("white")


        }
    }
    for (let i in grassArr) {
        grassArr[i].mul()

    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }
    for (let i in allEaterArr) {
        allEaterArr[i].eat()

    }
    for (let i in spiderArr) {
        spiderArr[i].eat()

    }
    for (let i in poisonArr) {
        poisonArr[i].collect()

    }
}
