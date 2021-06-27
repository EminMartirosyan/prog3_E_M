Grass = require("./classes/grass")
GrassEater = require("./classes/grasseater")
Spider = require("./classes/spider")
Poisoner = require("./classes/poisoner")
AllEater = require("./classes/alleater")

 var express = require('express')
 var app = express()
 var server = require('http').createServer(app)
 var io = require('socket.io')(server)
 var fs = require("fs");


app.use(express.static("."))

app.get('/', function (req, res) {
   res.redirect('index.html')
})

server.listen(3000, ()=> {
    console.log('connected')
})

weath="winter";


 matrix = []
function a(m, n) {
    for (var i = 0; i < m; i++) {
        matrix[i] = []
        for (var j = 0; j < n; j++) {
            matrix[i][j] = Math.floor(Math.random() * 2)
        }
    }
    matrix[m-2][n-4] = 2
    matrix[m-12][n-23] = 3
    matrix[m-38][n-27] = 2
    matrix[m-5][n-35] = 4
    matrix[m-10][n-10] = 6
    matrix[m-35][n-5] = 4
    matrix[m-22][n-2] = 4
    matrix[m-30][n-30] = 6
}
a(40,40)
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

function addPoison() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 1) {
            matrix[y][x] = 7
            
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y )
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y ))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addAllEater() {
    for (var i = 0; i < 4; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            allEaterArr.push(new AllEater(x, y ))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function kill() {
    grassArr = []
    grassEaterArr = []
    allEaterArr = []
    spiderArr = []
    poisonArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


setInterval(game,1000)


io.on('connection', function (socket){
    createObject(matrix)
    socket.on("add poison", addPoison);
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add allEater", addAllEater);
})
var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        
    })
},1000)