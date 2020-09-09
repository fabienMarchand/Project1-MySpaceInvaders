export class World {
  constructor(world, height, width, alienInvaders) {
    this.world = world;
    this.height = height;
    this.width = width;
    this.alienInvaders = alienInvaders;
    this.win = false;
    this.gameOver = false;
    this.score = 0;
    
  }

  addAliens() {
    const newAlien = new Alien(
      this.alienInvaders,
      this.world,
      this.height,
      this.width
    );

    this.alienInvaders.forEach((alien, index) => {
      newAlien.drawEnemy(alien, index);
    });
  }

  startGame(player) {
    const ship = new Player();
    ship.health = 42;
    ship.player = player;
    ship.movePlayer();
  }

  setScore(){
    let displayScore = document.getElementById("p");
    displayScore.textContent = this.score;
  }

  winGame(){
    const alienArmy = [...document.querySelectorAll(".enemy-box")];
    const alienArmyHidden = [...document.querySelectorAll(".hidden")];
    alienArmy.length === alienArmyHidden.length ? this.win = true : this.win = false
    if(this.win){
      let player = document.getElementById("box");
      player.style.display = 'none';
      let winScreen = document.getElementById("win-screen");
      winScreen.style.display = '';
    }
  }

  loseGame(){
    this.gameOver = true;
    let player = document.getElementById("box");
    player.style.display = 'none';
    const alienArmy = document.querySelectorAll(".enemy-box");
    alienArmy.forEach(alien => alien.style.display ='none');
    let winScreen = document.getElementById("lose-screen");
    winScreen.style.display = '';
  }
}

class Player {
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
     
      if(firstAlienTop-100 > newBullet.getBoundingClientRect().top ){
        newBullet.remove();
      }

      alienArmy.forEach((alien, index) => {
        if ( alien.getBoundingClientRect().top < newBullet.getBoundingClientRect().top + 20 &&
          alien.getBoundingClientRect().top + 20 > newBullet.getBoundingClientRect().top &&
          alien.getBoundingClientRect().left < newBullet.getBoundingClientRect().left + 20 &&
            alien.getBoundingClientRect().left + 20 > newBullet.getBoundingClientRect().left
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

class Alien {
  constructor(alienInvaders, world, height, width, alien) {
    this.alienInvaders = alienInvaders;
    this.world = world;
    this.height = height;
    this.width = width;
    this.newAlien = [];
    this.direction = 1;
  }

  drawEnemy(alien, index) {
    const newAlien = document.createElement("div");
    newAlien.innerHTML += `<div class='enemy-box' id='${index}' style='left:${alien.left}px; top:${alien.top}px'></div>`;
    this.world.appendChild(newAlien);
  }

  //move the alien invaders
  moveInvaders() {
    const alienArmy = document.querySelectorAll(".enemy-box");
    let direction = "down";
    let lastDirection = "";
    let firstAlienLeft = alienArmy[0].getBoundingClientRect().left + 30;
    let lastAlienRight = alienArmy[alienArmy.length - 1].getBoundingClientRect().left + 100;
    let worldObj = new World();
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
  invaderId = setInterval(() => this.moveInvaders(), 2000);
  //clearInterval(invaderId);
}
