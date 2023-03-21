import Victor from "victor";
import Lib from "../Lib";
import BaseScript from "./BaseScript";
import FloatToTarget from "./FloatToTarget"

export default class FloatingInRadius extends BaseScript {
    constructor({ unit, x, y, speed, radius }) {
        super();
        this.unit = unit;
        this.x = x ? x : this.unit.position.x;
        this.y = y ? y : this.unit.position.y;
        this.speed = speed;
        this.radius = radius;

        this.dotX;
        this.dotY;

        this.isStarted = false;
    }

    setDot() {
        let sx, sy;

        sx = Lib.intRange(0, this.radius * 100) / 100
        sy = Math.sqrt(this.radius * this.radius - sx * sx);
        
        this.dotX = this.x + (Lib.intRange(1, 2) === 1 ? sx : sx * (-1))
        this.dotY = this.y + (Lib.intRange(1, 2) === 1 ? sy : sy * (-1))
    }

    start() {
        this.setDot()
        this.isStarted = true;
        
        this.unit.addControlScript(new FloatToTarget({
            unit: this.unit,
            x: this.dotX,
            y: this.dotY,
            speed: this.speed,
            afterScript: () => {
                        this.isStarted = false;
        
                    }
        }))

        // this.setDot();
        // this.unit.addControlScript(new FloatToTarget({
        //     unit: this.unit,
        //     x: this.dotX,
        //     y: this.dotY,
        //     speed: this.speed,
        //     afterScript: () => {
        //         this.start()

        //     }
        // }))
    }

    tick() {
        if (!this.isStarted) this.start()
    }

}