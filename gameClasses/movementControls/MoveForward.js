import Victor from "victor";
import BaseScript from "./BaseScript";

export default class MoveForward extends BaseScript {
    constructor({ unit, speed }) {
        super();
        this.unit = unit;
        this.speed = speed;

    }



    tick() {

        
        this.unit.position.add(
            this.speed * Math.cos(this.unit.rotation- this.halfPI),
            this.speed * Math.sin(this.unit.rotation- this.halfPI)
        );

    }
}