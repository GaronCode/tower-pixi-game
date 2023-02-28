import * as PIXI from "pixi.js";
import Victor from "victor";
import Rnd from "./rnd.js"

export default class Enemy {
    constructor({ app, player, spawnPoint }) {
        this.app = app;
        this.target = player;

        this.radius = Rnd.intLen(10,25);
        this.speed = 2;
        this.pixi = new PIXI.Sprite(this.app.resources['enemy_'+Rnd.intLen(0,8)].texture);
        let r = spawnPoint? spawnPoint: new Victor(0,0);
        this.pixi.anchor.set(0.5);
        this.pixi.width = this.pixi.height = this.radius;
        this.pixi.position.set(r.x, r.y);
        this.pixi.rotation = Rnd.intLen(0,62) /10;
        // this.pixi.beginFill(0x00ffff, 0.8);
        // this.pixi.drawCircle(0, 0, this.radius);
        // this.pixi.endFill();
        app.stage.addChild(this.pixi);

        this.dies = false;
    }

    update() {
        let e = new Victor(this.pixi.position.x, this.pixi.position.y);
        let s = new Victor(this.target.pixi.position.x, this.target.pixi.position.y);

        if (e.distance(s) < this.target.pixi.width / 2) {
            this.target.takeDamage(1);
            this.die();
            return;
        }

        let d = s.subtract(e);
        let v = d.normalize().multiplyScalar(this.speed);
        this.pixi.position.set(this.pixi.position.x + v.x, this.pixi.position.y + v.y);
    }

    die() {
        this.app.stage.removeChild(this.pixi);
        this.dies = true;
    }


}