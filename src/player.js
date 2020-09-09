import { World } from "./world.js";

export class Player {
  constructor() {
    //todo rendre plus objet friendly
    const playerShip = document.getElementById("box");
    this.playerShip = playerShip;
    this.life = 3;
    this.health = 150;
    this.strenght = 30;
    this.posX = playerShip.offsetLeft;
    this.posY = playerShip.offsetTop;
    this.speed = 10;
    this.bullet = "";
  }

  play() {
    const objCur = new Player();
    this.handleEvent(this.posX, this.posY, this.playerShip, this.speed, objCur);
    this.alienHitPlayer();
  }

  alienHitPlayer(){
    console.log("toto");
  }

  getPlayerPos(){
    var player = new Player();
    let elem = player.playerShip;
    let rect = elem.getBoundingClientRect();
     return rect;
  }

  getBulletPos(){
    let bulletListArray = [...document.querySelectorAll(".bullet-box")];
    let rect = "";
    return bulletListArray;
  }

  createBullet(posX, posY, MAXUP_BORDER, speed) {
    function BulletMove() {
      var newBulletMove = newBullet.offsetTop;
      if (newBulletMove > MAXUP_BORDER) {
        newBullet.style.top = newBulletMove + speed * -1 + "px";
      } else {
        world.removeChild(newBullet);
        clearInterval(idBullMove);
      }
    }

    let world = document.getElementById("game_window");
    let newPlayer = new Player();
    
    const newBullet = document.createElement("div");
    newBullet.classList.add("bullet-box");
    newBullet.innerHTML += `<div> </div>`;
    newBullet.style.top = posX + "px";
    newBullet.style.left = posY + "px";
    world.appendChild(newBullet);

    var idBullMove = setInterval(BulletMove, 100);
    newPlayer.bullet = newBullet;
  }

  handleEvent(posX, posY, player, speed, objCur) {
    document.addEventListener("keydown", function (event) {
      //Todo voir comment le rendre plus objet friendly
      let shipRight = document.getElementById("box").offsetLeft;
      let shipLeft = document.getElementById("box").offsetLeft;
      let shipUp = document.getElementById("box").offsetTop;
      let shipDown = document.getElementById("box").offsetTop;

      /// Todo:
      //Faire en sorte que ces const soient dynamic
      const MAXUP_BORDER = 6;
      const MAXDOWN_BORDER = 342;
      const MAXLEFT_BORDER = 28;
      const MAXRIGHT_BORDER = 500;
      let playerShip = player;

      if (event.keyCode === 32) {
        playerShip.classList.toggle("flip-box");
        objCur.createBullet(shipUp, shipLeft, MAXUP_BORDER, speed);
      }

      // //Move Right
      if (event.keyCode === 39) shipRight < MAXRIGHT_BORDER ? (playerShip.style.left = shipRight + speed * 1 + "px") : playerShip.classList.toggle("flip-box");
      //Move Left
      if (event.keyCode === 37) shipLeft > MAXLEFT_BORDER ? (playerShip.style.left = shipLeft + speed * -1 + "px") : playerShip.classList.toggle("flip-box");
      //Move Up
      if (event.keyCode === 38)  shipUp > MAXUP_BORDER ? (playerShip.style.top = shipUp + speed * -1 + "px") : playerShip.classList.toggle("flip-box-top");
      //Move Down
      if (event.keyCode === 40) shipDown < MAXDOWN_BORDER ? (playerShip.style.top = shipDown + speed * 1 + "px") : playerShip.classList.toggle("flip-box-top");
    });
  }
}


