import BaseScript from "./BaseScript";

export default class DeathInTime extends BaseScript {
    constructor({ unit, time }) {
        super();
        this.unit = unit;
        this.timeMax = time;
        this.timeNow = 0;
    }


    tick() {

        if (this.timeNow >= this.timeMax) {
            this.unit.status.dead = true;
        }
        this.timeNow++;

    }
}