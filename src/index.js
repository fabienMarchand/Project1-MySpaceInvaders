import {World} from "./world.js";

var alienInvaders = [
    
   
    { left: 170, top: 100 },
    { left: 240, top: 100 },
    { left: 310, top: 100 },
    { left: 380, top: 100 },
    { left: 450, top: 100 },
    { left: 520, top: 100 },
    { left: 590, top: 100 },
    { left: 660, top: 100 },
    { left: 730, top: 100 },
    { left: 800, top: 100 },
    { left: 870, top: 100 },
   // { left: 1300, top: 100 },
   // { left: 1400, top: 100 },
    { left: 170, top: 145 },
    { left: 240, top: 145 },
    { left: 310, top: 145 },
    { left: 380, top: 145 },
    { left: 450, top: 145 },
    { left: 520, top: 145 },
    { left: 590, top: 145 },
    { left: 660, top: 145 },
    { left: 730, top: 145 },
    { left: 800, top: 145 },
    { left: 870, top: 145 },
  //  { left: 1300, top: 145 },
  //  { left: 1400, top: 145 },
    { left: 170, top: 190 },
    { left: 240, top: 190 },
    { left: 310, top: 190 },
    { left: 380, top: 190 },
    { left: 450, top: 190 },
    { left: 520, top: 190 },
    { left: 590, top: 190 },
    { left: 660, top: 190 },
    { left: 730, top: 190 },
    { left: 800, top: 190 },
    { left: 870, top: 190 },
  //  { left: 1300, top: 190 },
  //  { left: 1400, top: 190 },
  ];

let world = document.getElementById("game_window");
let player = document.getElementById("box");
const newGame = new World(world, world.offsetHeight, world.offsetWidth, alienInvaders);

if( !newGame.gameOver){
  newGame.addAliens();
  newGame.startGame(player);
} else {
  console.log("You loose Human invasion have successed");
}


