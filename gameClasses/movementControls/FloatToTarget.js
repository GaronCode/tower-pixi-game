import Victor from "victor";
import BaseScript from "./BaseScript";

export default class FloatToTarget extends BaseScript {
    constructor({ unit, x, y, speed, offScript, afterScript,slowdownMultiplier }) {
        super();
        this.unit = unit;
        this.x = x;
        this.y = y;
        this.slowdownMultiplier = slowdownMultiplier? slowdownMultiplier : 9
        this.offScript = offScript === false ? offScript : true
        this.speed = speed;

        this.afterScript = afterScript ? afterScript : function () { }
    }


    tick() {
        const nowPosX = this.unit.position.x;
        const nowPosY = this.unit.position.y;

        let e = new Victor(nowPosX, nowPosY);
        let s = new Victor(this.x, this.y);

        if (e.distance(s) <= this.speed*this.slowdownMultiplier) {
            if (this.speed < 0.005 && this.offScript) {
                console.log("script stoped");

                this.unit.removeControlScript(this)
                this.afterScript();
                return
            }
            this.speed /= 2;
            this.tick()
            return;
        }

        let d = s.subtract(e);
        let v = d.normalize().multiplyScalar(this.speed);



        this.unit.position.set(
            this.unit.position.x + v.x,
            this.unit.position.y + v.y
        );

    }
}