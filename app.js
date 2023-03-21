import * as PIXI from "pixi.js";
import Team from "./gameClasses/Team.js";
import ViperMk1 from "./elements/units/ViperMk1.js";
import Lib from "./gameClasses/Lib.js"
import Spawner from "./gameClasses/Spawner.js"
import Tick from "./gameClasses/Tick.js"

import * as Shapes from "./elements/shapes.js";
import Asteroid from "./elements/units/Asteroid.js";
import MoveThroughTarget from "./gameClasses/movementControls/MoveThroughTarget"
import FloatToTarget from "./gameClasses/movementControls/FloatToTarget"
import FloatingInRadius from "./gameClasses/movementControls/FloatingInRadius"
import MoveForward from "./gameClasses/movementControls/MoveForward"
import Victor from "victor";
import FireInterval from "./gameClasses/movementControls/FireInterval.js";






const canvasSize = 700;
const canv = document.getElementById("canv");
const app = new PIXI.Application({
    view: canv,
    width: canvasSize,
    height: canvasSize,
    transparent: true,
});


const loader = PIXI.Loader.shared;

loader
    .add('unit01', 'img/unit.png')
    .add('bullet01', 'img/bullet01.png')
    .add('bullet', 'img/bullet.png')
    .add('aster_0', 'img/101.png')
    .add('aster_1', 'img/102.png')
    .add('aster_2', 'img/103.png')
    .add('aster_3', 'img/104.png')
    .add('aster_4', 'img/105.png')
    .add('aster_5', 'img/106.png')
    .add('aster_6', 'img/107.png')
    .add('aster_7', 'img/108.png');


loader.load((loader, resources) => {
    Shapes.Shared.addResourses(resources);

    
    const teamAsteroids = createMeteorShowerTeam();



    const team1 = new Team({ name: "Blobs" });
    team1.setColor({ color: 0x00ff00 })



    let spawner = new Spawner();
    spawner.addUnitFx(() => {
        let a = new ViperMk1();
        a.addControlScript(new FloatToTarget({
            x: Lib.intRange(canvasSize / 2, canvasSize - 10),
            y: Lib.intRange(10, canvasSize - 10),
            speed: Lib.intRange(1, 5),
            afterScript: () => {
                a.addControlScript(new FloatingInRadius({
                    unit: a,
                    speed: 0.05,
                    radius: 10
                }))
               //a.addControlScript(new MoveForward({unit:a, speed: 1}))
            }
        }))

        a.addControlScript(new FireInterval({unit: a, time: 10}))
        return a
    });
    spawner.setArea({
        x: { min: canvasSize, max: canvasSize },
        y: { min: canvasSize / 2, max: canvasSize / 2 }
    });
    spawner.setCount(8)
    

    team1.addSpawner({ spawner })



    spawner.startSpawning()

    const tickObj = new Tick({ app });
    tickObj.addTeam({ teams: [team1, teamAsteroids] });
    tickObj.start();
})




let a = []


const lib1 = new Lib({ errName: "ConstrTest" });















/*



import * as PIXI from "pixi.js";

import Enemy from "./enemy.js";
//import Matter from "matter-js";
import Player from "./player.js"
import Spawner from "./spaw2ner.js";


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












 });*/


function createMeteorShowerTeam() {
    const teamAsteroids = new Team({ name: "Asteroids" });
    let asSpawner = new Spawner();
    asSpawner.addUnitFx(() => {
        let a = new Asteroid()
        a.addControlScript(new MoveThroughTarget({
            x: canvasSize,
            y: Lib.intRange(1, canvasSize),
            speed: Lib.intRange(1, 5)
        }))

        return a
    })
    asSpawner
        .setArea({ x: { min: -100, max: 0 }, y: { min: 0, max: canvasSize } })


    asSpawner.setCount(Infinity)
    asSpawner.setSpawnInterval(250)

    teamAsteroids.addSpawner({ spawner: asSpawner })

    // let aster = new Asteroid();
    // aster.position.set(150, 150)
    // teamAsteroids.addMember({ member: aster })


    asSpawner.startSpawning()
    return teamAsteroids;
}











