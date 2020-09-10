import {World} from "./enemy.js";
import {Player} from "./player";

export class Alien {
  constructor(alienInvaders, world, height, width, alien) {
    this.alienInvaders = alienInvaders;
    this.world = world;
    this.height = height;
    this.width = width;
    this.newAlien = [];
    this.direction = 1;
    this.playerLife = 3;
  }

  drawEnemy(alien, index) {
    const newAlien = document.createElement("div");
    newAlien.innerHTML += `<div class='enemy-box' id='${index}' style='left:${alien.left}px; top:${alien.top}px'></div>`;
    this.world.appendChild(newAlien);
  }

  alienShoot() {
    const alienArmy = document.querySelectorAll(".enemy-box");
    function getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    let randomAlien = getRandomArbitrary(0, alienArmy.length);
    let alientop = alienArmy[randomAlien].style.top;
    let alienLeft = alienArmy[randomAlien].style.left;
    let world = document.getElementById("game_window");
    const newAlienBullet = document.createElement("div");
    newAlienBullet.classList.add("bullet-box");
    newAlienBullet.innerHTML += `<div> </div>`;
    newAlienBullet.style.top = alientop;
    // newAlienBullet.setAttribute("id", `test${id}`);
    newAlienBullet.style.left = alienLeft;
    // id++;
    world.appendChild(newAlienBullet);

    function alienBulletMove() {
      var speed = 1;
      var newAlienBulletMove = newAlienBullet.offsetTop;
      if (newAlienBulletMove < 700) {
        newAlienBullet.style.top = newAlienBulletMove + speed + "px";
      } else {
        world.removeChild(newAlienBullet);
        newAlienBullet.remove();
        clearInterval(idBullMove);
      }
    }

    function alienHitPlayer() {
      let world = document.getElementById("game_window");
      let bullet = newAlienBullet.style;
      let playerShip = document.getElementById("box");
      let livesHold = document.getElementById("lives-hold");
      if (
        newAlienBullet.getBoundingClientRect().top <
          playerShip.getBoundingClientRect().top + 20 &&
        newAlienBullet.getBoundingClientRect().top + 20 >
          playerShip.getBoundingClientRect().top &&
        newAlienBullet.getBoundingClientRect().left <
          playerShip.getBoundingClientRect().left + 20 &&
        newAlienBullet.getBoundingClientRect().left + 20 >
          playerShip.getBoundingClientRect().left
      ) {
        // supprime la balle
        newAlienBullet.remove();
        clearInterval(idBullMove);

        let classLives = document.querySelector(".class-lives");
        let livesHoldLenght = classLives.querySelectorAll(".heart").length;

        if(livesHoldLenght > 0){
          livesHold.removeChild(livesHold.firstElementChild);
        }
        
        let interval = setInterval(() => {
          playerShip.style.display = "none";
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          playerShip.style.display = "";
        }, 250);
      }
    }

    var idBullMove = setInterval(() => {
      alienBulletMove();
      alienHitPlayer();
    }, 1 / 100);
  }

  //move the alien invaders
  moveInvaders() {
    const alienArmy = document.querySelectorAll(".enemy-box");
    let direction = "down";
    let lastDirection = "";
    let firstAlienLeft = alienArmy[0].getBoundingClientRect().left + 30;
    let lastAlienRight =
      alienArmy[alienArmy.length - 1].getBoundingClientRect().left + 100;
    let worldObj = new World();
    this.alienShoot();

    alienArmy.forEach((alien, index) => {
      const enemiesLeft = () => {
        if (alien.firstAlienLeft > 0) {
          direction = "down";
          lastDirection = "left";
        } else {
          alien.style.left = alien.getBoundingClientRect().left + 1;
        }
      };

      const enemiesRight = () => {
        if (lastAlienRight > this.width) {
          direction = "down";
          lastDirection = "right";
        } else {
          alien.style.left = alien.getBoundingClientRect().left + 1;
        }
      };

      const enemiesDown = () => {
        if (alien.style.top > 600 + "px") {
          worldObj.loseGame();
        } else {
          alien.style.top = alien.getBoundingClientRect().top + 1;
        }

        //        if( alien.style.top === )

        //  if (lastDirection === "right") {
        //    direction = "left";
        //  } else if (lastDirection === "left") {
        //    direction = "right";
        //  }
      };

      const enemiesMove = () => {
        switch (direction) {
          case "right":
            //   enemiesRight();
            break;
          case "down":
            enemiesDown();
            break;
          case "left":
          //   enemiesLeft();
          default:
            return;
        }
      };

      enemiesMove();
    });
  }
  // Interval cible:
  // invaderId = setInterval(() => this.moveInvaders(), 500);
  // Interval test:
  invaderId = setInterval(() => this.moveInvaders(), 5000);
  //clearInterval(invaderId);
}