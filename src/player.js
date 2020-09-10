import {Alien} from "./enemy.js";
import {World} from "./world.js";

export class Player {
  constructor(health, strength, player) {
    this.health = health;
    this.strength = strength;
    this.player = player;
    this.bullet = [];
  }

  getBulletPos() {
    let bulletListArray = [...document.querySelectorAll(".bullet-box")];
    let rect = "";
    let newPlayer = new Player();

    return bulletListArray;
  }

  createBullet(posX, posY, MAXUP_BORDER, id) {
    function BulletMove() {
      var speed = 1;
      var newBulletMove = newBullet.offsetTop;
      if (newBulletMove > MAXUP_BORDER) {
        newBullet.style.top = newBulletMove + speed * -1 + "px";
      } else {
        // world.removeChild(newBullet);
        newBullet.remove();
        clearInterval(idBullMove);
      }
    }

    function bulletHitAlien() {
      //window frame
      let world = document.getElementById("game_window");
      let bullet = newBullet.style;
      let worldObj = new World();
      const alienArmy = [...document.querySelectorAll(".enemy-box")];
      let firstAlienTop = alienArmy[0].getBoundingClientRect().top + 30;

      if (firstAlienTop - 100 > newBullet.getBoundingClientRect().top) {
        newBullet.remove();
      }

      alienArmy.forEach((alien, index) => {
        if (
          alien.getBoundingClientRect().top <
            newBullet.getBoundingClientRect().top + 20 &&
          alien.getBoundingClientRect().top + 20 >
            newBullet.getBoundingClientRect().top &&
          alien.getBoundingClientRect().left <
            newBullet.getBoundingClientRect().left + 20 &&
          alien.getBoundingClientRect().left + 20 >
            newBullet.getBoundingClientRect().left
        ) {
          document.getElementById(index).classList.add("hidden");
          newBullet.remove();
          worldObj.score += 20;
          worldObj.setScore();
          worldObj.winGame();
        }
      });
    }

    let world = document.getElementById("game_window");
    let newPlayer = new Player();
    const newBullet = document.createElement("div");
    newBullet.classList.add("bullet-box");
    newBullet.innerHTML += `<div> </div>`;
    newBullet.style.top = posX + "px";
    newBullet.setAttribute("id", `test${id}`);
    newBullet.style.left = posY + "px";
    id++;
    world.appendChild(newBullet);
    var idBullMove = setInterval(() => {
      BulletMove();
      bulletHitAlien();
    }, 1 / 100);
  }

  movePlayer() {
    document.addEventListener("keydown", function (event) {
      //Todo voir comment le rendre plus objet friendly
      let shipRight = document.getElementById("box").offsetLeft;
      let shipLeft = document.getElementById("box").offsetLeft;
      let shipUp = document.getElementById("box").offsetTop;
      let shipDown = document.getElementById("box").offsetTop;
      /// Todo:
      //Faire en sorte que ces const soient dynamic
      const MAXUP_BORDER = 6;
      const MAXLEFT_BORDER = 50;
      const MAXRIGHT_BORDER = 900;
      let playerShip = document.getElementById("box");
      let speed = 15;
      let id = 0;
      const objPlayer = new Player();
      if (event.keyCode === 32) {
        objPlayer.createBullet(shipUp, shipLeft, MAXUP_BORDER, id);
      }

      // //Move Right
      if (event.keyCode === 39)
        shipRight < MAXRIGHT_BORDER
          ? (playerShip.style.left = shipRight + speed * 1 + "px")
          : playerShip.classList.toggle("flip-box");
      //Move Left
      if (event.keyCode === 37)
        shipLeft > MAXLEFT_BORDER
          ? (playerShip.style.left = shipLeft + speed * -1 + "px")
          : playerShip.classList.toggle("flip-box");
    });
  }
}