import Team from "./gameClasses/Team.js";
import Unit from "./elements/units/BaseUnit.js";
import Lib from "./gameClasses/Lib.js"
import Spawner from "./gameClasses/Spawner.js"








const loader = PIXI.Loader.shared;

loader
    .add('unit01', 'img/unit.png')
    .add('bullet', 'img/bullet.png')
    .add('enemy_0', 'img/101.png')
    .add('enemy_1', 'img/102.png')
    .add('enemy_2', 'img/103.png')
    .add('enemy_3', 'img/104.png')
    .add('enemy_4', 'img/105.png')
    .add('enemy_5', 'img/106.png')
    .add('enemy_6', 'img/107.png')
    .add('enemy_7', 'img/108.png');


loader.load(() => {
    const team1 = new Team("Blobs");



    let spawner = new Spawner();
    spawner.addUnitFx(() => new Unit());


    team1.addSpawner({ spawner })
    spawner.spawnOnce();


    console.log(team1);

})




let a = []


const lib1 = new Lib({ errName: "ConstrTest" });






