var socket = io();
var side = 20;
function setup() {
    createCanvas(40 * side + 1, 40 * side + 1);
    background('#acacac');
}
function nkaref(matrix) {
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
    }
setInterval(
    function(){
        socket.on('send matrix', nkaref)
    },1000
)