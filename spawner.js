import Rnd from "./rnd.js"
import Victor from "victor";

export default class Spawner {
    constructor({create, interval, maxSpawns, app}) {
        const spawnInterval = interval?interval:1000;
        this.app = app;
        this.maxSpawns = maxSpawns?maxSpawns:3;
        this.create = create;
        this.spawns = [];
        this.timer = setInterval(()=> {
            this.spawn();
        }, spawnInterval);



    }

    spawn() {
        if (this.spawns.length >= this.maxSpawns) return;
        
        let s = this.create({spawnPoint: this.randomSpawnPoint()});
        this.spawns.push(s);
    }

    update() {
        let deletedElements = 0;
        for (let index = 0; index < this.spawns.length; index++) {
            const e = this.spawns[index - deletedElements];
            if (e === undefined) continue;
            e.update();
            if (e.dies) {
                this.spawns.splice(index - deletedElements, 1);
                deletedElements++
            }
        }

    }

    randomSpawnPoint() {
        let edge = Rnd.int(4);
        let spawnPoint = new Victor(0, 0);
        switch (edge) {
            case 0:
                spawnPoint.x = this.app.screen.width * Math.random();
                break;
            case 1:
                spawnPoint.x = this.app.screen.width * Math.random();
                spawnPoint.y = this.app.screen.height;
                break;
            case 2:
                spawnPoint.y = this.app.screen.height * Math.random();
                break;
            case 3:
                spawnPoint.y = this.app.screen.height * Math.random();
                spawnPoint.x = this.app.screen.width;
                break;
            default:

                break;
        }
        return spawnPoint;
    }
}