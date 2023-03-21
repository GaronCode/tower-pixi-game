import BaseUnit from "./BaseUnit.js"
import MoveThroughTarget from "../../gameClasses/movementControls/MoveThroughTarget";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import Lib from "../../gameClasses/Lib.js"
import MoveToTarget from "../../gameClasses/movementControls/MoveToTarget";
import BaseBullet from "../bullets/BaseBullet.js";



export default class Asteroid extends BaseUnit {

    constructor() { 
        let type = Lib.intRange(1,50);
        let size = type===49?Lib.intRange(100,150):Lib.intRange(20,50)
        super({
            unitName: "Asteroid",
            shape: new gBox( size, "aster_"+Lib.intLen(7)),

        })
        this.maxHP = size

        this.controlScripts.push(new DeathInTime({ unit: this, time: 1000}))

        
    }

    collisionFx(anotherUnit) {
        if (this.team === anotherUnit.team) return;
        if (anotherUnit instanceof BaseBullet) return
        anotherUnit.status.takeDamage({damage: this.status.nowHP})
        this.status.dead = true;
    }
}