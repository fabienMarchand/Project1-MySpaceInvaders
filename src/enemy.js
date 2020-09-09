import { World } from "./world.js";
import { Player } from "./player.js";

export class Enemy extends Player {
  constructor(playerShip, life, health, strenght, posX, posY, speed) {
    super(playerShip, life, health, strenght, posX, posY, speed);
    const enemyArr = [];
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  deleteEnemie(index){
    let world = document.getElementById("game_window");
    
    
    document.getElementById(index).remove();
  }

  getEnemyPos() {
    var enemy = new Enemy();
    let elem = [...document.querySelectorAll(".enemy-box")];
     return elem;
    };

  setEnemyPos(idEnemy, count) {
    //todo reecrire
    let idEnemyAttr = "enemy"+count;
    var newEnemyObj = new Enemy();
    let randomLeft = newEnemyObj.randomIntFromInterval(30, 500);
    const world = document.getElementById("game_window");
    const newEnemy = document.createElement("div");
    newEnemy.classList.add("enemy-box");
    newEnemy.setAttribute("id", idEnemyAttr);
    newEnemy.innerHTML += `<div> </div>`;
    newEnemy.style.top = 6 + "px";
    newEnemy.style.left = randomLeft + "px";

    if (count == 2) {
      clearInterval(idEnemy);
    }
    world.appendChild(newEnemy);
    ///

   // newEnemy.style.top = newEnemyMove + 30 + "px";
    var idEnemylMove = setInterval(() =>{
      newEnemyObj.setEnemyMove(newEnemy, idEnemylMove, idEnemyAttr);
    }, 100);

   
  }

   setEnemyMove(newEnemy,idEnemylMove,  idEnemyAttr) {
    const MAXDOWN_BORDER = 342;
    const MAXLEFT_BORDER = 28;
    const MAXRIGHT_BORDER = 500;
    var newEnemyMoveVert = newEnemy.offsetTop;
    var newEnemyMoveHor = newEnemy.offsetLeft;
    var speed = 0;
    //Move Vertical
    var currEnemy = document.getElementById(idEnemyAttr);
    if(!currEnemy) {
      return;
    }
    var newEnemyMoveVertLive = currEnemy.style.top.replace("px", "");
    if (newEnemyMoveVertLive < MAXDOWN_BORDER) {
      newEnemy.style.top = newEnemyMoveVert + 1* 1 + "px";
    } else {
      clearInterval(idEnemylMove);
      // delete 
    }
    //Move horizontal
    // var newEnemyMoveHorLive = document.getElementById(idEnemyAttr).style.left.replace("px", "");
    //  if (newEnemyMoveHorLive < MAXRIGHT_BORDER ) {
    //   newEnemy.style.left = newEnemyMoveHor + 4 * 1 + "px";
    // } else {
    //   clearInterval(idEnemylMove);
    // }
  }

  createEnemy() {
    const spaceShip = new Player();
    const enemy = new Enemy();
    let count = 0;
    var idEnemy = setInterval(() => {
      enemy.setEnemyPos(idEnemy, count);
      //enemy.getEnemyPos();
      count++;
    }, 2000);


   //var idEnemy = setInterval(enemy.setEnemyPos(idEnemy), 2000);
  
  }
}
