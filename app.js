import * as PIXI from "pixi.js";

import Enemy from "./enemy.js";
//import Matter from "matter-js";
import Player from "./player.js"
import Spawner from "./spawner.js";


const asteroidsDestroyedUI = document.getElementById("asteroidsDestroyed");
let asteroidsDestroyed = 0;
const asteroidsMissedUI = document.getElementById("asteroidsMissed");

const dataDiv = document.getElementById('data');
const canvasSize = 700;
const canv = document.getElementById("canv");
const app = new PIXI.Application({
    view: canv,
    width: canvasSize,
    height: canvasSize,
    transparent: true,
});



const loader = new PIXI.Loader();

loader
  .add('player', 'img/unit.png')
  .add('bullet', 'img/bullet.png')
  .add('enemy_0', 'img/101.png')
  .add('enemy_1', 'img/102.png')
  .add('enemy_2', 'img/103.png')
  .add('enemy_3', 'img/104.png')
  .add('enemy_4', 'img/105.png')
  .add('enemy_5', 'img/106.png')
  .add('enemy_6', 'img/107.png')
  .add('enemy_7', 'img/108.png');


loader.load((loader, resources) => {


    app.resources = resources;
    //{app} ==  { app: app }
    let player = new Player({ app });
    player.addDamageUI((damage) => {
        asteroidsMissedUI.innerText = damage;
    })


    let enemySpawner = new Spawner({
        interval: 500,
        maxSpawns: 100,
        create: ({spawnPoint}) => new Enemy({ app, player, spawnPoint  }),
        app
    });


    app.ticker.add((data) => {


        player.update();

        enemySpawner.update();

        bulletHit({bullets:player.shooting.bullets, enemyes: enemySpawner.spawns})
    });


    function bulletHit({bullets,enemyes}) {
        let deletedElements = 0;
        bullets.forEach(bullet => {

            for (let index = 0; index < enemyes.length; index++) {
                const enemy = enemyes[index - deletedElements];
                if (enemy === undefined) continue; 

                let dx = enemy.pixi.position.x - bullet.position.x;
                let dy = enemy.pixi.position.y - bullet.position.y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < bullet._bulletRadius + enemy.radius) {
                    asteroidsDestroyedUI.innerText = ++asteroidsDestroyed;
                    enemy.die();
                    enemyes.splice(index - deletedElements, 1);
                    deletedElements++
                }
            }
        });
    }












 });














