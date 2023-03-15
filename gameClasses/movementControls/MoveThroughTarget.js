import Victor from "victor";
import BaseScript from "./BaseScript";

export default class MoveThroughTarget extends BaseScript {
    constructor({ unit, x, y, speed, rotationSpeed }) {
        super();
        this.unit = unit;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.rotationSpeed = rotationSpeed ? rotationSpeed : 0.01;

    }

    once() {

        let e = new Victor(this.unit.position.x, this.unit.position.y);
        let s = new Victor(this.x, this.y);

        let d = s.subtract(e);
        this.addingPosition = d.normalize().multiplyScalar(this.speed);

    }


    tick() {
        this.unit.rotation = this.unit.rotation + this.rotationSpeed;

        this.unit.position.set(
            this.unit.position.x + this.addingPosition.x,
            this.unit.position.y + this.addingPosition.y
        );

    }
}