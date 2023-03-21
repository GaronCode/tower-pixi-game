import BaseScript from "./BaseScript";

export default class FireInterval extends BaseScript {
    constructor({ unit, time }) {
        super();
        this.unit = unit;
        this.time = time;
    }

    once() {
        this.nowTimer = 0;
    }

    tick() {

        if (this.nowTimer >= this.time) {this.unit.fire();this.nowTimer = 0; return}
        this.nowTimer++;

    }
}