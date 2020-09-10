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
  
  ];

let world = document.getElementById("game_window");
let player = document.getElementById("box");
const newGame = new World(world, world.offsetHeight, world.offsetWidth, alienInvaders);
let welcome = document.getElementById("welcome-screen");
let loseScreen = document.getElementById("lose-screen");
let winScreen = document.getElementById("win-screen");
let bulletBox = document.querySelectorAll("bullet-box")

function repeatOften() {
      if(loseScreen.style.display === "") {
        player.style.display = 'none';
        console.log("tralala");
      } else if( winScreen.style.display === ""){
        player.style.display = 'none';
        const bulletArr = document.querySelectorAll(".bullet-box");
        bulletArr.forEach((bullet) => (bullet.style.display = "none"));
      }
      requestAnimationFrame(repeatOften);
    }
    requestAnimationFrame(repeatOften);

  const startGame = (e) => {
    if (e.keyCode === 13) {
      document.removeEventListener("keydown", startGame);
      newGame.addAliens();
      newGame.startGame(player);
      player.style.display = player.style.display === 'none' ? '' : 'none';
     // gameSection.style.display = gameSection.style.display === 'none' ? '' : 'none';
      welcome.style.display = "none";
    }
  }
  
  document.addEventListener("keydown", startGame);