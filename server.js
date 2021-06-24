Grass = require("./classes/grass")
GrassEater = require("./classes/grasseater")
Spider = require("./classes/spider")
Poisoner = require("./classes/poisoner")
AllEater = require("./classes/alleater")

 express = require('express')
 app = express()
 server = require('http').createServer(app)
 io = require('socket.io')(server)


app.use(express.static("."))

app.get('/', function (req, res) {
   res.redirect('./test.html')
})

server.listen(3000, ()=> {
    console.log('connected')
    
})
function a(m, n) {
var arr = []
    for (var i = 0; i < m; i++) {
        arr[i] = []
        for (var j = 0; j < n; j++) {
            arr[i][j] = Math.floor(Math.random() * 2)
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
 matrix = a(40,40)
io.sockets.emit('send matrix', matrix)

 grassArr = []
 grassEaterArr = []
 allEaterArr = []
 spiderArr = []
 poisonArr = []





function createObject(matrix){
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
    io.sockets.emit('send matrix', matrix)
}
function game() {
    for (let i in grassArr) {
        grassArr[i].mul(3, Grass, 1, grassArr) 
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
    io.sockets.emit('send matrix', matrix)
}
setInterval(game,1000)
io.on('connection', function (){
    createObject(matrix)
})