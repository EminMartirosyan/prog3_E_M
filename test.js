var socket = io();
var side = 20;
function setup() {
    createCanvas(40 * side + 1, 40 * side + 1);
    background('#acacac');
}
let weath = 'summer'

socket.on("weather", function (data) {
    weath = data;
    console.log(weath);
    
})

function nkaref(matrix) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
    
                if (matrix[y][x] == 1) {
                    if(weath == "summer") {
                        fill("green");
                    }else if (weath == "autumn") {
                        fill("#333300");
                    }else if (weath == "winter") {
                        fill("lightgray");
                    }else if (weath == "spring") {
                        fill("#4dffa6");
                    }
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
    }
setInterval(
    function(){
        socket.on('send matrix', nkaref)
    },1000
)

function addPoison() {
    socket.emit("add poison")
}
function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addAllEater() {
    socket.emit("add allEater")
}