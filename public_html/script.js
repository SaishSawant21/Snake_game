/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/**board**/
let blocksize=25;
let rows= 20;
let col =20;
let board;

let context;

//snake head
var sx = blocksize*5;
var sy = blocksize*5;

//food
var fx;
var fy;

var vx=0;
var vy=0;

var snakebody = [];

var  gameover = false;


window.onload = function(){
    board = document.getElementById("Board");
    board.height =rows * blocksize;
    board.width = col * blocksize;
    context = board.getContext("2d");
    
    placefood();
    document.addEventListener("keyup",changeDirection);
    //update();
    setInterval(update,1000/10);
};

function update(){

    if (gameover){
        return;
    }
    
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(fx,fy,blocksize,blocksize);
    
    if(sx === fx && sy ===fy){
        snakebody.push(fx,fy);
        placefood();
    }
    
    for(let i= snakebody.length-1; i>0 ; i--){
        snakebody[i] = snakebody[i-1];
    }
    
    if(snakebody.length){
        snakebody[0] = [sx,sy];
    }
    
    context.fillStyle="lime";
    sx += vx *blocksize;
    sy += vy *blocksize;
    context.fillRect(sx,sy,blocksize,blocksize);
    
    for (let i=0; i < snakebody.length; i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }
    //gameover
    if(sx<0 || sx>col*blocksize || sy<0 || sy>rows*blocksize){
        gameover=true;
        alert("Game Over");
    }
    
    for(let i=0; i<snakebody.length ; i++){
        if(sx == snakebody[i][0] && sy == snakebody[i][1] ){
            gameover=true;
            alert("Game Over");
        }
    }
}

function changeDirection(e){
    if(e.code ==="ArrowUp" && vy !== 1){
       vx=0;
       vy=-1;
    }else if(e.code ==="ArrowDown" && vy !== -1){
       vx=0;
       vy=1;
    }else if(e.code ==="ArrowLeft" && vx !== 1){
       vx=-1;
       vy=0;
    }else if(e.code === "ArrowRight" && vx !== -1){
       vx=1;
       vy=0;
    }
}

function placefood(){
    fx = Math.floor(Math.random() * col ) * blocksize;
    fy = Math.floor(Math.random() * rows ) * blocksize;
}


