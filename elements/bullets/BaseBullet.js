import DeathInTime from "../../gameClasses/movementControls/DeathInTime";
import MoveForward from "../../gameClasses/movementControls/MoveForward";
import Unit from "../units/BaseUnit";

export default class BaseBullet extends Unit {
    constructor({ unitName, shape, speed, damage, mainUnit, delTime }) {
        super({ unitName, shape });
        this.mainUnit = mainUnit;

        this.speed = speed;
        this.damage = damage;
        this.delTime = delTime ? delTime : 50

 

        this.position.set(mainUnit.position.x, mainUnit.position.y);
        this.rotation = mainUnit.rotation;

        this.addControlScript(new MoveForward({ unit: this, speed: this.speed }))
        this.addControlScript(new DeathInTime({ unit: this, time: this.delTime }))
    }

    collisionFx(anotherUnit) {
        if (this.team === anotherUnit.team) return;
        
        anotherUnit.status.takeDamage({damage: this.damage})
        this.status.dead = true;
    }

    takeDamage(){

    }

}