export class World {
  constructor(world, height, width, alienInvaders) {
    this.world = world;
    this.height = height;
    this.width = width;
    this.alienInvaders = alienInvaders;
    this.win = false;
    this.gameOver = false;
    this.score = 0;
    this.life = 3;
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

  setScore() {
    let displayScore = document.getElementById("p");
    displayScore.textContent = this.score;
  }

  getLife() {
    console.log("don't talk to me about life: ", this.life);
    return this.life;
  }

  setLife() {
    this.life -= 1;
    console.log("dah i'm dying b***: ", this.life);

    return this.life;
  }

  winGame() {
    const alienArmy = [...document.querySelectorAll(".enemy-box")];
    const alienArmyHidden = [...document.querySelectorAll(".hidden")];
    alienArmy.length === alienArmyHidden.length
      ? (this.win = true)
      : (this.win = false);
    if (this.win) {
      let player = document.getElementById("box");
      player.style.display = "none";
      let winScreen = document.getElementById("win-screen");
      winScreen.style.display = "";
      const bulletArr = document.querySelectorAll(".bullet-box");
      bulletArr.forEach((bullet) => (bullet.style.display = "none"));
    }
    return this.win;
  }

  loseGame() {
    this.gameOver = true;
    let player = document.getElementById("box");
    player.style.display = "none";
    const alienArmy = document.querySelectorAll(".enemy-box");
    alienArmy.forEach((alien) => (alien.style.display = "none"));
    let winScreen = document.getElementById("lose-screen");
    winScreen.style.display = "";
    const bulletArr = document.querySelectorAll(".bullet-box");
    bulletArr.forEach((bullet) => (bullet.style.display = "none"));
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
          new Audio('../sounds/hitAlien.wav').play();
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
        new Audio('../sounds/Blaster.mp3').play();
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

    this.playerLife = 3;
    this.direction = "left";
    this.lastDirection = "";
  }

  drawEnemy(alien, index) {
    const newAlien = document.createElement("div");
    newAlien.innerHTML += `<div class='enemy-box' id='${index}' style='left:${alien.left}px; top:${alien.top}px'></div>`;
    this.world.appendChild(newAlien);
  }

  alienShoot(parent) {
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
    
    let nbBulletBox = document.querySelectorAll(".bullet-box").length;
    if (nbBulletBox > 4){
      newAlienBullet.remove();
    }
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

    function alienHitPlayer(parent) {
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
        new Audio('../sounds/playerHit.wav').play();
        // supprime la balle
        newAlienBullet.remove();
        clearInterval(idBullMove);

        let classLives = document.querySelector(".class-lives");
        let livesHoldLenght = classLives.querySelectorAll(".heart").length;

        if (livesHoldLenght > 0) {
          livesHold.removeChild(livesHold.firstElementChild);
        }

        let interval = setInterval(() => {
          playerShip.style.display = "none";
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          playerShip.style.display = "";
          if (classLives.querySelectorAll(".heart").length === 0) {
            const objWorld = new World();
            objWorld.loseGame();
          }
        }, 250);
      }
    }

    var idBullMove = setInterval(() => {
      alienBulletMove();
      alienHitPlayer(parent);
    }, 1 / 100);
  }

  moveInvaders() {
    
    const alienArmy = document.querySelectorAll(".enemy-box");

    let firstAlienLeft = alienArmy[0].style.left.replace("px", "");
    let lastAlienRight = alienArmy[alienArmy.length - 1].style.left.replace(
      "px",
      ""
    );
    this.enemiesMove(alienArmy, firstAlienLeft, lastAlienRight);
    this.alienShoot(this);
  }

  enemiesLeft = (alienArmy, firstAlienLeft, lastAlienRight) => {
    alienArmy.forEach((alien, index) => {
      const alienMoveLeft = Number(alien.style.left.replace("px", ""));
      const alienMoveRight = Number(alien.style.left.replace("px", ""));
      if (Number(firstAlienLeft) === 20) {
        this.direction = "down";
        this.lastDirection = "left";
       
      } else {
       
        alien.style.left = alienMoveLeft - 50;
      }
    });
  };

  enemiesRight = (alienArmy, firstAlienLeft, lastAlienRight) => {
    alienArmy.forEach((alien, index) => {
      const alienMoveLeft = Number(alien.style.left.replace("px", ""));
      const alienMoveRight = Number(alien.style.left.replace("px", ""));
      if (Number(lastAlienRight) === 970) {
        this.direction = "down";
        this.lastDirection = "right";
      } else {
        if (index === 0) alien.style.left = alienMoveRight + 50;
        
        alien.style.left = alienMoveRight + 50;
      }
    });
  };

  enemiesDown = (alienArmy, firstAlienLeft, lastAlienRight) => {
    alienArmy.forEach((alien, index) => {
      const alienMoveLeft = Number(alien.style.left.replace("px", ""));
      const alienMoveRight = Number(alien.style.left.replace("px", ""));
      if (alien.style.top > 600 + "px"){
        let worldObj = new World();
        worldObj.loseGame();
      } 

      alien.style.top = alien.getBoundingClientRect().top + 1;
      if (this.lastDirection === "right") {
        this.direction = "left";
      } else if (this.lastDirection === "left") {
        this.direction = "right";
      }
    });
  };

  enemiesMove = (alienArmy, firstAlienLeft, lastAlienRight) => {
    switch (this.direction) {
      case "right":
        this.enemiesRight(alienArmy, firstAlienLeft, lastAlienRight);
        break;
      case "down":
        this.enemiesDown(alienArmy, firstAlienLeft, lastAlienRight);
        break;
      case "left":
        this.enemiesLeft(alienArmy, firstAlienLeft, lastAlienRight);
      default:
        return;
    }
  };

  // Interval cible:
  // invaderId = setInterval(() => this.moveInvaders(), 500);
  // Interval test:

  invaderId = setInterval(
    () => this.moveInvaders(),
    1000);
  //clearInterval(invaderId);
}
