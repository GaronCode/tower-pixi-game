import * as PIXI from "pixi.js";

export class Shared {
    static resources;
    static addResourses(res) {
        this.resources = res;
    }
}

export default class gBox extends PIXI.Sprite {
    constructor(size, textureName) { 
        super(Shared.resources[textureName].texture);
        this.anchor.set(0.5);
        this.position.set(0,0);
        this.width = this.height = size;
        this.rotation = 0;
        this.isRendered = false;

        this.twoPI = Math.PI * 2;


    }

    set unitRotation(val) {
        this.rotation = this.normalizeAngle(val);
    }
    get unitRotation() {
        return this.normalizeAngle(this.rotation)
    }

    normalizeAngle(angle) {
        if (0 <= angle &&  angle < this.twoPI ) return angle;

        if (angle < 0) return this.normalizeAngle(this.twoPI + angle);

        return this.normalizeAngle(angle - this.twoPI);
    }
}